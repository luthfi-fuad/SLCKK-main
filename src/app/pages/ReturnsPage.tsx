import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, Package, RotateCcw, AlertCircle } from "lucide-react";

const inputClass = "w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors";
const labelClass = "block text-[#888888] mb-1";
const labelStyle = { fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" };
const inputStyle = { fontSize: "0.875rem", fontFamily: "Inter, sans-serif" };

export function ReturnsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    orderNumber: "",
    email: "",
    itemName: "",
    reason: "",
    type: "return",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const returnReasons = [
    "Wrong size",
    "Product defect or damage",
    "Not as described",
    "Changed my mind",
    "Received wrong item",
    "Other",
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Header */}
      <div className="bg-[#080808] border-b border-[#2A2A2A] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-4" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif", color: "#666666" }}>
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#888888]">Returns & Exchanges</span>
          </nav>
          <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif" }}>HASSLE-FREE</span>
          <h1 className="text-white mt-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "3rem", fontWeight: 300 }}>
            Returns & Exchanges
          </h1>
          <p className="text-[#AAAAAA] mt-3 max-w-xl" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}>
            We want you to love your SLCKK pieces. If something isn't right, we make it easy to return or exchange within 30 days.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Policy overview */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: RotateCcw,
              title: "30-Day Returns",
              desc: "Return any unworn item within 30 days of delivery for a full refund.",
            },
            {
              icon: Package,
              title: "Free Return Shipping",
              desc: "We provide a prepaid return label for all eligible returns within Malaysia and Singapore.",
            },
            {
              icon: CheckCircle,
              title: "Quick Refunds",
              desc: "Refunds are processed within 3-5 business days of receiving your return.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#111111] border border-[#2A2A2A] p-5">
              <div className="w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center mb-4">
                <item.icon size={18} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontWeight: 500 }}>
                {item.title}
              </h3>
              <p className="text-[#888888]" style={{ fontSize: "0.825rem", fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Policy Details */}
          <div>
            <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>
              Return Policy
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Eligible Items",
                  icon: CheckCircle,
                  color: "text-green-400",
                  items: [
                    "Items returned within 30 days of delivery",
                    "Unworn, unwashed items in original condition",
                    "Items with all original tags attached",
                    "Items in original packaging",
                    "Full-price items",
                  ],
                },
                {
                  title: "Non-Eligible Items",
                  icon: AlertCircle,
                  color: "text-red-400",
                  items: [
                    "Sale or discounted items (final sale)",
                    "Items marked as non-returnable",
                    "Worn or washed items",
                    "Items without original tags",
                    "Gift cards",
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <section.icon size={16} className={section.color} />
                    <h3 className="text-white" style={{ fontSize: "0.875rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                      {section.title.toUpperCase()}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#AAAAAA]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                        <span className={`${section.color} mt-0.5 flex-shrink-0`}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#111111] border border-[#C9A84C]/20 p-5">
              <h3 className="text-[#C9A84C] mb-3" style={{ fontSize: "0.875rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                HOW THE PROCESS WORKS
              </h3>
              <ol className="space-y-3">
                {[
                  "Submit your return request using the form on this page.",
                  "Receive a prepaid return label via email within 1-2 business days.",
                  "Pack your item securely in original packaging.",
                  "Drop off your package at any authorized carrier location.",
                  "Receive your refund within 3-5 business days of us receiving the item.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-[#AAAAAA]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                    <span className="text-[#C9A84C] flex-shrink-0 font-bold" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}>
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Return Form */}
          <div>
            <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>
              Initiate a Return
            </h2>

            {submitted ? (
              <div className="bg-[#111111] border border-[#C9A84C]/30 p-8 text-center">
                <CheckCircle size={48} className="text-[#C9A84C] mx-auto mb-4" />
                <h3 className="text-white mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 400 }}>
                  Return Request Submitted
                </h3>
                <p className="text-[#AAAAAA] mb-6" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}>
                  We've received your return request for order <strong className="text-white">{form.orderNumber}</strong>. You'll receive a prepaid return label at your email address within 1-2 business days.
                </p>
                <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-4 mb-6 text-left">
                  <div className="flex justify-between">
                    <span className="text-[#888888]" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>Return Type</span>
                    <span className="text-white capitalize" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>{form.type}</span>
                  </div>
                </div>
                <button onClick={() => { setSubmitted(false); setForm({ orderNumber: "", email: "", itemName: "", reason: "", type: "return", details: "" }); }} className="text-[#C9A84C] hover:underline" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Return type */}
                <div>
                  <label style={labelStyle} className={labelClass}>REQUEST TYPE</label>
                  <div className="flex gap-3">
                    {["return", "exchange"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, type })}
                        className={`flex-1 py-3 border transition-colors capitalize ${form.type === type ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10" : "border-[#2A2A2A] text-[#888888] hover:border-[#888888]"}`}
                        style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle} className={labelClass}>ORDER NUMBER *</label>
                  <input required value={form.orderNumber} onChange={(e) => setForm({ ...form, orderNumber: e.target.value })} placeholder="ORD-XXXXXX" className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle} className={labelClass}>EMAIL ADDRESS *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Order confirmation email" className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle} className={labelClass}>ITEM NAME *</label>
                  <input required value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} placeholder="e.g. Obsidian High-Waist Leggings, Size M" className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle} className={labelClass}>REASON FOR {form.type.toUpperCase()} *</label>
                  <select required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className={inputClass} style={{ ...inputStyle, backgroundColor: "#0A0A0A" }}>
                    <option value="">Select a reason</option>
                    {returnReasons.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle} className={labelClass}>ADDITIONAL DETAILS</label>
                  <textarea
                    rows={3}
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors resize-none"
                    style={inputStyle}
                    placeholder="Please describe the issue or your exchange preference..."
                  />
                </div>

                <button type="submit" className="w-full bg-[#C9A84C] text-[#0A0A0A] py-4 hover:bg-[#D4B55A] transition-colors" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                  SUBMIT {form.type.toUpperCase()} REQUEST
                </button>

                <p className="text-[#555555] text-center" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
                  By submitting, you agree to our{" "}
                  <Link to="/support" className="text-[#C9A84C] hover:underline">Returns Policy</Link>.
                  Questions? <Link to="/support" className="text-[#C9A84C] hover:underline">Contact us</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
