import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search, ShoppingBag, User, Heart, Menu, X, ChevronDown
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { products } from "../data/products";

const navLinks = [
  {
    label: "Women",
    href: "/products?category=women",
    sub: [
      { label: "Sports Bras", href: "/products?category=women&sub=Sports+Bras" },
      { label: "Leggings", href: "/products?category=women&sub=Leggings" },
      { label: "Shorts", href: "/products?category=women&sub=Shorts" },
      { label: "Tops", href: "/products?category=women&sub=Tops" },
      { label: "Hoodies", href: "/products?category=women&sub=Hoodies" },
    ],
  },
  {
    label: "Men",
    href: "/products?category=men",
    sub: [
      { label: "T-Shirts", href: "/products?category=men&sub=T-Shirts" },
      { label: "Shorts", href: "/products?category=men&sub=Shorts" },
      { label: "Joggers", href: "/products?category=men&sub=Joggers" },
      { label: "Hoodies", href: "/products?category=men&sub=Hoodies" },
      { label: "Compression", href: "/products?category=men&sub=Compression+Shorts" },
    ],
  },
  {
    label: "Accessories",
    href: "/products?category=accessories",
    sub: [
      { label: "Bags", href: "/products?category=accessories&sub=Bags" },
      { label: "Drinkware", href: "/products?category=accessories&sub=Drinkware" },
    ],
  },
  { label: "Blog", href: "/blog", sub: [] },
];

export function Navbar() {
  const navigate = useNavigate();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase();
      setSuggestions(
        products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.tags.some((t) => t.includes(q)) ||
              p.subcategory.toLowerCase().includes(q)
          )
          .slice(0, 5)
      );
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-secondary-foreground text-center py-2 px-4 text-xs tracking-widest font-medium">
        FREE SHIPPING ON ORDERS OVER $120 · USE CODE <strong>HERITAGE10</strong> FOR 10% OFF YOUR FIRST ORDER
      </div>

      <nav
        className="sticky top-0 z-50 transition-all duration-300 bg-black border-b border-accent-terracotta/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 bg-secondary flex items-center justify-center rounded-sm"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  <span className="text-secondary-foreground font-bold text-[0.6rem]">S</span>
                </div>
                <span className="tracking-[0.25em] text-[1.4rem] font-semibold text-white">
                  SLCKK
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.sub.length > 0 && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 transition-colors py-2 text-[0.8rem] tracking-[0.12em] text-white/80 hover:text-white"
                  >
                    {link.label.toUpperCase()}
                    {link.sub.length > 0 && <ChevronDown size={12} />}
                  </Link>

                  {link.sub.length > 0 && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-48 bg-card border border-border shadow-xl py-2 z-50">
                      {link.sub.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-[0.8rem] tracking-[0.05em]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  className="transition-colors p-1 text-white/80 hover:text-white"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>

                {searchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border shadow-xl z-50">
                    <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-border">
                      <Search size={16} className="ml-3 text-muted-foreground" />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent text-foreground px-3 py-3 outline-none text-sm"
                      />
                    </form>
                    {suggestions.length > 0 && (
                      <div className="py-1">
                        {suggestions.map((p) => (
                          <button
                            key={p.id}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted text-left"
                            onClick={() => {
                              navigate(`/products/${p.id}`);
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover" />
                            <div>
                              <div className="text-foreground text-[0.8rem]">{p.name}</div>
                              <div className="text-secondary text-[0.75rem]">${p.price}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchQuery.length > 1 && suggestions.length === 0 && (
                      <div className="px-4 py-3 text-muted-foreground text-[0.8rem]">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/account?tab=wishlist" className="relative transition-colors p-1 hidden sm:block text-white/80 hover:text-white" aria-label="Wishlist">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-[0.6rem] font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link to="/account" className="transition-colors p-1 hidden sm:block text-white/80 hover:text-white" aria-label="Account">
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                className="relative transition-colors p-1 text-white/80 hover:text-white"
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-[0.6rem] font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-foreground tracking-[0.25em] text-[1.2rem] font-semibold">SLCKK</span>
              <button onClick={() => setMobileOpen(false)} className="text-foreground p-1">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 py-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className="block px-6 py-3 text-foreground hover:text-secondary transition-colors text-[0.85rem] tracking-[0.12em]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                  {link.sub.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.href}
                      className="block px-10 py-2 text-muted-foreground hover:text-secondary transition-colors text-[0.8rem]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to="/support"
                className="block px-6 py-3 text-foreground hover:text-secondary transition-colors text-[0.85rem] tracking-[0.12em]"
                onClick={() => setMobileOpen(false)}
              >
                SUPPORT
              </Link>
              <Link
                to="/account"
                className="block px-6 py-3 text-foreground hover:text-secondary transition-colors text-[0.85rem] tracking-[0.12em]"
                onClick={() => setMobileOpen(false)}
              >
                {isLoggedIn ? "MY ACCOUNT" : "LOGIN / REGISTER"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
