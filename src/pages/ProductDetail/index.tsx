import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Add, Remove, ArrowBack, ShoppingCart } from '@mui/icons-material';
import { useGetProductByIdQuery } from '../../api/apiSlice';
import { useCart } from '../../context/CartContext';
import Image from '../../assets/register.jpg';
import { useTranslation } from 'react-i18next'; // i18next hook

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid var(--color-line)' },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--color-placeholder)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--color-primary)',
  },
};

const ProductDetail: React.FC = () => {
  const { t } = useTranslation(); // Tarjima uchun hook
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const { data, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = data?.data;

  const isProductInCart = useMemo(() => {
    return cartItems.some((item) => item.id === Number(id));
  }, [cartItems, id]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return product.price * quantity;
  }, [product, quantity]);

  const handleAddToCart = () => {
    if (!product) {
      console.error(t('productNotFound')); // Tarjima
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
      <Box className="p-8 max-w-4xl mx-auto bg-bg">
        <Skeleton data-testid="skeleton" variant="rectangular" height={350} className="bg-offwhite dark:bg-off-white" />
        <Skeleton data-testid="skeleton" variant="text" width="60%" height={40} className="bg-offwhite dark:bg-off-white" />
        <Skeleton data-testid="skeleton" variant="text" width="30%" height={30} className="bg-offwhite dark:bg-off-white" />
        <Skeleton data-testid="skeleton" variant="rectangular" height={50} className="bg-offwhite dark:bg-off-white" />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box className="p-8 text-center bg-bg">
        <Typography className="text-error dark:text-error" variant="h6" gutterBottom>
          {t('productNotFoundOrServerError')} {/* Tarjima */}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack className="text-body dark:text-text-body" />}
          onClick={() => navigate(-1)}
          className="text-body dark:text-text-body border-line dark:border-line hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary"
        >
          {t('goBack')} {/* Tarjima */}
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box className="max-w-5xl mx-auto p-6 bg-bg">
        <Card className="flex flex-col lg:flex-row shadow-md border border-line dark:border-line bg-offwhite dark:bg-off-white overflow-hidden">
          <Box className="lg:w-1/2 bg-input dark:bg-input-bg flex items-center justify-center p-6">
            <CardMedia
              component="img"
              image={Image}
              alt={product.name}
              className="object-contain max-h-[400px] w-full"
            />
          </Box>

          <CardContent className="lg:w-1/2 p-6 flex flex-col gap-4 bg-bg dark:bg-gray-800">
            <Typography variant="h5" className="font-semibold text-title dark:text-title-active">
              {product.name}
            </Typography>
            <Typography className="text-placeholder dark:text-placeholder">
              {t('category')}: {t(product.category.toLowerCase())} {/* Tarjima */}
            </Typography>

            <Divider className="bg-line dark:bg-line" />

            <Typography className="text-error dark:text-error font-bold text-xl" component="div">
              {new Intl.NumberFormat('uz-UZ').format(product.price)} {t('currency')} / {t('pricePerUnit', { price: '' })} {/* Tarjima */}
            </Typography>

            <Typography className="text-body dark:text-text-body">
              {t('stockUnits', { stock: product.stock })} {/* Tarjima */}
            </Typography>
            <Typography
              className={product.isActive ? 'text-success dark:text-success' : 'text-error dark:text-error'}
            >
              {t('status')}: {product.isActive ? t('statusActive') : t('statusInactive')} {/* Tarjima */}
            </Typography>

            {isProductInCart && (
              <Alert severity="info" className="mt-2">
                {t('productInCart')} {/* Tarjima */}
              </Alert>
            )}

            <Box className="flex items-center gap-4 mt-4">
              <Typography variant="subtitle1" className="font-medium text-body dark:text-body">
                {t('quantity')}: {/* Tarjima */}
              </Typography>
              <IconButton
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                size="small"
                disabled={isProductInCart}
                className="text-body dark:text-primary hover:text-primary"
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
                  style: { textAlign: 'center', width: 60, color: 'var(--color-text-body)' },
                }}
                InputLabelProps={{
                  style: { color: 'var(--color-placeholder)' },
                }}
                size="small"
                disabled={isProductInCart}
                className="bg-input dark:bg-input-bg text-body dark:text-text-body"
                sx={inputStyles}
              />
              <IconButton
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                size="small"
                disabled={isProductInCart}
                className="text-body dark:text-primary hover:text-primary"
              >
                <Add />
              </IconButton>
            </Box>

            <Typography variant="h6" className="font-bold text-title dark:text-title-active mt-2">
              {t('totalPrice')}: {/* Tarjima */}
              <span className="text-error dark:text-error">
                {new Intl.NumberFormat('uz-UZ').format(totalPrice)} {t('currency')} {/* Tarjima */}
              </span>
            </Typography>

            <Box className="flex gap-4 mt-6">
              <Button
                variant="contained"
                color={isProductInCart ? 'success' : 'primary'}
                className="px-6 bg-primary text-text dark:text-text hover:bg-secondary dark:hover:bg-secondary"
                startIcon={<ShoppingCart className="text-text dark:text-text" />}
                onClick={handleAddToCart}
                disabled={!product.isActive || product.stock === 0}
              >
                <p className="text-text">
                  {isProductInCart ? t('alreadyInCart') : t('addToCart')} {/* Tarjima */}
                </p>
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBack className="text-body dark:text-text-body" />}
                onClick={() => navigate(-1)}
                className="text-body dark:text-text-body border-line dark:border-line hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary"
              >
                {t('goBack')} {/* Tarjima */}
              </Button>
            </Box>

            {product.stock < 10 && product.stock > 0 && (
              <Alert severity="warning" className="mt-2">
                {t('lowStockWarning', { stock: product.stock })} {/* Tarjima */}
              </Alert>
            )}

            {product.stock === 0 && (
              <Alert severity="error" className="mt-2">
                {t('outOfStock')} {/* Tarjima */}
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
          severity={isProductInCart ? 'info' : 'success'}
          variant="filled"
          sx={{
            backgroundColor: isProductInCart ? 'var(--color-primary)' : 'var(--color-success)',
            color: 'var(--color-text)',
          }}
        >
          {isProductInCart ? t('productInCart') : t('productAddedToCart')} {/* Tarjima */}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;
