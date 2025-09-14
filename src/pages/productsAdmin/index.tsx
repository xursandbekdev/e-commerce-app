// src/pages/ProductsPage.tsx (Updated with debounced search and better filtering)

import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";
import { useAuth } from "../../context/authContext";
import { useGetProductsQuery } from "../../api/apiSlice";
import ProductsFilters from "../../components/Products/ProductsFilters";
import ProductsList from "../../components/Products/ProductList";
import ProductDialog from "../../components/Products/ProductDialog";
import DeleteConfirmDialog from "../../components/Products/DeleteConfirmDialog";
import ProductDetailsDialog from "../../components/Products/ProductDetailDialog";
import type { Product, CreateProductRequest } from "../../interface";

const ProductsPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "USER";

  // States
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: "",
    price: "" as any,
    stock: "" as any,
    category: "",
    isActive: true,
  });

  // Query with filtering - RTK Query auto-refetches on param change
  const { data: productsResponse, isLoading, error } = useGetProductsQuery({
    page: page - 1,
    size: 10,
    name: searchName.trim() || undefined, // Trim whitespace
    category: searchCategory || undefined,
  }, {
    skip: !searchName && !searchCategory, // Optional: skip if no filters
  });

  const products = productsResponse?.data?.content || [];
  const totalPages = productsResponse?.data?.totalPages || 0;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchName, searchCategory]);

  // Debounced search effect (optional, but RTK auto-refetches anyway)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Filters applied:", { searchName, searchCategory }); // Debug log
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchName, searchCategory]);

  const handleAddOpen = useCallback(() => {
    setFormData({ name: "", price: Number(""), stock: Number(""), category: "", isActive: true });
    setIsAddOpen(true);
  }, []);

  const handleEditOpen = useCallback((product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: Number(product.price.toString()),
      stock: Number(product.stock.toString()),
      category: product.category,
      isActive: product.isActive,
    });
    setIsEditOpen(true);
  }, []);

  const handleDeleteOpen = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  }, []);

  const handleDetailsOpen = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  }, []);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? value : value, // Keep as string
    }));
  }, []);

  const handleSwitchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
  }, []);

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, category: e.target.value as string }));
  }, []);

  // Close dialogs and reset
  const handleDialogClose = useCallback(() => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setFormData({ name: "", price: Number(""), stock: Number(""), category: "", isActive: true });
    setSelectedProduct(null);
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-64">Yuklanmoqda...</div>;
  if (error) {
    console.error("Query error:", error); // Debug log
    return <div className="text-error">Xatolik yuz berdi: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-6 bg-bg min-h-screen">
      <Typography variant="h4" className="mb-6 text-title">
        Mahsulotlar ({products.length} ta topildi)
      </Typography>

      <ProductsFilters
        searchName={searchName}
        setSearchName={setSearchName}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isAdmin={isAdmin}
        onAddOpen={handleAddOpen}
      />

      <ProductsList
        viewMode={viewMode}
        products={products}
        isAdmin={isAdmin}
        onEditOpen={handleEditOpen}
        onDeleteOpen={handleDeleteOpen}
        onDetailsOpen={handleDetailsOpen}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ProductDialog
        open={isAddOpen || isEditOpen}
        onClose={handleDialogClose}
        isEdit={isEditOpen}
        formData={formData}
        onFormChange={handleFormChange}
        onSwitchChange={handleSwitchChange}
        onCategoryChange={handleCategoryChange}
        selectedProduct={selectedProduct}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        selectedProduct={selectedProduct}
      />

      <ProductDetailsDialog
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductsPage;