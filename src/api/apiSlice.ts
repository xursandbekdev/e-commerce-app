import { createApi, fetchBaseQuery, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type {
  ILoginForm,
  LoginResponse,
  ProductsResponse,
  RegisterRequest,
  RegisterResponse,
  OrdersResponse,
  OrderResponse,
  CreateOrderRequest,
  UpdateStatusRequest,
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from '../interface';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL as string,
  prepareHeaders: (headers) => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const { token } = JSON.parse(auth);
        if (token) headers.set('Authorization', `Bearer ${token}`);
      } catch (e) {
        console.warn('Invalid auth object in localStorage', e);
      }
    }
    headers.set('Accept-Language', 'uz');
    return headers;
  },
});


const baseQueryWithAuth: typeof rawBaseQuery = async (args: string | FetchArgs, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status) {
    const status = (result.error as FetchBaseQueryError).status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Products', 'Orders'],
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, ILoginForm>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    getProducts: builder.query<
      ProductsResponse,
      { page?: number; size?: number; name?: string; category?: string }
    >({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params: {
          page: params.page ?? 0,
          size: params.size ?? 10,
          name: params.name,
          category: params.category,
        },
      }),
      providesTags: (result) =>
        result?.data?.content
          ? [
              ...result.data.content.map((item) => ({ type: 'Products' as const, id: item.id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProductById: builder.query<ProductResponse, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_, __, id) => [{ type: 'Products', id }],
    }),

    createProduct: builder.mutation<ProductResponse, CreateProductRequest>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<ProductResponse, { id: number; body: UpdateProductRequest }>({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),

    deleteProduct: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),

    // Orders
    getOrders: builder.query<
      OrdersResponse,
      { page?: number; size?: number; customerName?: string; customerEmail?: string; status?: string }
    >({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params: {
          page: params.page ?? 0,
          size: params.size ?? 10,
          customerName: params.customerName,
          customerEmail: params.customerEmail,
          status: params.status,
        },
      }),
      providesTags: (result) =>
        result?.data?.content
          ? [
              ...result.data.content.map((item) => ({ type: 'Orders' as const, id: item.id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),

    getOrderById: builder.query<OrderResponse, number>({
      query: (id) => `/orders/${id}`,
      providesTags: (_, __, id) => [{ type: 'Orders', id }],
    }),

    getOrdersByCustomer: builder.query<OrdersResponse, string>({
      query: (email) => `/orders/customer/${encodeURIComponent(email)}`,
      providesTags: (result) =>
        result?.data?.content
          ? [
              ...result.data.content.map((item) => ({ type: 'Orders' as const, id: item.id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),

    createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),

    updateOrderStatus: builder.mutation<OrderResponse, { id: number; body: UpdateStatusRequest }>({
      query: ({ id, body }) => ({
        url: `/orders/${id}/status`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Orders', id },
        { type: 'Orders', id: 'LIST' },
      ],
    }),

    deleteOrder: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Orders', id },
        { type: 'Orders', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersByCustomerQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = api;
