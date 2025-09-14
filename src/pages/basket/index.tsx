import { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // i18next hook
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/authContext';
import PaymentModal from '../../components/paymentModal';
import { useGetOrdersByCustomerQuery } from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import type { Order } from '../../interface';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image?: string;
  category?: string;
}

interface User {
  email: string;
}

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

const Basket: React.FC = () => {
  const { t, i18n } = useTranslation(); // Tarjima uchun hook
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart() as {
    cartItems: CartItem[];
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
  };
  const { user } = useAuth() as { user: User | null };
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState<string>('');
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [contractNumber] = useState<string>(`ORD-${Date.now()}`);

  const {
    data: ordersData,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetOrdersByCustomerQuery(user?.email || '', {
    skip: !user?.email,
  });

  const orders = ordersData?.data?.content || [];

  const handleQuantityChange = (id: number, newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  const calculateSubtotal = (item: CartItem): number => {
    return (item.price || 0) * (item.quantity || 0);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      console.log('Applying coupon:', couponCode);
    }
  };

  const handleUpdateCart = () => {
    console.log('Cart updated');
  };

  const handleProceedToCheckout = () => {
    if (!user?.email) {
      navigate('/login', { state: { from: '/basket' } });
    } else {
      setOpenPaymentModal(true);
    }
  };

  const handleReturnToShop = () => {
    navigate('/');
  };

  const handleCloseModal = () => {
    setOpenPaymentModal(false);
  };

  if (loadingOrders && user?.email) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg flex items-center justify-center">
        <CircularProgress sx={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

  if (cartItems.length === 0 && orders.length === 0 && !loadingOrders) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg">
        <div className="px-4 sm:px-6 py-4 border-b border-line dark:border-line">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs aria-label="breadcrumb" className="text-sm text-body dark:text-text-body">
              <Link
                underline="hover"
                className="text-body dark:text-text-body hover:text-primary dark:hover:text-primary cursor-pointer"
                onClick={() => navigate('/')}
              >
                {t('home')} 
              </Link>
              <Typography className="text-title dark:text-title-active">{t('cart')}</Typography>
            </Breadcrumbs>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <ShoppingCart sx={{ fontSize: 64, color: 'var(--color-placeholder)' }} />
          <Typography variant="h5" className="mb-4 text-title dark:text-title-active">
            {t('emptyCart')} 
          </Typography>
          <Typography className="mb-6 text-placeholder dark:text-placeholder">
            {t('addProductsToCart')} 
          </Typography>
          <Button
            variant="contained"
            onClick={handleReturnToShop}
            className="bg-primary dark:bg-primary text-text dark:text-text hover:bg-secondary dark:hover:bg-secondary text-xs sm:text-sm"
            aria-label="Start shopping"
          >
            {t('startShopping')} 
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-bg">
      <div className="px-4 sm:px-6 py-4 border-b border-line dark:border-line">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs aria-label="breadcrumb" className="text-sm text-body dark:text-text-body">
            <Link
              underline="hover"
              className="text-body dark:text-text-body hover:text-primary dark:hover:text-primary cursor-pointer"
              onClick={() => navigate('/')}
            >
              {t('home')} 
            </Link>
            <Typography className="text-title dark:text-title-active">
              {t('cart')} ({cartItems.length})
            </Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {cartItems.length > 0 && (
          <>
            <Typography variant="h6" className="font-semibold mb-4 text-sm sm:text-base text-title dark:text-title-active">
              {t('cart')} 
            </Typography>
            <TableContainer component={Paper} className="mb-8 shadow-sm bg-offwhite dark:bg-off-white border border-line dark:border-line">
              <Table>
                <TableHead>
                  <TableRow className="bg-input dark:bg-input-bg">
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active">
                      {t('name')} 
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active hidden sm:table-cell">
                      {t('price')} 
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active">
                      {t('quantity')} 
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active hidden md:table-cell">
                      {t('total')} 
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active">
                      {t('actions')} 
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-input dark:bg-gray-700">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.name || 'Product'}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border border-line dark:border-line"
                          />
                          <div>
                            <Typography variant="body2" className="font-medium text-xs sm:text-sm text-title dark:text-title-active">
                              {item.name || t('productNotFound')} 
                            </Typography>
                            {item.category && (
                              <Typography variant="caption" className="text-xs text-placeholder dark:text-placeholder">
                                {t(item.category.toLowerCase())} 
                              </Typography>
                            )}
                            <Typography variant="body2" className="font-medium text-xs sm:hidden mt-1 text-error dark:text-error">
                              {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(item.price || 0)} {t('currency')} 
                            </Typography>
                            <Typography variant="body2" className="font-medium text-xs sm:hidden mt-1 text-error dark:text-error">
                              {t('total')}: {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(calculateSubtotal(item))} {t('currency')} 
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Typography variant="body2" className="text-xs sm:text-sm text-error dark:text-error">
                          {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(item.price || 0)} {t('currency')} 
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" className="min-w-16 sm:min-w-20">
                          <Select
                            value={item.quantity.toString().padStart(2, '0')}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            className="text-center text-xs sm:text-sm bg-input dark:bg-input-bg text-body dark:text-text-body"
                            sx={inputStyles}
                          >
                            {[...Array(Math.min(10, item.stock || 10))].map((_, i) => (
                              <MenuItem
                                key={i + 1}
                                value={(i + 1).toString().padStart(2, '0')}
                                className="text-xs sm:text-sm text-body dark:text-text-body"
                              >
                                {(i + 1).toString().padStart(2, '0')}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Typography variant="body2" className="font-medium text-xs sm:text-sm text-error dark:text-error">
                          {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(calculateSubtotal(item))} {t('currency')} 
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => removeFromCart(item.id)}
                          className="text-error dark:text-error"
                          size="small"
                          aria-label={`Remove ${item.name || 'item'} from cart`}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
              <Button
                variant="outlined"
                className="border-line dark:border-line text-body dark:text-text-body hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary text-xs sm:text-sm"
                onClick={handleReturnToShop}
                aria-label="Return to shop"
              >
                {t('returnToShop')} 
              </Button>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outlined"
                  onClick={handleUpdateCart}
                  className="border-line dark:border-line text-body dark:text-text-body hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary text-xs sm:text-sm"
                  aria-label="Update cart"
                >
                  {t('updateCart')} 
                </Button>
                <Button
                  variant="outlined"
                  onClick={clearCart}
                  className="border-line dark:border-line text-error dark:text-error hover:border-error dark:hover:border-error text-xs sm:text-sm"
                  aria-label="Clear cart"
                >
                  {t('clearCart')} 
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-end w-full lg:w-auto">
                <TextField
                  placeholder={t('couponCode')} /* Tarjima */
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  variant="outlined"
                  size="small"
                  className="w-full sm:w-64 bg-input dark:bg-gray-500 text-body dark:text-text-body"
                  sx={inputStyles}
                  aria-label="Coupon code"
                />
                <Button
                  variant="contained"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                  className="bg-primary dark:bg-primary text-text dark:text-white hover:bg-secondary dark:hover:bg-secondary h-10 w-full sm:w-auto text-xs sm:text-sm"
                  aria-label="Apply coupon"
                >
                  <p className="dark:text-white">{t('applyCoupon')}</p> 
                </Button>
              </div>

              <Card className="w-full lg:w-96 shadow-sm border border-line dark:border-line bg-offwhite dark:bg-bg">
                <CardContent className="p-4 sm:p-6">
                  <Typography variant="h6" className="font-semibold mb-4 text-sm sm:text-base text-title dark:text-title-active">
                    {t('cart')} {t('total')} 
                  </Typography>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Typography variant="body2" className="text-xs sm:text-sm text-body dark:text-text-body">
                        {t('subtotal')}: 
                      </Typography>
                      <Typography variant="body2" className="font-medium text-xs sm:text-sm text-error dark:text-error">
                        {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(getCartTotal())} {t('currency')} 
                      </Typography>
                    </div>

                    <Divider className="bg-line dark:bg-line" />

                    <div className="flex justify-between">
                      <Typography variant="body2" className="text-xs sm:text-sm text-body dark:text-text-body">
                        {t('shipping')}: 
                      </Typography>
                      <Typography variant="body2" className="font-medium text-xs sm:text-sm text-success dark:text-success">
                        {t('free')} 
                      </Typography>
                    </div>

                    <Divider className="bg-line dark:bg-line" />

                    <div className="flex justify-between">
                      <Typography variant="body2" className="font-semibold text-xs sm:text-sm text-title dark:text-title-active">
                        {t('total')}: 
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-sm sm:text-lg text-error dark:text-error">
                        {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(getCartTotal())} {t('currency')} 
                      </Typography>
                    </div>
                  </div>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleProceedToCheckout}
                    className="bg-primary dark:bg-primary text-text dark:text-text hover:bg-secondary dark:hover:bg-secondary mt-6 text-xs sm:text-sm"
                    size="large"
                    aria-label={user?.email ? 'Proceed to checkout' : 'Login to checkout'}
                  >
                    {user?.email ? t('proceedToCheckout') : t('loginToCheckout')} 
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        <div className="mt-12">
          <Typography variant="h6" className="font-semibold mb-4 text-sm sm:text-base text-title dark:text-title-active">
            {t('myOrders')} 
          </Typography>
          {!user?.email ? (
            <Typography className="text-xs sm:text-sm text-placeholder dark:text-placeholder">
              {t('loginToViewOrders')} 
            </Typography>
          ) : loadingOrders ? (
            <div className="flex justify-center py-8">
              <CircularProgress sx={{ color: 'var(--color-primary)' }} />
            </div>
          ) : errorOrders ? (
            <Typography className="text-xs sm:text-sm text-error dark:text-error">
              {t('errorLoadingOrders')} 
            </Typography>
          ) : orders.length === 0 ? (
            <Typography className="text-xs sm:text-sm text-placeholder dark:text-placeholder">
              {t('noOrdersFound')} 
            </Typography>
          ) : (
            <TableContainer component={Paper} className="shadow-sm bg-offwhite dark:bg-off-white border border-line dark:border-line">
              <Table>
                <TableHead>
                  <TableRow className="bg-input dark:bg-input-bg">
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active">
                      {t('orderNumber')} 
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active">
                      {t('date')} 
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active hidden sm:table-cell">
                      {t('total')} 
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm text-title dark:text-title-active">
                      {t('status')} 
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order: Order) => (
                    <TableRow key={order.id} className="hover:bg-input dark:hover:bg-input-bg">
                      <TableCell>
                        <Typography variant="body2" className="text-xs sm:text-sm text-body dark:text-text-body">
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" className="text-xs sm:text-sm text-body dark:text-text-body">
                          {new Date(order.orderDate).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : 'en-US')} 
                        </Typography>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Typography variant="body2" className="text-xs sm:text-sm text-error dark:text-error">
                          {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(order.totalAmount || 0)} {t('currency')} 
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" className="text-xs sm:text-sm text-body dark:text-text-body">
                          {t(order.status?.toLowerCase() || 'unknown')} 
                        </Typography>
                        <Typography variant="body2" className="font-medium text-xs sm:hidden mt-1 text-error dark:text-error">
                          {t('total')}: {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(order.totalAmount || 0)} {t('currency')} 
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>

      <PaymentModal
        open={openPaymentModal}
        onClose={handleCloseModal}
        total={getCartTotal()}
        contractNumber={contractNumber}
      />
    </div>
  );
};

export default Basket;
