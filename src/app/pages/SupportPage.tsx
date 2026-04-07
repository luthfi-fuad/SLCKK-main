import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Mail, Phone, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping within Malaysia and Singapore takes 3-5 business days. Orders to other Southeast Asian countries take 5-10 business days. International orders take 7-14 business days. Express shipping (2-3 business days) is available at checkout.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $120 USD (or equivalent). For orders under this threshold, standard shipping is $12 USD. Express shipping is available for $25 USD.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order ships, you'll receive a tracking number via email. You can also view order status in your account under 'My Orders'.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. International shipping rates and times vary by destination. Some remote locations may have restricted delivery.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Sale items are final sale and cannot be returned.",
      },
      {
        q: "How do I initiate a return?",
        a: "Visit our Returns page to submit a return request. You'll need your order number and the reason for return. We'll send you a prepaid return label within 1-2 business days.",
      },
      {
        q: "How long does a refund take?",
        a: "Once we receive and inspect your return, refunds are processed within 3-5 business days. The time to appear in your account depends on your payment provider (typically 5-10 business days).",
      },
    ],
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        q: "How do SLCKK products fit?",
        a: "Our products are designed with an athletic fit in mind. We recommend measuring yourself and comparing to our size guide on each product page. If you're between sizes, size up for a more relaxed fit or size down for a compression fit.",
      },
      {
        q: "What materials do you use?",
        a: "We use premium performance fabrics including recycled nylon, spandex blends, and our proprietary SLCKK-Flex fabric. All materials are selected for durability, performance, and minimal environmental impact.",
      },
      {
        q: "How should I care for my SLCKK garments?",
        a: "Machine wash cold with like colors. Do not use fabric softener as it can damage moisture-wicking properties. Hang dry or tumble dry on low. Do not iron directly on prints or embroidery.",
      },
      {
        q: "Are your products sustainable?",
        a: "Sustainability is core to our mission. Our Dragon Training Shorts are made from 100% recycled polyester. We're committed to transitioning our full range to sustainable materials by 2027.",
      },
    ],
  },
  {
    category: "Payments & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are secured with 256-bit SSL encryption.",
      },
      {
        q: "Is my payment information safe?",
        a: "Yes. We never store your full card details. All payments are processed through PCI-compliant payment gateways. Your data is protected according to our Privacy Policy.",
      },
      {
        q: "Can I use a promo code?",
        a: "Yes! Enter your promo code during checkout. Promo codes cannot be combined with other offers unless explicitly stated. New customers can use HERITAGE10 for 10% off their first order.",
      },
    ],
  },
];

