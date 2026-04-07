import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Returned";
  total: number;
  items: { name: string; quantity: number; price: number; size: string }[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (userData: any) => void;
}

const mockUser: User = {
  id: "u001",
  name: "Alex Tan",
  email: "alex.tan@email.com",
  orders: [
    {
      id: "ORD-001234",
      date: "2026-01-20",
      status: "Delivered",
      total: 154,
      items: [
        { name: "Obsidian High-Waist Leggings", quantity: 1, price: 89, size: "M" },
        { name: "Batik Heritage Sports Bra", quantity: 1, price: 65, size: "M" },
      ],
    },
    {
      id: "ORD-001189",
      date: "2025-12-10",
      status: "Delivered",
      total: 125,
      items: [
        { name: "Heritage Strength Hoodie", quantity: 1, price: 125, size: "L" },
      ],
    },
    {
      id: "ORD-001345",
      date: "2026-02-15",
      status: "Shipped",
      total: 65,
      items: [
        { name: "Warrior Performance Tee", quantity: 1, price: 65, size: "M" },
      ],
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    // Mock login - accept any credentials
    await new Promise((r) => setTimeout(r, 800));
    setUser({ ...mockUser, email });
    return true;
  };

  const logout = () => setUser(null);

  const register = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    setUser({ ...mockUser, name, email, orders: [] });
    return true;
  };

  const loginWithGoogle = (userData: any) => {
    setUser({
      ...mockUser,
      id: userData.sub || "google-user",
      name: userData.name,
      email: userData.email,
      avatar: userData.picture,
      orders: []
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, register, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
