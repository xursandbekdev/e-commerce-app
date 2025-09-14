import React, { useState, useEffect, useCallback } from 'react';
import { Typography } from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useAuth } from '../../context/authContext';
import { useGetProductsQuery } from '../../api/apiSlice';
import ProductsFilters from '../../components/Products/ProductsFilters';
import ProductsList from '../../components/Products/ProductList';
import ProductDialog from '../../components/Products/ProductDialog';
import DeleteConfirmDialog from '../../components/Products/DeleteConfirmDialog';
import ProductDetailsDialog from '../../components/Products/ProductDetailDialog';
import type { Product, CreateProductRequest } from '../../interface';
import { useTranslation } from 'react-i18next';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation(); 
  const { user } = useAuth();
  const isAdmin = user?.role === 'USER'; 

  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    price: '' as any,
    stock: '' as any,
    category: '',
    isActive: true,
  });

  const { data: productsResponse, isLoading, error } = useGetProductsQuery({
    page: page - 1,
    size: 10,
    name: searchName.trim() || undefined,
    category: searchCategory || undefined,
  });

  const products = productsResponse?.data?.content || [];
  const totalPages = productsResponse?.data?.totalPages || 0;
  const totalElements = productsResponse?.data?.totalElements || 0;

  useEffect(() => {
    setPage(1);
  }, [searchName, searchCategory]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Filters applied:', { searchName, searchCategory, page });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchName, searchCategory, page]);

  const handleAddOpen = useCallback(() => {
    setFormData({
      name: '',
      price: '' as any,
      stock: '' as any,
      category: '',
      isActive: true,
    });
    setIsAddOpen(true);
  }, []);

  const handleEditOpen = useCallback((product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
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
      [name]: value,
    }));
  }, []);

  const handleSwitchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
  }, []);

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, category: e.target.value as string }));
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setFormData({
      name: '',
      price: '' as any,
      stock: '' as any,
      category: '',
      isActive: true,
    });
    setSelectedProduct(null);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-bg min-h-screen">
        <div className="flex justify-center items-center h-64">
          <Typography variant="h6" className="text-body">
            {t('productsLoading')} {/* Tarjima */}
          </Typography>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Query error:', error);
    return (
      <div className="p-6 bg-bg min-h-screen">
        <div className="text-center">
          <Typography variant="h6" className="text-error mb-4">
            {t('errorOccurred')} {/* Tarjima */}
          </Typography>
          <Typography variant="body2" className="text-body">
            {t('productNotFoundOrServerError')} {/* Tarjima */}
          </Typography>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            {t('refreshPage')} {/* Tarjima */}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-bg min-h-screen">
      <div className="mb-6">
        <Typography variant="h4" className="text-title mb-2">
          {t('productsManagement')} {/* Tarjima */}
        </Typography>
        <Typography variant="body2" className="text-body">
          {t('totalProducts', { count: totalElements, displayed: products.length })} {/* Tarjima */}
        </Typography>
      </div>

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
