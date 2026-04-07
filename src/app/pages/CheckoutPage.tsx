import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Lock, ExternalLink, ShoppingBag, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

type Step = "info" | "shipping" | "payment";

const inputClass = "w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors";
const labelClass = "block text-[#888888] mb-1";
const inputStyle = { fontSize: "0.875rem", fontFamily: "Inter, sans-serif" };
const labelStyle = { fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" };

export function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [isGuest, setIsGuest] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState("");

  const [info, setInfo] = useState({ email: "", firstName: "", lastName: "", phone: "" });
  const [shipping, setShipping] = useState({
    address: "", city: "", state: "", zip: "", country: "Malaysia",
    method: "standard",
  });

  const shippingCost = totalPrice >= 120 ? 0 : shipping.method === "express" ? 25 : 12;
  const finalTotal = totalPrice + shippingCost;

  const handleInfoNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("shipping");
  };

  const handleShippingNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleStripeCheckout = async () => {
    setLoading(true);
    setStripeError("");
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setStripeError(data.error || "Failed to start checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      setStripeError("Unable to connect to payment server. Please try again.");
      setLoading(false);
    }
  };

  const steps = [
    { id: "info", label: "Contact" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  if (items.length === 0) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={56} className="text-[#333333] mx-auto mb-5" />
          <h2 className="text-white mb-3" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 300 }}>
            Your bag is empty
          </h2>
          <Link to="/products" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-6 py-3 hover:bg-[#D4B55A] transition-colors" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
            BROWSE PRODUCTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#2A2A2A] bg-[#080808] py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 600, letterSpacing: "0.25em", color: "white" }}>
            SLCKK
          </Link>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 ${step === s.id ? "text-[#C9A84C]" : "text-[#444444]"}`}>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${step === s.id ? "border-[#C9A84C] bg-[#C9A84C]/20" : "border-[#333333]"}`}>
                    <span style={{ fontSize: "0.6rem", fontFamily: "Inter, sans-serif" }}>{i + 1}</span>
                  </div>
                  <span className="hidden sm:block" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
                    {s.label.toUpperCase()}
                  </span>
                </div>
                {i < steps.length - 1 && <ChevronRight size={12} className="text-[#333333]" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-[#888888]" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
            <Lock size={12} />
            <span>Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">

              {/* CONTACT INFO */}
              {step === "info" && (
                <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>
                    Contact Information
                  </h2>

                  <div className="flex gap-3 mb-6">
                    <button onClick={() => setIsGuest(true)} className={`flex-1 py-2.5 border transition-colors ${isGuest ? "border-[#C9A84C] text-[#C9A84C]" : "border-[#2A2A2A] text-[#888888]"}`} style={{ fontSize: "0.75rem", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
                      GUEST CHECKOUT
                    </button>
                    <button onClick={() => setIsGuest(false)} className={`flex-1 py-2.5 border transition-colors ${!isGuest ? "border-[#C9A84C] text-[#C9A84C]" : "border-[#2A2A2A] text-[#888888]"}`} style={{ fontSize: "0.75rem", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
                      SIGN IN
                    </button>
                  </div>

                  <form onSubmit={handleInfoNext} className="space-y-4">
                    <div>
                      <label style={labelStyle} className={labelClass}>EMAIL ADDRESS *</label>
                      <input required type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className={inputClass} style={inputStyle} placeholder="your@email.com" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label style={labelStyle} className={labelClass}>FIRST NAME *</label>
                        <input required value={info.firstName} onChange={(e) => setInfo({ ...info, firstName: e.target.value })} className={inputClass} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle} className={labelClass}>LAST NAME *</label>
                        <input required value={info.lastName} onChange={(e) => setInfo({ ...info, lastName: e.target.value })} className={inputClass} style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle} className={labelClass}>PHONE NUMBER</label>
                      <input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className={inputClass} style={inputStyle} placeholder="+60 12 345 6789" />
                    </div>
                    <button type="submit" className="w-full bg-[#C9A84C] text-[#0A0A0A] py-4 hover:bg-[#D4B55A] transition-colors mt-4" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                      CONTINUE TO SHIPPING
                    </button>
                  </form>
                </motion.div>
              )}

              {/* SHIPPING */}
              {step === "shipping" && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>
                    Shipping Address
                  </h2>
                  <form onSubmit={handleShippingNext} className="space-y-4">
                    <div>
                      <label style={labelStyle} className={labelClass}>STREET ADDRESS *</label>
                      <input required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className={inputClass} style={inputStyle} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label style={labelStyle} className={labelClass}>CITY *</label>
                        <input required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className={inputClass} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle} className={labelClass}>STATE/REGION *</label>
                        <input required value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className={inputClass} style={inputStyle} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label style={labelStyle} className={labelClass}>POSTAL CODE *</label>
                        <input required value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className={inputClass} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle} className={labelClass}>COUNTRY</label>
                        <select value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className={inputClass} style={{ ...inputStyle, backgroundColor: "#0A0A0A" }}>
                          {["Malaysia", "Singapore", "Indonesia", "Thailand", "Vietnam", "Philippines", "Cambodia", "Myanmar", "Australia", "United Kingdom", "United States"].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label style={labelStyle} className={`${labelClass} mb-3 block`}>SHIPPING METHOD</label>
                      <div className="space-y-3">
                        {[
                          { id: "standard", label: "Standard Shipping", time: "5-7 business days", price: totalPrice >= 120 ? "FREE" : "$12" },
                          { id: "express", label: "Express Shipping", time: "2-3 business days", price: "$25" },
                        ].map((m) => (
                          <label key={m.id} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shipping.method === m.id ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-[#2A2A2A] hover:border-[#888888]"}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 ${shipping.method === m.id ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#555555]"}`} />
                              <div>
                                <div className="text-white" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>{m.label}</div>
                                <div className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>{m.time}</div>
                              </div>
                            </div>
                            <span className={`${m.id === "standard" && totalPrice >= 120 ? "text-green-400" : "text-white"}`} style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                              {m.price}
                            </span>
                            <input type="radio" className="hidden" checked={shipping.method === m.id} onChange={() => setShipping({ ...shipping, method: m.id })} />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep("info")} className="px-6 py-3 border border-[#2A2A2A] text-[#888888] hover:border-white hover:text-white transition-colors" style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
                        BACK
                      </button>
                      <button type="submit" className="flex-1 bg-[#C9A84C] text-[#0A0A0A] py-3 hover:bg-[#D4B55A] transition-colors" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                        CONTINUE TO PAYMENT
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* PAYMENT — Stripe */}
              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>
                    Payment
                  </h2>

                  <div className="bg-[#111111] border border-[#2A2A2A] p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#635BFF]/20 flex items-center justify-center">
                        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                          <path d="M14.5 13.5c0-1.1.9-1.5 2.3-1.5 2 0 4.6.6 6.5 1.7V8.4c-2.2-.9-4.4-1.2-6.5-1.2-5.4 0-9 2.8-9 7.4 0 7.3 10 6.1 10 9.3 0 1.3-1.1 1.7-2.7 1.7-2.3 0-5.3-.9-7.6-2.2v5.4c2.6 1.1 5.2 1.6 7.6 1.6 5.8 0 9.6-2.8 9.6-7.5-.1-7.8-10.2-6.4-10.2-9.4z" fill="#635BFF"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white" style={{ fontSize: "0.95rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Secure Stripe Checkout</div>
                        <div className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>You'll be redirected to Stripe's secure payment page</div>
                      </div>
                    </div>
                    <p className="text-[#666666]" style={{ fontSize: "0.78rem", fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}>
                      We use Stripe to process your payment securely. Your card details are never stored on our servers. Stripe is certified to PCI Service Provider Level 1 — the most stringent level of certification available.
                    </p>
                  </div>

                  {stripeError && (
                    <div className="bg-red-900/20 border border-red-500/30 p-4 mb-4 flex items-start gap-3">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>{stripeError}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-6 p-3 bg-[#111111] border border-[#2A2A2A]">
                    <Lock size={14} className="text-[#C9A84C] flex-shrink-0" />
                    <span className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
                      256-bit SSL encryption · PCI DSS compliant · Powered by Stripe
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep("shipping")} className="px-6 py-3 border border-[#2A2A2A] text-[#888888] hover:border-white hover:text-white transition-colors" style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
                      BACK
                    </button>
                    <button
                      onClick={handleStripeCheckout}
                      disabled={loading}
                      className="flex-1 bg-[#635BFF] text-white py-4 hover:bg-[#7A73FF] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                      style={{ fontSize: "0.85rem", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
                      id="stripe-pay-button"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
                          </svg>
                          REDIRECTING TO STRIPE...
                        </span>
                      ) : (
                        <>
                          <ExternalLink size={16} />
                          PAY ${finalTotal.toFixed(2)} WITH STRIPE
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-[#111111] border border-[#2A2A2A] p-6 sticky top-6">
              <h3 className="text-white mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.25rem", fontWeight: 400 }}>
                Order Summary
              </h3>
              <div className="space-y-3 mb-6 max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-16 object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C9A84C] text-[#0A0A0A] rounded-full flex items-center justify-center" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>{item.product.name}</p>
                      <p className="text-[#888888]" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
                        {item.size} · {item.color}
                      </p>
                      <p className="text-[#C9A84C] mt-0.5" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2A2A2A] pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#888888]" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>Subtotal</span>
                  <span className="text-white" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-400" : "text-white"} style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-[#2A2A2A] pt-2 flex justify-between">
                  <span className="text-white" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Total</span>
                  <span className="text-[#C9A84C]" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.25rem", fontWeight: 600 }}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
