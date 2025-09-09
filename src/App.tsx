import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy imports
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ProductsList = lazy(() => import("./pages/ProductList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductNew = lazy(() => import("./pages/ProductNew"));
const OrdersList = lazy(() => import("./pages/OrdersList"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const OrderNew = lazy(() => import("./pages/OrderNew"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Shop pages - PUBLIC */}
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* Checkout (faqat login bo‘lsa) */}
            <Route
              path="/orders/new"
              element={
                <ProtectedRoute roles={["user"]}>
                  <OrderNew />
                </ProtectedRoute>
              }
            />

            {/* Protected - faqat login userlar */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/new"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <ProductNew />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <OrdersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
