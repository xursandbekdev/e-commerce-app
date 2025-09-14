// ProductDetail.tsx - Enhanced with duplicate check
import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Button,
  IconButton,
  Divider,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { Add, Remove, ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useGetProductByIdQuery } from "../../api/apiSlice";
import { useCart } from "../../context/CartContext";
import Image from "../../assets/register.jpg";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const { data, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = data?.data;

  const isProductInCart = useMemo(() => {
    return cartItems.some(item => item.id === Number(id));
  }, [cartItems, id]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return product.price * quantity;
  }, [product, quantity]);

  const handleAddToCart = () => {
    if (!product) {
      console.error('Product mavjud emas');
      return;
    }

    if (isProductInCart) {
      setShowSuccess(true);
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: Image,
      category: product.category,
      stock: product.stock,
    };

    addToCart(cartItem, quantity);
    setShowSuccess(true);
  };

  if (isLoading) {
    return (
      <Box className="p-8 max-w-4xl mx-auto">
        <Skeleton data-testid="skeleton" variant="rectangular" height={350} />
        <Skeleton data-testid="skeleton" variant="text" width="60%" height={40} />
        <Skeleton data-testid="skeleton" variant="text" width="30%" height={30} />
        <Skeleton data-testid="skeleton" variant="rectangular" height={50} />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box className="p-8 text-center">
        <Typography color="error" variant="h6" gutterBottom>
          Mahsulot topilmadi yoki server xatosi
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Ortga qaytish
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box className="max-w-5xl mx-auto p-6">
        <Card className="flex flex-col lg:flex-row shadow-md border border-line overflow-hidden">
          <Box className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-6">
            <CardMedia
              component="img"
              image={Image}
              alt={product.name}
              className="object-contain max-h-[400px] w-full"
            />
          </Box>

          <CardContent className="lg:w-1/2 p-6 flex flex-col gap-4">
            <Typography variant="h5" className="font-semibold">
              {product.name}
            </Typography>
            <Typography color="text.secondary">
              Kategoriya: {product.category}
            </Typography>

            <Divider />

            <Typography className="text-error font-bold text-xl" component="div">
              {new Intl.NumberFormat("uz-UZ").format(product.price)} so'm / dona
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sklad: {product.stock} dona
            </Typography>
            <Typography
              variant="body2"
              color={product.isActive ? "success.main" : "error.main"}
            >
              Holati: {product.isActive ? "Faol" : "Faol emas"}
            </Typography>

            {isProductInCart && (
              <Alert severity="info" className="mt-2">
                Bu mahsulot allaqachon savatchada mavjud
              </Alert>
            )}

            <Box className="flex items-center gap-4 mt-4">
              <Typography variant="subtitle1" className="font-medium">
                Miqdor:
              </Typography>
              <IconButton
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                size="small"
                disabled={isProductInCart}
              >
                <Remove />
              </IconButton>
              <TextField
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val > 0 && val <= product.stock) {
                    setQuantity(val);
                  }
                }}
                type="number"
                inputProps={{
                  min: 1,
                  max: product.stock,
                  style: { textAlign: "center", width: 60 }
                }}
                size="small"
                disabled={isProductInCart}
              />
              <IconButton
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                size="small"
                disabled={isProductInCart}
              >
                <Add />
              </IconButton>
            </Box>

            <Typography variant="h6" className="font-bold mt-2">
              Umumiy narx:{" "}
              <span className="text-error">
                {new Intl.NumberFormat("uz-UZ").format(totalPrice)} so'm
              </span>
            </Typography>

            <Box className="flex gap-4 mt-6">
              <Button
                variant="contained"
                color={isProductInCart ? "success" : "primary"}
                className="px-6"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={!product.isActive || product.stock === 0}
              >
                {isProductInCart ? "Savatchada mavjud" : "Savatchaga qo'shish"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
              >
                Ortga
              </Button>
            </Box>

            {product.stock < 10 && product.stock > 0 && (
              <Alert severity="warning" className="mt-2">
                Diqqat! Faqat {product.stock} dona qoldi
              </Alert>
            )}

            {product.stock === 0 && (
              <Alert severity="error" className="mt-2">
                Mahsulot tugagan
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity={isProductInCart ? "info" : "success"}
          variant="filled"
        >
          {isProductInCart ? "Mahsulot allaqachon savatchada!" : "Mahsulot savatchaga qo'shildi!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;