export function SupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);
  const [chatOpen, setChatOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "agent"; text: string }[]>([
    { role: "agent", text: "Hi there! Welcome to SLCKK Support. How can I help you today? 👋" },
  ]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const msg = chatMessage.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatMessage("");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        role: "agent",
        text: "Thanks for your message! Our team will get back to you shortly. For immediate assistance, you can also email us at hello@slckk.com.",
      }]);
    }, 1000);
  };

  const currentFaq = faqs.find((f) => f.category === activeCategory);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Header */}
      <div className="bg-[#080808] border-b border-[#2A2A2A] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 mb-4" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif", color: "#666666" }}>
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#888888]">Support</span>
          </nav>
          <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif" }}>HELP CENTER</span>
          <h1 className="text-white mt-2 mb-3" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "3rem", fontWeight: 300 }}>
            How Can We Help?
          </h1>
          <p className="text-[#AAAAAA]" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif" }}>
            Find answers, get in touch, or browse our FAQs below.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: Mail,
              title: "Email Us",
              desc: "hello@slckk.com",
              sub: "Response within 24 hours",
              action: () => {},
            },
            {
              icon: Phone,
              title: "Call Us",
              desc: "+60 3-2100 9000",
              sub: "Mon–Fri, 9am–6pm MYT",
              action: () => {},
            },
            {
              icon: MessageCircle,
              title: "Live Chat",
              desc: "Chat with an agent",
              sub: "Typically replies in minutes",
              action: () => setChatOpen(true),
            },
          ].map((card) => (
            <button
              key={card.title}
              onClick={card.action}
              className="bg-[#111111] border border-[#2A2A2A] p-6 text-left hover:border-[#C9A84C] transition-colors group"
            >
              <div className="w-10 h-10 border border-[#2A2A2A] group-hover:border-[#C9A84C] flex items-center justify-center mb-4 transition-colors">
                <card.icon size={18} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white mb-1" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontWeight: 500 }}>{card.title}</h3>
              <p className="text-[#CCCCCC]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>{card.desc}</p>
              <p className="text-[#888888] flex items-center gap-1 mt-1" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
                <Clock size={10} /> {card.sub}
              </p>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mb-16">
          <div className="text-center mb-8">
            <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300 }}>Find Your Answers</h2>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {faqs.map((f) => (
              <button
                key={f.category}
                onClick={() => setActiveCategory(f.category)}
                className={`px-4 py-2 border transition-colors ${activeCategory === f.category ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10" : "border-[#2A2A2A] text-[#888888] hover:border-[#888888] hover:text-white"}`}
                style={{ fontSize: "0.7rem", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
              >
                {f.category.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {currentFaq?.questions.map((item, i) => {
              const key = `${activeCategory}-${i}`;
              const isOpen = openFaq === key;
              return (
                <div key={key} className="border border-[#2A2A2A] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : key)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#111111] transition-colors"
                  >
                    <span className={isOpen ? "text-[#C9A84C]" : "text-white"} style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif" }}>
                      {item.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#888888] transition-transform flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-4 border-t border-[#1A1A1A]">
                          <p className="text-[#AAAAAA] pt-3" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}>
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact" className="grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif" }}>SEND US A MESSAGE</span>
            <h2 className="text-white mt-2 mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300 }}>Get In Touch</h2>
            <p className="text-[#AAAAAA] mb-6" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}>
              Can't find what you're looking for? Fill in the form and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              {[
                { label: "📍 Address", value: "Level 12, Menara KL, Kuala Lumpur, Malaysia" },
                { label: "📧 Email", value: "hello@slckk.com" },
                { label: "📞 Phone", value: "+60 3-2100 9000" },
                { label: "🕒 Hours", value: "Mon–Fri, 9:00am–6:00pm MYT" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>{item.label}</span>
                  <p className="text-[#CCCCCC]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {contactSent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <CheckCircle size={48} className="text-[#C9A84C] mb-4" />
                <h3 className="text-white mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 400 }}>Message Sent!</h3>
                <p className="text-[#AAAAAA]" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                  We'll get back to you within 24 hours.
                </p>
                <button onClick={() => setContactSent(false)} className="mt-4 text-[#C9A84C] hover:underline" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {[
                  { label: "YOUR NAME", key: "name", type: "text" },
                  { label: "EMAIL ADDRESS", key: "email", type: "email" },
                  { label: "SUBJECT", key: "subject", type: "text" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[#888888] mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
                      {field.label} *
                    </label>
                    <input
                      required
                      type={field.type}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors"
                      style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[#888888] mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors resize-none"
                    style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <button type="submit" className="w-full bg-[#C9A84C] text-[#0A0A0A] py-3.5 hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                  <Send size={14} /> SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 sm:right-6 w-80 bg-[#111111] border border-[#2A2A2A] shadow-2xl z-50 flex flex-col"
            style={{ height: 400 }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#C9A84C] text-[#0A0A0A]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-900 rounded-full" />
                <span style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>SLCKK Support</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-[#0A0A0A] hover:opacity-70" style={{ fontSize: "1.1rem" }}>×</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded ${msg.role === "user" ? "bg-[#C9A84C] text-[#0A0A0A]" : "bg-[#1A1A1A] text-[#CCCCCC]"}`}
                    style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif", lineHeight: "1.5" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendChatMessage} className="flex border-t border-[#2A2A2A]">
              <input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white px-3 py-2.5 outline-none"
                style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}
              />
              <button type="submit" className="px-3 text-[#C9A84C] hover:text-white transition-colors">
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 right-4 sm:right-6 w-14 h-14 bg-[#C9A84C] text-[#0A0A0A] rounded-full flex items-center justify-center shadow-lg hover:bg-[#D4B55A] transition-colors z-40"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
