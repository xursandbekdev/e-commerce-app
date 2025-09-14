import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/error";
import Loader from "./components/loader";
import { AuthProvider, useAuth } from "./context/authContext";
import Layout from "./layout";
import { CartProvider } from "./context/CartContext";
import { updateSW } from "./registerServiceWorker";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const OrdersList = lazy(() => import("./pages/OrdersList"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/home"));
const Basket = lazy(() => import("./pages/basket"));
const Products = lazy(() => import("./pages/productsAdmin"));

function AppContent() {
  const { loading } = useAuth();

  if (loading) return <Loader />;

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
                path="/dashboard"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <Dashboard />
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
                path="/profile"
                element={
                  <ProtectedRoute roles={["USER"]}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/productsAdmin"
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
  useEffect(() => {
    updateSW();
  }, []);

  return (
    <CartProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </CartProvider>
  );
}
