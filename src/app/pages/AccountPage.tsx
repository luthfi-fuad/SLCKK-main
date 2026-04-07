import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, ShoppingBag, Heart, LogOut, Package, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router";

declare global {
  interface Window {
    google: any;
  }
}

const inputClass = "w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors";
const labelClass = "block text-[#888888] mb-1";
const inputStyle = { fontSize: "0.875rem", fontFamily: "Inter, sans-serif" };
const labelStyle = { fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" };

function LoginForm() {
  const { login, register, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCredentialResponse = (response: any) => {
      const data = decodeJwtResponse(response.credential);
      loginWithGoogle(data);
    };

    const scriptId = "google-gsi-client";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    let isNewScript = false;

    const renderButton = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: "445115523512-p2fivs27ndva7acq694i01vb5lii333q.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });
        
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { theme: "filled_black", size: "large", type: "standard" }
        );
      }
    };

    if (!script) {
      isNewScript = true;
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    if (isNewScript) {
      script.onload = renderButton;
    } else {
      renderButton();
    }
  }, [loginWithGoogle]);

  const decodeJwtResponse = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64).split("").map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-white mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.5rem", fontWeight: 300 }}>
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h1>
      <p className="text-[#888888] mb-8" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
        {mode === "login"
          ? "Sign in to access your orders, wishlist, and exclusive member benefits."
          : "Join the SLCKK community for faster checkout, order tracking, and exclusive offers."}
      </p>

      <div className="flex gap-0 mb-8 border border-[#2A2A2A]">
        <button onClick={() => setMode("login")} className={`flex-1 py-3 transition-colors ${mode === "login" ? "bg-[#C9A84C] text-[#0A0A0A]" : "text-[#888888] hover:text-white"}`} style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
          SIGN IN
        </button>
        <button onClick={() => setMode("register")} className={`flex-1 py-3 transition-colors ${mode === "register" ? "bg-[#C9A84C] text-[#0A0A0A]" : "text-[#888888] hover:text-white"}`} style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
          REGISTER
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label style={labelStyle} className={labelClass}>FULL NAME *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} style={inputStyle} />
          </div>
        )}
        <div>
          <label style={labelStyle} className={labelClass}>EMAIL ADDRESS *</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} className={labelClass}>PASSWORD *</label>
          <div className="relative">
            <input required type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`} style={inputStyle} />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-white transition-colors">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#C9A84C] text-[#0A0A0A] py-4 hover:bg-[#D4B55A] transition-colors mt-4" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
          {loading ? "LOADING..." : mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A2A2A]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#0A0A0A] text-[#555555]" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              OR CONTINUE WITH
            </span>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <div ref={googleButtonRef} className="w-full flex justify-center"></div>
        </div>
      </div>

      <p className="text-center text-[#555555] mt-6" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-[#C9A84C] hover:underline">
          {mode === "login" ? "Register here" : "Sign in here"}
        </button>
      </p>
    </div>
  );
}

export function AccountPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const { items: wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "profile">("orders");

  const statusColors: Record<string, string> = {
    Processing: "text-yellow-400 bg-yellow-400/10",
    Shipped: "text-blue-400 bg-blue-400/10",
    Delivered: "text-green-400 bg-green-400/10",
    Returned: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <div className="border-b border-[#2A2A2A] bg-[#080808] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-3" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif", color: "#666666" }}>
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#888888]">My Account</span>
          </nav>
          <h1 className="text-white" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.5rem", fontWeight: 300 }}>
            {isLoggedIn ? `Hello, ${user?.name?.split(" ")[0]}` : "My Account"}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isLoggedIn ? (
          <LoginForm />
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-[#2A2A2A] p-5 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
                    <User size={20} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="text-white" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{user?.name}</div>
                    <div className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>{user?.email}</div>
                  </div>
                </div>
              </div>
              <div className="bg-[#111111] border border-[#2A2A2A] overflow-hidden">
                {[
                  { id: "orders", label: "My Orders", icon: ShoppingBag, count: user?.orders.length },
                  { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlist.length },
                  { id: "profile", label: "Profile", icon: User, count: null },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as typeof activeTab)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 border-b border-[#1A1A1A] last:border-b-0 transition-colors ${activeTab === item.id ? "bg-[#1A1A1A] text-[#C9A84C]" : "text-[#888888] hover:text-white"}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={15} />
                      <span style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== null && item.count !== undefined && (
                        <span className="w-5 h-5 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] flex items-center justify-center" style={{ fontSize: "0.65rem", fontFamily: "Inter, sans-serif" }}>
                          {item.count}
                        </span>
                      )}
                      <ChevronRight size={12} />
                    </div>
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-[#888888] hover:text-red-400 transition-colors"
                >
                  <LogOut size={15} />
                  <span style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {activeTab === "orders" && (
                  <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>Order History</h2>
                    {user?.orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package size={48} className="text-[#333333] mx-auto mb-4" />
                        <p className="text-[#888888]" style={{ fontFamily: "Inter, sans-serif" }}>You haven't placed any orders yet.</p>
                        <Link to="/products" className="mt-4 inline-block text-[#C9A84C] hover:underline" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>Start Shopping</Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user?.orders.map((order) => (
                          <div key={order.id} className="bg-[#111111] border border-[#2A2A2A] p-5">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="text-white" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{order.id}</div>
                                <div className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
                                  {new Date(order.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-0.5 rounded-sm ${statusColors[order.status]}`} style={{ fontSize: "0.65rem", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
                                  {order.status.toUpperCase()}
                                </span>
                                <span className="text-[#C9A84C]" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>${order.total}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between">
                                  <span className="text-[#CCCCCC]" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                                    {item.name} <span className="text-[#666666]">× {item.quantity}</span> <span className="text-[#666666]">({item.size})</span>
                                  </span>
                                  <span className="text-[#888888]" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>${item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "wishlist" && (
                  <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>My Wishlist</h2>
                    {wishlist.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart size={48} className="text-[#333333] mx-auto mb-4" />
                        <p className="text-[#888888]" style={{ fontFamily: "Inter, sans-serif" }}>Your wishlist is empty.</p>
                        <Link to="/products" className="mt-4 inline-block text-[#C9A84C] hover:underline" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>Discover Products</Link>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlist.map((p) => (
                          <div key={p.id} className="group">
                            <div className="relative overflow-hidden bg-[#111111] aspect-[3/4]">
                              <Link to={`/products/${p.id}`}>
                                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              </Link>
                            </div>
                            <div className="mt-2">
                              <Link to={`/products/${p.id}`}>
                                <h4 className="text-white hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", fontWeight: 500 }}>{p.name}</h4>
                                <span className="text-[#C9A84C]" style={{ fontSize: "0.85rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>${p.price}</span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h2 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}>My Profile</h2>
                    <div className="bg-[#111111] border border-[#2A2A2A] p-6 space-y-4">
                      {[
                        { label: "FULL NAME", value: user?.name || "" },
                        { label: "EMAIL ADDRESS", value: user?.email || "" },
                        { label: "PHONE", value: "+60 12 345 6789" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label style={labelStyle} className={labelClass}>{field.label}</label>
                          <input defaultValue={field.value} className={inputClass} style={inputStyle} />
                        </div>
                      ))}
                      <button className="bg-[#C9A84C] text-[#0A0A0A] px-6 py-3 hover:bg-[#D4B55A] transition-colors mt-2" style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                        SAVE CHANGES
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
