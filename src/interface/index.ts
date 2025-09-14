// =================== AUTH ===================

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        type: string;
        username: string;
        email: string;
        role: "USER";
    };
}

export interface IFormInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        type: string;
        username: string;
        email: string;
        role: "USER" | "ADMIN";
    };
}

export interface ILoginForm {
    username: string;
    password: string;
}

export type Role = "ADMIN" | "USER" | null;

export interface UserData {
    token: string | null;
    type: string | null;
    username: string | null;
    email: string | null;
    role: Role;
}

export interface AuthContextType {
    user: UserData;
    login: (data: UserData) => void;
    logout: () => void;
    loading: boolean;
}

// =================== THEME ===================

export interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
}

// =================== NAVBAR ===================

export interface NavbarProps {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

// =================== PRODUCTS ===================

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
    createdAt: string;
}

export interface ProductsResponse {
    success: boolean;
    message: string;
    data: {
        content: Product[];
        pageable: {
            pageNumber: number;
            pageSize: number;
            sort: {
                empty: boolean;
                unsorted: boolean;
                sorted: boolean;
            };
            offset: number;
            unpaged: boolean;
            paged: boolean;
        };
        totalElements: number;
        totalPages: number;
        last: boolean;
        size: number;
        number: number;
        sort: {
            empty: boolean;
            unsorted: boolean;
            sorted: boolean;
        };
        numberOfElements: number;
        first: boolean;
        empty: boolean;
    };
}

export interface ProductResponse {
    success: boolean;
    message: string;
    data: Product;
}

export interface CreateProductRequest {
    name: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
}

export interface UpdateProductRequest extends CreateProductRequest { }

export interface ProductDialogProps {
    open: boolean;
    onClose: () => void;
    isEdit: boolean;
    formData: CreateProductRequest;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSwitchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCategoryChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
    selectedProduct: Product | null;
}

// =================== CART ===================

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category?: string;
    stock?: number;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
    isItemInCart: (itemId: number) => boolean;
}

// =================== ORDERS ===================

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Order {
    id: number;
    customerName: string;
    customerEmail: string;
    orderDate: string;
    status: "PENDING" | "CANCELLED" | string;
    totalAmount: number;
    orderItems: OrderItem[];
}

export interface OrdersResponse {
    success: boolean;
    message: string;
    data: {
        content: Order[] | null;
        pageable: {
            pageNumber: number;
            pageSize: number;
            sort: {
                empty: boolean;
                unsorted: boolean;
                sorted: boolean;
            };
            offset: number;
            unpaged: boolean;
            paged: boolean;
        };
        totalElements: number;
        totalPages: number;
        last: boolean;
        size: number;
        number: number;
        sort: {
            empty: boolean;
            unsorted: boolean;
            sorted: boolean;
        };
        numberOfElements: number;
        first: boolean;
        empty: boolean;
    };
}

export interface OrderResponse {
    success: boolean;
    message: string;
    data: Order;
}

export interface CreateOrderRequest {
    customerName: string;
    customerEmail: string;
    orderItems: {
        productId: number;
        quantity: number;
    }[];
}

export interface UpdateStatusRequest {
    status: "PENDING" | "CANCELLED" | string;
}

// =================== OTHER ===================

export interface HomeCardProps {
    searchValue: string;
}

export interface PaginationGlobalProps {
    page: number;
    pageCount: number;
    onChange: (value: number) => void;
}
