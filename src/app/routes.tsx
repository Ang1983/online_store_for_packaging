import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import AboutPage from "./components/AboutPage";
import NotFoundPage from "./components/NotFoundPage";
import ConstructorPage from "./components/ConstructorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "products", Component: ProductsPage },
      { path: "products/:id", Component: ProductDetailPage },
      { path: "constructor", Component: ConstructorPage },
      { path: "cart", Component: CartPage },
      { path: "about", Component: AboutPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
