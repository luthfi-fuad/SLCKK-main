import { Link, useNavigate } from "react-router";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0D0D0D] border-l border-[#2A2A2A] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#C9A84C]" />
            <h2 className="text-white" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontWeight: 500, letterSpacing: "0.1em" }}>
              YOUR BAG ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#888888] hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <ShoppingBag size={48} className="text-[#333333]" />
              <p className="text-[#888888]" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}>
                Your bag is empty
              </p>
              <button
                onClick={() => { setIsOpen(false); navigate("/products"); }}
                className="px-6 py-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-colors"
                style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
              >
                SHOP NOW
              </button>
            </div>
          ) : (
            <div className="px-6 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 py-4 border-b border-[#1A1A1A]"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="text-white hover:text-[#C9A84C] transition-colors pr-2"
                        style={{ fontSize: "0.85rem", fontFamily: "Inter, sans-serif" }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        className="text-[#555555] hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
                        Size: {item.size}
                      </span>
                      <span className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
                        Color: {item.color}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#2A2A2A]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-white" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[#C9A84C]" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-[#2A2A2A] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#888888]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                Subtotal
              </span>
              <span className="text-white" style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-[#666666]" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
              Shipping calculated at checkout. Free on orders over $120.
            </p>
            <button
              onClick={() => { setIsOpen(false); navigate("/checkout"); }}
              className="w-full bg-[#C9A84C] text-[#0A0A0A] py-3 hover:bg-[#D4B55A] transition-colors"
              style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
            >
              CHECKOUT
            </button>
            <button
              onClick={() => { setIsOpen(false); navigate("/cart"); }}
              className="w-full border border-[#2A2A2A] text-[#888888] py-3 hover:border-[#888888] hover:text-white transition-colors"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
            >
              VIEW BAG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
