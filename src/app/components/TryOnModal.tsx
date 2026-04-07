import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Download, Sparkles, AlertCircle, RotateCcw } from "lucide-react";

interface TryOnModalProps {
  open: boolean;
  onClose: () => void;
  garmentImageUrl: string;
  productName: string;
  garmentDescription: string;
}

type Status = "idle" | "uploading" | "processing" | "done" | "error";

const HF_SPACE_URL = "https://yisol-idm-vton.hf.space";

/** Safely extract an error message string, never returning null/undefined */
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message || String(err);
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error occurred.";
  }
}

/**
 * Upload a file to the Hugging Face Space and return the server-side path.
 */
async function uploadFileToHF(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("files", file);

  let resp: Response;
  try {
    resp = await fetch(`${HF_SPACE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
  } catch (networkErr) {
    throw new Error(
      `Network error uploading to Hugging Face. The Space may be sleeping or unavailable. Details: ${getErrorMessage(networkErr)}`
    );
  }

  if (!resp.ok) {
    const body = await resp.text().catch(() => "");
    throw new Error(`Upload failed (${resp.status}): ${body || resp.statusText}`);
  }

  const paths: string[] = await resp.json();
  if (!paths || paths.length === 0) {
    throw new Error("Upload succeeded but no file path was returned.");
  }
  return paths[0];
}

/**
 * Upload a garment image from a URL to HF Space.
 * Fetches the image, converts to a File, then uploads.
 */
async function uploadGarmentFromUrl(url: string): Promise<string> {
  const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;

  let resp: Response;
  try {
    resp = await fetch(fullUrl);
  } catch (networkErr) {
    throw new Error(`Failed to fetch garment image from ${fullUrl}: ${getErrorMessage(networkErr)}`);
  }

  if (!resp.ok) {
    throw new Error(`Garment image fetch failed (${resp.status}): ${resp.statusText}`);
  }

  const blob = await resp.blob();
  const file = new File([blob], "garment.jpg", { type: blob.type || "image/jpeg" });
  return uploadFileToHF(file);
}

/**
 * Call the IDM-VTON /tryon endpoint using the Gradio queue-based REST API.
 * Returns the result image URL.
 */
async function callTryOn(
  personFilePath: string,
  garmentFilePath: string,
  garmentDescription: string
): Promise<string> {
  const payload = {
    data: [
      {
        background: { path: personFilePath, meta: { _type: "gradio.FileData" } },
        layers: [],
        composite: null,
      },
      { path: garmentFilePath, meta: { _type: "gradio.FileData" } },
      garmentDescription,
      true,   // is_checked (auto-masking)
      false,  // is_checked_crop
      30,     // denoise_steps
      42,     // seed
    ],
  };

  // Step 1: POST to queue
  let postResp: Response;
  try {
    postResp = await fetch(`${HF_SPACE_URL}/queue/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, fn_index: 0, session_hash: crypto.randomUUID() }),
    });
  } catch {
    // Fallback: try the /call/ endpoint instead
    try {
      postResp = await fetch(`${HF_SPACE_URL}/call/tryon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (networkErr) {
      throw new Error(
        `Cannot connect to IDM-VTON server. The Space may be sleeping — visit https://huggingface.co/spaces/yisol/IDM-VTON to wake it up, then try again. Details: ${getErrorMessage(networkErr)}`
      );
    }
  }

  if (!postResp.ok) {
    const body = await postResp.text().catch(() => "");
    throw new Error(`Server rejected the try-on request (${postResp.status}): ${body || postResp.statusText}`);
  }

  const postData = await postResp.json();
  const eventId = postData.event_id;

  if (!eventId) {
    throw new Error(`Server returned no event ID. Response: ${JSON.stringify(postData).slice(0, 200)}`);
  }

  // Step 2: Stream results via SSE
  let getResp: Response;
  try {
    getResp = await fetch(`${HF_SPACE_URL}/call/tryon/${eventId}`);
  } catch (networkErr) {
    throw new Error(`Lost connection while waiting for results: ${getErrorMessage(networkErr)}`);
  }

  if (!getResp.ok) {
    const body = await getResp.text().catch(() => "");
    throw new Error(`Failed to get results (${getResp.status}): ${body || getResp.statusText}`);
  }

  // Read the SSE stream
  const text = await getResp.text();
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "event: complete" && i + 1 < lines.length) {
      const dataLine = lines[i + 1].trim();
      if (dataLine.startsWith("data: ")) {
        const jsonStr = dataLine.slice(6);
        try {
          const data = JSON.parse(jsonStr);
          if (data[0] && data[0].url) {
            return data[0].url;
          }
          throw new Error(`Unexpected result format: ${jsonStr.slice(0, 200)}`);
        } catch (parseErr) {
          throw new Error(`Failed to parse result: ${getErrorMessage(parseErr)}`);
        }
      }
    }

    if (line === "event: error" && i + 1 < lines.length) {
      const dataLine = lines[i + 1].trim();
      const errData = dataLine.startsWith("data: ") ? dataLine.slice(6) : dataLine;
      throw new Error(`Server error: ${errData || "Unknown server error"}`);
    }
  }

  // If we got here, dump the full response for debugging
  throw new Error(
    `No result received. The GPU may be busy or the Space is sleeping. ` +
    `Server response: ${text.slice(0, 300)}`
  );
}

