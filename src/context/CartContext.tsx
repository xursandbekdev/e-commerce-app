import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { CartContextType, CartItem } from "../interface";

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartFromStorage = (): CartItem[] => {
    if (typeof window === "undefined") return [];

    try {
        const saved = localStorage.getItem("shopping-cart");
        if (!saved) return [];

        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Cart localStorage xatosi:", error);
        localStorage.removeItem("shopping-cart");
        return [];
    }
};

const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem("shopping-cart", JSON.stringify(items));
        console.log("Cart saqlandi:", items);
    } catch (error) {
        console.error("Cart saqlashda xato:", error);
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = getCartFromStorage();
        setCartItems(savedCart);
        setIsLoaded(true);
        console.log("Cart yuklandi:", savedCart);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveCartToStorage(cartItems);
        }
    }, [cartItems, isLoaded]);

    const addToCart = (item: Omit<CartItem, "quantity">, quantity: number) => {
        console.log("Qo‘shilmoqda:", item, quantity);

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                console.log("Mavjud mahsulot topildi");
                return prevItems;
            } else {
                const newItems = [...prevItems, { ...item, quantity }];
                console.log("Yangi mahsulot qo‘shildi:", newItems);
                return newItems;
            }
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("shopping-cart");
    };

    const getCartTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const getCartItemsCount = () =>
        cartItems.reduce((count, item) => count + item.quantity, 0);

    const isItemInCart = (itemId: number): boolean =>
        cartItems.some((item) => item.id === itemId);

    useEffect(() => {
        if (typeof window !== "undefined") {
            (window as any).debugCart = {
                cartItems,
                localStorage: localStorage.getItem("shopping-cart"),
                addTestItem: () =>
                    addToCart({ id: 999, name: "Test Item", price: 100, image: "" }, 1),
                isItemInCart,
            };
        }
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartItemsCount,
                isItemInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart hook CartProvider ichida ishlatilishi kerak");
    }
    return context;
};
