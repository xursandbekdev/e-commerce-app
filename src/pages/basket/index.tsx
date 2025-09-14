import { useState } from "react";
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
} from "@mui/material";
import { Delete, ShoppingCart } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/authContext";
import PaymentModal from "../../components/paymentModal";
import { useGetOrdersByCustomerQuery } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";

const Basket = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal
    } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState("");
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [contractNumber ] = useState(`ORD-${Date.now()}`);

    //@ts-ignore
    const { data: ordersData, isLoading: loadingOrders, error: errorOrders } = useGetOrdersByCustomerQuery(user?.email || '', {
        skip: !user?.email,
    });

    const orders = ordersData?.data || [];
    //@ts-ignore
    const handleQuantityChange = (id, newQuantity) => {
        updateQuantity(id, newQuantity);
    };

    const calculateSubtotal = (item: any) => item.price * item.quantity;

    const handleApplyCoupon = () => {
        console.log("Applying coupon:", couponCode);
    };

    const handleUpdateCart = () => {
        console.log("Cart updated");
    };

    const handleProceedToCheckout = () => {
        if (!user?.email) {
            navigate('/login', { state: { from: '/basket' } });
        } else {
            setOpenPaymentModal(true);
        }
    };

    const handleReturnToShop = () => {
        window.history.back();
    };

    const handleCloseModal = () => {
        setOpenPaymentModal(false);
    };

    // Empty Cart and No Orders
    if (cartItems.length === 0 && orders.length === 0 && !loadingOrders) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <Breadcrumbs aria-label="breadcrumb" className="text-sm">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Typography color="text.primary">Cart</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
                    <ShoppingCart sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h5" className="mb-4">
                        Savatingiz bo'sh
                    </Typography>
                    <Typography color="text.secondary" className="mb-6">
                        Xarid qilish uchun mahsulotlar qo'shing
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleReturnToShop}
                        className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
                    >
                        Xaridni boshlash
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs aria-label="breadcrumb" className="text-sm">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="text.primary">Cart ({cartItems.length})</Typography>
                    </Breadcrumbs>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Cart Table */}
                <Typography variant="h6" className="font-semibold mb-4 text-sm sm:text-base">
                    Savat
                </Typography>
                {cartItems.length > 0 && (
                    <TableContainer component={Paper} className="mb-8 shadow-sm">
                        <Table>
                            <TableHead>
                                <TableRow className="bg-gray-50">
                                    <TableCell className="font-semibold text-xs sm:text-sm">Mahsulot</TableCell>
                                    <TableCell className="font-semibold text-xs sm:text-sm hidden sm:table-cell">Narxi</TableCell>
                                    <TableCell className="font-semibold text-xs sm:text-sm">Miqdor</TableCell>
                                    <TableCell className="font-semibold text-xs sm:text-sm hidden md:table-cell">Jami</TableCell>
                                    <TableCell className="font-semibold text-xs sm:text-sm">Amallar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border"
                                                />
                                                <div>
                                                    <Typography variant="body2" className="font-medium text-xs sm:text-sm">
                                                        {item.name}
                                                    </Typography>
                                                    {item.category && (
                                                        <Typography variant="caption" color="text.secondary" className="text-xs">
                                                            {item.category}
                                                        </Typography>
                                                    )}
                                                    <Typography variant="body2" className="font-medium text-xs sm:hidden mt-1">
                                                        {new Intl.NumberFormat("uz-UZ").format(item.price)} so'm
                                                    </Typography>
                                                    <Typography variant="body2" className="font-medium text-xs sm:hidden mt-1">
                                                        Jami: {new Intl.NumberFormat("uz-UZ").format(calculateSubtotal(item))} so'm
                                                    </Typography>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Typography variant="body2" className="text-xs sm:text-sm">
                                                {new Intl.NumberFormat("uz-UZ").format(item.price)} so'm
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl size="small" className="min-w-16 sm:min-w-20">
                                                <Select
                                                    value={item.quantity.toString().padStart(2, "0")}
                                                    onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                                                    className="text-center text-xs sm:text-sm"
                                                >
                                                    {[...Array(Math.min(10, item.stock || 10))].map((_, i) => (
                                                        <MenuItem key={i + 1} value={(i + 1).toString().padStart(2, "0")} className="text-xs sm:text-sm">
                                                            {(i + 1).toString().padStart(2, "0")}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Typography variant="body2" className="font-medium text-xs sm:text-sm">
                                                {new Intl.NumberFormat("uz-UZ").format(calculateSubtotal(item))} so'm
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => removeFromCart(item.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {cartItems.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
                        <Button
                            variant="outlined"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm"
                            onClick={handleReturnToShop}
                        >
                            Xaridga qaytish
                        </Button>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="outlined"
                                onClick={handleUpdateCart}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm"
                            >
                                Savatchani yangilash
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={clearCart}
                                color="error"
                                className="text-xs sm:text-sm"
                            >
                                Savatchani tozalash
                            </Button>
                        </div>
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8">
                        <div className="flex flex-col sm:flex-row gap-4 items-end w-full lg:w-auto">
                            <TextField
                                placeholder="Chegirma kodi"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                variant="outlined"
                                size="small"
                                className="w-full sm:w-64"
                            />
                            <Button
                                variant="contained"
                                onClick={handleApplyCoupon}
                                className="bg-red-600 hover:bg-red-700 text-white h-10 w-full sm:w-auto text-xs sm:text-sm"
                            >
                                Kodni qo'llash
                            </Button>
                        </div>

                        <Card className="w-full lg:w-96 shadow-sm border border-gray-200">
                            <CardContent className="p-4 sm:p-6">
                                <Typography variant="h6" className="font-semibold mb-4 text-sm sm:text-base">
                                    Savat jami
                                </Typography>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Typography variant="body2" className="text-xs sm:text-sm">Oraliq jami:</Typography>
                                        <Typography variant="body2" className="font-medium text-xs sm:text-sm">
                                            {new Intl.NumberFormat("uz-UZ").format(getCartTotal())} so'm
                                        </Typography>
                                    </div>

                                    <Divider />

                                    <div className="flex justify-between">
                                        <Typography variant="body2" className="text-xs sm:text-sm">Yetkazish:</Typography>
                                        <Typography variant="body2" className="font-medium text-xs sm:text-sm">
                                            Bepul
                                        </Typography>
                                    </div>

                                    <Divider />

                                    <div className="flex justify-between">
                                        <Typography variant="body2" className="font-semibold text-xs sm:text-sm">
                                            Jami:
                                        </Typography>
                                        <Typography variant="body2" className="font-semibold text-sm sm:text-lg">
                                            {new Intl.NumberFormat("uz-UZ").format(getCartTotal())} so'm
                                        </Typography>
                                    </div>
                                </div>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleProceedToCheckout}
                                    className="bg-red-600 hover:bg-red-700 text-white mt-6 text-xs sm:text-sm"
                                    size="large"
                                >
                                    {user?.email ? "To'lovga o'tish" : "Tizimga kirish"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}


                <div className="mt-12">
                    <Typography variant="h6" className="font-semibold mb-4 text-sm sm:text-base">
                        Mening buyurtmalarim
                    </Typography>
                    {!user?.email ? (
                        <Typography className="text-xs sm:text-sm">
                            Buyurtmalarni ko'rish uchun tizimga kiring
                        </Typography>
                    ) : loadingOrders ? (
                        <div className="flex justify-center py-8">
                            <CircularProgress />
                        </div>
                    ) : errorOrders ? (
                        <Typography color="error" className="text-xs sm:text-sm">

                            Xatolik: {
                                //@ts-ignore
                                errorOrders.message || 'Buyurtmalarni yuklashda xato yuz berdi'}
                        </Typography>
                    ) : orders.length === 0 ? (
                        <Typography className="text-xs sm:text-sm">
                            Hech qanday buyurtma topilmadi
                        </Typography>
                    ) : (
                        <TableContainer component={Paper} className="shadow-sm">
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-gray-50">
                                        <TableCell className="font-semibold text-xs sm:text-sm">Buyurtma raqami</TableCell>
                                        <TableCell className="font-semibold text-xs sm:text-sm">Sana</TableCell>
                                        <TableCell className="font-semibold text-xs sm:text-sm hidden sm:table-cell">Jami</TableCell>
                                        <TableCell className="font-semibold text-xs sm:text-sm">Holat</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id} className="hover:bg-gray-50">
                                            <TableCell>
                                                <Typography variant="body2" className="text-xs sm:text-sm">
                                                    {order.orderNumber || order.id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" className="text-xs sm:text-sm">
                                                    {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Typography variant="body2" className="text-xs sm:text-sm">
                                                    {new Intl.NumberFormat("uz-UZ").format(order.total)} so'm
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" className="text-xs sm:text-sm">
                                                    {order.status || 'Noma\'lum'}
                                                </Typography>
                                                <Typography variant="body2" className="font-medium text-xs sm:hidden mt-1">
                                                    Jami: {new Intl.NumberFormat("uz-UZ").format(order.total)} so'm
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