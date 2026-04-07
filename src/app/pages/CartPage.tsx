import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const shipping = totalPrice - discount >= 120 ? 0 : 12;
  const finalTotal = totalPrice - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "HERITAGE10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try HERITAGE10 for 10% off.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <ShoppingBag size={64} className="text-[#333333] mx-auto mb-6" />
          <h2 className="text-white mb-3" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300 }}>
            Your bag is empty
          </h2>
          <p className="text-[#888888] mb-8" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}>
            Looks like you haven't added anything to your bag yet. Explore our collections and find something you love.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-8 py-3.5 hover:bg-[#D4B55A] transition-colors"
            style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            CONTINUE SHOPPING <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#2A2A2A] bg-[#080808] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-3" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif", color: "#666666" }}>
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#888888]">Shopping Bag</span>
          </nav>
          <h1 className="text-white" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.5rem", fontWeight: 300 }}>
            Your Bag ({items.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-5 bg-[#111111] border border-[#2A2A2A] p-4 sm:p-5"
              >
                <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-28 sm:w-28 sm:h-32 object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#888888] mb-0.5" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
                        {item.product.subcategory.toUpperCase()}
                      </p>
                      <Link to={`/products/${item.product.id}`}>
                        <h3 className="text-white hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontWeight: 500 }}>
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                      className="text-[#555555] hover:text-red-400 transition-colors ml-2 flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>Size: <span className="text-white">{item.size}</span></span>
                    <span className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>Color: <span className="text-white">{item.color}</span></span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-[#2A2A2A]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-white" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      {item.product.originalPrice && (
                        <div className="text-[#666666] line-through" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
                          ${(item.product.originalPrice * item.quantity).toFixed(2)}
                        </div>
                      )}
                      <div className="text-[#C9A84C]" style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <div className="flex items-center justify-between pt-2">
              <Link
                to="/products"
                className="text-[#888888] hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-[#555555] hover:text-red-400 transition-colors"
                style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}
              >
                Clear bag
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#111111] border border-[#2A2A2A] p-6 sticky top-24">
              <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 400 }}>
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white pl-9 pr-3 py-2.5 outline-none focus:border-[#C9A84C] transition-colors"
                      style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied}
                    className="px-4 border border-[#2A2A2A] text-[#888888] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors disabled:opacity-50"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
                  >
                    {promoApplied ? "✓" : "APPLY"}
                  </button>
                </div>
                {promoError && <p className="text-red-400 mt-1" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>{promoError}</p>}
                {promoApplied && <p className="text-green-400 mt-1" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>✓ HERITAGE10 applied — 10% off</p>}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-[#2A2A2A] pt-4">
                <div className="flex justify-between">
                  <span className="text-[#888888]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>Subtotal</span>
                  <span className="text-white" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>${totalPrice.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between">
                    <span className="text-green-400" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>Discount (10%)</span>
                    <span className="text-green-400" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#888888]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>Shipping</span>
                  <span className={shipping === 0 ? "text-green-400" : "text-white"} style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[#666666]" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
                    Add ${(120 - (totalPrice - discount)).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-[#2A2A2A] pt-3 flex justify-between">
                  <span className="text-white" style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Total</span>
                  <span className="text-[#C9A84C]" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 600 }}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-[#C9A84C] text-[#0A0A0A] py-4 hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2"
                style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
              >
                PROCEED TO CHECKOUT <ArrowRight size={14} />
              </button>

              <div className="mt-4 text-center text-[#555555]" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
                🔒 Secure & encrypted checkout
              </div>

              {/* Payment Methods */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {["VISA", "MC", "AMEX", "PAYPAL"].map((p) => (
                  <div key={p} className="px-2 py-0.5 border border-[#2A2A2A] bg-[#0A0A0A]" style={{ fontSize: "0.55rem", color: "#666666", fontFamily: "Inter, sans-serif" }}>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
