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

export interface Product {
    id: number
    name: string
    price: number
    stock: number
    category: string
    isActive: boolean
    createdAt: string
}

export interface ProductsResponse {
    success: boolean
    message: string
    data: {
        content: Product[]
        totalElements: number
        totalPages: number
        number: number
        size: number
        first: boolean
        last: boolean
    }
}

export interface NavbarProps {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface HomeCardProps {
    searchValue: string;
}

export interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
}

export interface PaginationGlobalProps {
    page: number;
    pageCount: number;
    onChange: (value: number) => void;
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
    addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
    isItemInCart: (itemId: number) => boolean;
}

export interface Order {
    id: string;
    orderNumber: string;
    createdAt: string;
    total: number;
    status: string;
}

export interface OrdersResponse {
    success: boolean;
    data: Order[];
}


// src/interface.ts (Update or add these interfaces)

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
    //@ts-ignore
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

export interface UpdateProductRequest extends CreateProductRequest { }