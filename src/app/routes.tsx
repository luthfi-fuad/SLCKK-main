import { createBrowserRouter, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AccountPage } from "./pages/AccountPage";
import { BlogListPage, BlogDetailPage } from "./pages/BlogPage";
import { SupportPage } from "./pages/SupportPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { SuccessPage } from "./pages/SuccessPage";
import { CancelPage } from "./pages/CancelPage";

function RootLayout() {
  return (
    <div className="bg-primary-cream min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
      <div>
        <h1 className="text-[#C9A84C] mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "6rem", fontWeight: 300 }}>404</h1>
        <p className="text-white mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 300 }}>Page Not Found</p>
        <a href="/" className="text-[#C9A84C] hover:underline" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}>Return Home</a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "products", Component: ProductsPage },
      { path: "products/:id", Component: ProductDetailPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "account", Component: AccountPage },
      { path: "blog", Component: BlogListPage },
      { path: "blog/:slug", Component: BlogDetailPage },
      { path: "support", Component: SupportPage },
      { path: "returns", Component: ReturnsPage },
      { path: "success", Component: SuccessPage },
      { path: "cancel", Component: CancelPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
