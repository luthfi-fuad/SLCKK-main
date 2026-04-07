import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sessionId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate or retrieve a persistent session ID
function getSessionId(): string {
  let id = localStorage.getItem("slckk_session_id");
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("slckk_session_id", id);
  }
  return id;
}

async function syncCartToBackend(sessionId: string, items: CartItem[]) {
  try {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, items }),
    });
  } catch (err) {
    console.warn("Failed to sync cart to backend:", err);
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState<string>(getSessionId);
  const [loaded, setLoaded] = useState(false);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load cart from backend on mount
  useEffect(() => {
    fetch(`/api/cart?sessionId=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {
        // Fallback to localStorage if backend unreachable
        const saved = localStorage.getItem("slckk_cart");
        if (saved) {
          try { setItems(JSON.parse(saved)); } catch {}
        }
      })
      .finally(() => setLoaded(true));
  }, [sessionId]);

  // Debounced sync to backend whenever items change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("slckk_cart", JSON.stringify(items));
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      syncCartToBackend(sessionId, items);
    }, 500);
  }, [items, loaded, sessionId]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, size, color, quantity }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.size === size && i.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size && i.color === color
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    // Clear on backend too
    fetch(`/api/cart?sessionId=${sessionId}`, { method: "DELETE" }).catch(() => {});
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        sessionId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
