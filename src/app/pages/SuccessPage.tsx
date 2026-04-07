import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import { useCart } from "../context/CartContext";

export function SuccessPage() {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Clear the cart once the payment was successful
    clearCart();
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        {/* Success icon with animated ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="w-24 h-24 rounded-full bg-[#C9A84C]/10 border-2 border-[#C9A84C]/30 flex items-center justify-center"
          >
            <CheckCircle size={48} className="text-[#C9A84C]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#C9A84C] text-[0.7rem] tracking-[0.25em] mb-3">PAYMENT SUCCESSFUL</p>
          <h1 className="text-white mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "3rem", fontWeight: 300, lineHeight: 1.1 }}>
            Order Confirmed
          </h1>
          <p className="text-[#888888] mb-3" style={{ fontSize: "0.95rem", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
            Thank you for your purchase! Your order has been successfully placed and is being prepared.
          </p>

          {sessionId && (
            <div className="bg-[#111111] border border-[#2A2A2A] px-5 py-3 inline-block mb-8">
              <p className="text-[#666666]" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>STRIPE SESSION</p>
              <p className="text-[#888888]" style={{ fontSize: "0.7rem", fontFamily: "Inter, monospace" }}>{sessionId.slice(0, 24)}…</p>
            </div>
          )}

          <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-8 text-left">
            <p className="text-[#C9A84C] text-[0.65rem] tracking-[0.15em] mb-3">WHAT HAPPENS NEXT</p>
            <div className="space-y-3">
              {[
                { step: "01", text: "You'll receive a confirmation email shortly" },
                { step: "02", text: "Your order is packed and dispatched within 1–2 business days" },
                { step: "03", text: "Track your shipment via the link in your email" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="text-[#C9A84C] font-mono text-xs flex-shrink-0 mt-0.5">{s.step}</span>
                  <span className="text-[#888888]" style={{ fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 border border-[#2A2A2A] text-[#888888] px-6 py-3 hover:border-white hover:text-white transition-colors"
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
          >
            <Home size={14} />
            BACK TO HOME
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-6 py-3 hover:bg-[#D4B55A] transition-colors"
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            <ShoppingBag size={14} />
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