export function TryOnModal({
  open,
  onClose,
  garmentImageUrl,
  productName,
  garmentDescription,
}: TryOnModalProps) {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [personFile, setPersonFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setPersonImage(null);
    setPersonFile(null);
    setResultImage(null);
    setStatus("idle");
    setErrorMsg("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file (JPG, PNG, WebP).");
      setStatus("error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Image is too large. Please upload an image under 10MB.");
      setStatus("error");
      return;
    }
    setPersonFile(file);
    setStatus("idle");
    setErrorMsg("");
    const reader = new FileReader();
    reader.onload = (e) => setPersonImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleGenerate = async () => {
    if (!personFile) return;

    setStatus("uploading");
    setErrorMsg("");
    setResultImage(null);

    try {
      // Upload person photo
      const personPath = await uploadFileToHF(personFile);

      // Upload garment image
      const garmentPath = await uploadGarmentFromUrl(garmentImageUrl);

      setStatus("processing");

      // Call IDM-VTON
      const resultUrl = await callTryOn(personPath, garmentPath, garmentDescription);

      setResultImage(resultUrl);
      setStatus("done");
    } catch (err: any) {
      console.error("Try-on error:", err);
      setStatus("error");
      if (err.message?.includes("queue") || err.message?.includes("Queue")) {
        setErrorMsg("The server is busy. Please try again in a few minutes.");
      } else if (err.message?.includes("exceeded") || err.message?.includes("GPU")) {
        setErrorMsg("GPU quota exceeded. Please try again later.");
      } else {
        setErrorMsg(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = `tryon-${productName.replace(/\s+/g, "-").toLowerCase()}.png`;
    a.target = "_blank";
    a.click();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-primary-dark/10 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-accent-terracotta" />
                <h2 className="text-primary-dark text-lg font-medium tracking-wide">
                  Virtual Try-On
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center text-primary-taupe hover:text-primary-dark transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              {/* Instruction banner */}
              <div className="bg-primary-cream border border-primary-dark/10 px-4 py-3 mb-6 text-xs text-primary-taupe/80 leading-relaxed">
                <strong className="text-primary-dark">How it works:</strong>{" "}
                Upload a full-body photo of yourself and our AI will generate a
                preview of you wearing the{" "}
                <strong className="text-accent-terracotta">{productName}</strong>.
                Processing takes ~30–120 seconds.
              </div>

              {/* Two-column layout: Upload + Garment */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Left: Upload zone */}
                <div>
                  <label className="text-primary-dark text-[0.7rem] tracking-[0.12em] font-semibold block mb-2">
                    YOUR PHOTO
                  </label>
                  {!personImage ? (
                    <div
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative aspect-[3/4] border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-3 transition-all ${
                        isDragging
                          ? "border-accent-terracotta bg-accent-terracotta/5"
                          : "border-primary-dark/20 hover:border-accent-terracotta hover:bg-primary-cream/50"
                      }`}
                    >
                      <Upload size={28} className="text-primary-taupe/40" />
                      <p className="text-primary-taupe/60 text-xs text-center px-4">
                        Drag & drop a full-body photo
                        <br />
                        or <span className="text-accent-terracotta underline">browse files</span>
                      </p>
                      <p className="text-primary-taupe/30 text-[0.6rem]">
                        JPG, PNG, WebP · Max 10MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileInput}
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[3/4] bg-primary-cream overflow-hidden group">
                      <img
                        src={personImage}
                        alt="Your photo"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPersonImage(null);
                          setPersonFile(null);
                          setResultImage(null);
                          setStatus("idle");
                        }}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/80 border border-primary-dark/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-accent-terracotta"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Right: Garment preview */}
                <div>
                  <label className="text-primary-dark text-[0.7rem] tracking-[0.12em] font-semibold block mb-2">
                    GARMENT
                  </label>
                  <div className="aspect-[3/4] bg-primary-cream overflow-hidden">
                    <img
                      src={garmentImageUrl}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-primary-taupe/60 text-xs mt-2">
                    {productName}
                  </p>
                </div>
              </div>

              {/* Generate button */}
              {status !== "done" && (
                <button
                  onClick={handleGenerate}
                  disabled={!personFile || status === "processing" || status === "uploading"}
                  className={`w-full py-4 transition-all text-[0.8rem] tracking-[0.15em] font-bold flex items-center justify-center gap-2 ${
                    !personFile
                      ? "bg-primary-taupe/20 text-primary-taupe/40 cursor-not-allowed"
                      : status === "processing" || status === "uploading"
                      ? "bg-accent-terracotta/70 text-white cursor-wait"
                      : "bg-accent-terracotta text-white hover:bg-accent-terracotta/90"
                  }`}
                >
                  {status === "uploading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Sparkles size={16} />
                      </motion.div>
                      UPLOADING IMAGES...
                    </>
                  ) : status === "processing" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Sparkles size={16} />
                      </motion.div>
                      GENERATING... PLEASE WAIT
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      GENERATE TRY-ON
                    </>
                  )}
                </button>
              )}

              {/* Processing message */}
              {(status === "processing" || status === "uploading") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-primary-cream border-l-2 border-accent-terracotta"
                >
                  <p className="text-primary-taupe/80 text-xs leading-relaxed">
                    <strong className="text-primary-dark">
                      {status === "uploading"
                        ? "Uploading your images... 📤"
                        : "AI is working its magic ✨"}
                    </strong>
                    <br />
                    This uses a free Hugging Face GPU and may take 30–120
                    seconds depending on queue length. Please don't close this
                    window.
                  </p>
                  {/* Animated progress bar */}
                  <div className="mt-3 h-1 bg-primary-dark/10 overflow-hidden rounded-full">
                    <motion.div
                      className="h-full bg-accent-terracotta rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: status === "uploading" ? "20%" : "90%" }}
                      transition={{
                        duration: status === "uploading" ? 5 : 90,
                        ease: "linear",
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 flex items-start gap-3"
                >
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 text-sm font-medium">Try-on failed</p>
                    <p className="text-red-600 text-xs mt-1">{errorMsg}</p>
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {status === "done" && resultImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <label className="text-primary-dark text-[0.7rem] tracking-[0.12em] font-semibold block mb-2">
                    ✨ YOUR TRY-ON RESULT
                  </label>
                  <div className="aspect-[3/4] bg-primary-cream overflow-hidden border border-primary-dark/10 max-w-sm mx-auto">
                    <img
                      src={resultImage}
                      alt="Virtual try-on result"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleDownload}
                      className="flex-1 py-3 bg-accent-terracotta text-white text-[0.75rem] tracking-[0.12em] font-bold flex items-center justify-center gap-2 hover:bg-accent-terracotta/90 transition-colors"
                    >
                      <Download size={14} />
                      DOWNLOAD IMAGE
                    </button>
                    <button
                      onClick={() => {
                        setResultImage(null);
                        setStatus("idle");
                      }}
                      className="px-4 py-3 border border-primary-dark/20 text-primary-taupe text-[0.75rem] tracking-[0.12em] font-bold flex items-center justify-center gap-2 hover:border-accent-terracotta hover:text-accent-terracotta transition-colors"
                    >
                      <RotateCcw size={14} />
                      TRY AGAIN
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
