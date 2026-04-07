import { Link } from "react-router";
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-cream border-t border-white/10">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-light mb-2 text-primary-cream">
                Join the Community
              </h3>
              <p className="text-primary-taupe text-sm leading-relaxed">
                Subscribe for exclusive drops, training tips, and cultural stories. Be the first to know about new collections and limited-edition heritage pieces.
              </p>
            </div>
            <div>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 text-primary-cream placeholder:text-primary-taupe/60 px-4 py-3 outline-none focus:border-accent-terracotta transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="bg-accent-terracotta text-white px-6 py-3 hover:bg-accent-terracotta/90 transition-colors flex-shrink-0 text-xs tracking-widest font-semibold"
                >
                  SUBSCRIBE
                </button>
              </form>
              <p className="text-primary-taupe/50 mt-2 text-xs">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 bg-accent-terracotta flex items-center justify-center"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <span className="text-white font-bold text-[0.55rem]">S</span>
              </div>
              <span className="text-primary-cream tracking-[0.25em] text-[1.3rem] font-semibold">
                SLICKK
              </span>
            </Link>
            <p className="text-primary-taupe/70 mb-6 text-sm leading-relaxed">
              Premium gymwear celebrating Thai heritage. Crafted for athletes who honor their roots while pushing boundaries.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-primary-taupe hover:text-accent-terracotta hover:border-accent-terracotta transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-primary-cream mb-4 text-[0.7rem] tracking-[0.15em] font-semibold">
              SHOP
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Women's Collection", href: "/products?category=women" },
                { label: "Men's Collection", href: "/products?category=men" },
                { label: "Accessories", href: "/products?category=accessories" },
                { label: "New Arrivals", href: "/products?filter=new" },
                { label: "Bestsellers", href: "/products?filter=bestseller" },
                { label: "Sale", href: "/products?filter=sale" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-taupe/70 hover:text-accent-terracotta transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-primary-cream mb-4 text-[0.7rem] tracking-[0.15em] font-semibold">
              HELP
            </h4>
            <ul className="space-y-2">
              {[
                { label: "FAQ", href: "/support" },
                { label: "Shipping Info", href: "/support#shipping" },
                { label: "Returns & Exchanges", href: "/returns" },
                { label: "Size Guide", href: "/support#sizing" },
                { label: "Contact Us", href: "/support#contact" },
                { label: "Track My Order", href: "/account" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-taupe/70 hover:text-accent-terracotta transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-cream mb-4 text-[0.7rem] tracking-[0.15em] font-semibold">
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-accent-sage mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@slickk.com" className="text-primary-taupe/70 hover:text-primary-cream transition-colors text-sm">
                  hello@slickk.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-accent-sage mt-0.5 flex-shrink-0" />
                <span className="text-primary-taupe/70 text-sm">
                  +66 2-100 9000
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-accent-sage mt-0.5 flex-shrink-0" />
                <span className="text-primary-taupe/70 text-sm">
                  Bangkok, Thailand
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-primary-taupe/50 text-xs">Mon–Fri: 9am–6pm ICT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-primary-taupe/40 text-xs">
              © 2026 SLICKK. All rights reserved. Rooted in Thai Heritage.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <Link
                  key={item}
                  to="/support"
                  className="text-primary-taupe/40 hover:text-primary-taupe/70 transition-colors text-xs"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          {/* Payment icons */}
          <div className="flex items-center justify-center gap-3 mt-3">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((p) => (
              <div key={p} className="px-2 py-1 border border-white/10 bg-white/5 text-[0.55rem] text-primary-taupe/50 tracking-widest">
                {p}
              </div>
            ))}
            <div className="flex items-center gap-1 text-primary-taupe/40 text-[0.65rem]">
              🔒 SSL Secured
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
