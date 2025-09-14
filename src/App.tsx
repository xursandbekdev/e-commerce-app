import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/error";
import Loader from "./components/loader";
import { AuthProvider, useAuth } from "./context/authContext";
import Layout from "./layout";
import { CartProvider } from "./context/CartContext";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductNew = lazy(() => import("./pages/ProductNew"));
const OrdersList = lazy(() => import("./pages/OrdersList"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const OrderNew = lazy(() => import("./pages/OrderNew"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/home"));
const Basket = lazy(() => import("./pages/basket"));
const Products = lazy(() => import("./pages/productsAdmin"));

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/basket" element={<Basket />} />

              <Route
                path="/orders/new"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <OrderNew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/new"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <ProductNew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <OrdersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <Products />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </CartProvider>
  );
}
