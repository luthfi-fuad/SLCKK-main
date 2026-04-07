import { Link } from "react-router";
import { motion } from "motion/react";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";

export function CancelPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="w-24 h-24 rounded-full bg-[#888888]/10 border-2 border-[#888888]/20 flex items-center justify-center"
          >
            <XCircle size={48} className="text-[#888888]" />
          </motion.div>
        </div>

        <p className="text-[#888888] text-[0.7rem] tracking-[0.25em] mb-3">CHECKOUT CANCELLED</p>
        <h1 className="text-white mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "3rem", fontWeight: 300 }}>
          Payment Cancelled
        </h1>
        <p className="text-[#666666] mb-8" style={{ fontSize: "0.92rem", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
          No worries — your bag has been kept for you. Head back to checkout whenever you're ready to complete your order.
        </p>

        <div className="bg-[#111111] border border-[#2A2A2A] p-5 mb-8">
          <p className="text-[#888888]" style={{ fontSize: "0.82rem", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Your cart items are still saved. You can return to the checkout page at any time to complete your purchase securely with Stripe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 border border-[#2A2A2A] text-[#888888] px-6 py-3 hover:border-white hover:text-white transition-colors"
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
          >
            <ArrowLeft size={14} />
            RETURN TO CART
          </Link>
          <Link
            to="/checkout"
            className="flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-6 py-3 hover:bg-[#D4B55A] transition-colors"
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            <ShoppingBag size={14} />
            TRY AGAIN
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
