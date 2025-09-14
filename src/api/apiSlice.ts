// src/api/apiSlice.ts (Updated with CRUD endpoints)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ILoginForm,
  LoginResponse,
  ProductsResponse,
  RegisterRequest,
  RegisterResponse,
  // Product,
  OrdersResponse,
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "../interface";
// import { useAuth } from "../context/AuthContext"; // For token, but since it's not hook, use prepareHeaders

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders: (headers) => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const { token } = JSON.parse(auth);
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      headers.set("Accept-Language", "uz");
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, ILoginForm>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    getProducts: builder.query<
      ProductsResponse,
      { page?: number; size?: number; name?: string; category?: string }
    >({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params: { ...params, page: params.page ?? 0, size: params.size ?? 10 },
      }),
      providesTags: (result) =>
        result?.data?.content
          ? [
              ...result.data.content.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    getProductById: builder.query<ProductResponse, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation<ProductResponse, CreateProductRequest>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<ProductResponse, { id: number; body: UpdateProductRequest }>({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }, { type: "Products", id: "LIST" }],
    }),

    deleteProduct: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }, { type: "Products", id: "LIST" }],
    }),

    getOrdersByCustomer: builder.query<OrdersResponse, string>({
      query: (email) => ({
        url: `/orders/customer/${encodeURIComponent(email)}`,
        method: "GET",
      }),
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
  useGetOrdersByCustomerQuery,
} = api;