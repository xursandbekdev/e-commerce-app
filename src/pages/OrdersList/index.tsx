import React, { useState, useCallback, useMemo } from 'react';
import { Typography, type SelectChangeEvent } from '@mui/material';
import { useAuth } from '../../context/authContext';
import {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from '../../api/apiSlice';
import OrdersList from '../../components/Orders/OrdersList';
import OrderDialog from '../../components/Orders/OrderDialog';
import StatusUpdateDialog from '../../components/Orders/StatusUpdateDialog';
import OrderDetailsDialog from '../../components/Orders/OrderDetailsDialog';
import DeleteConfirmDialog from '../../components/Orders/DeleteConfirmDialogOrder';
import PaginationGlobal from '../../components/paginition';
import { toast } from 'react-toastify';
import type { Order, CreateOrderRequest, UpdateStatusRequest, OrdersResponse } from '../../interface';
import { useTranslation } from 'react-i18next'; // i18next hook

interface User {
  role: string;
}

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth() as { user: User | null };
  const isAdmin = user?.role === 'USER';

  const [page, setPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateOrderRequest>({
    customerName: '',
    customerEmail: '',
    orderItems: [{ productId: 0, quantity: 1 }],
  });
  const [statusForm, setStatusForm] = useState<UpdateStatusRequest>({ status: 'PENDING' });

  const queryParams = useMemo(
    () => ({
      page: page - 1,
      size: 10,
    }),
    [page]
  );

  const { data: ordersResponse, isLoading, error, refetch } = useGetOrdersQuery(queryParams) as {
    data: OrdersResponse | undefined;
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  };

  const orders = useMemo(() => {
    if (!ordersResponse?.success || !ordersResponse.data?.content) return [];
    return ordersResponse.data.content;
  }, [ordersResponse]);

  const totalPages = useMemo(() => {
    if (!ordersResponse?.success || !ordersResponse.data) return 0;
    return ordersResponse.data.totalPages;
  }, [ordersResponse]);

  const totalElements = useMemo(() => {
    if (!ordersResponse?.success || !ordersResponse.data) return 0;
    return ordersResponse.data.totalElements;
  }, [ordersResponse]);

  const [createOrder] = useCreateOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleCreateOpen = useCallback(() => {
    setFormData({ customerName: '', customerEmail: '', orderItems: [{ productId: 0, quantity: 1 }] });
    setIsCreateOpen(true);
  }, []);

  const handleStatusOpen = useCallback((order: Order) => {
    if (order.status !== 'PENDING') {
      toast.warning(t('onlyPendingOrdersUpdatable')); // Tarjima
      return;
    }
    setSelectedOrder(order);
    setStatusForm({ status: order.status });
    setIsStatusOpen(true);
  }, [t]);

  const handleDetailsOpen = useCallback((order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  }, []);

  const handleDeleteOpen = useCallback((order: Order) => {
    if (order.status !== 'PENDING') {
      toast.warning(t('onlyPendingOrdersDeletable')); // Tarjima
      return;
    }
    setSelectedOrder(order);
    setIsDeleteOpen(true);
  }, [t]);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleOrderItemChange = useCallback((index: number, field: 'productId' | 'quantity', value: number) => {
    setFormData((prev) => ({
      ...prev,
      orderItems: prev.orderItems.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  }, []);

  const addOrderItem = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      orderItems: [...prev.orderItems, { productId: 0, quantity: 1 }],
    }));
  }, []);

  const removeOrderItem = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      orderItems: prev.orderItems.filter((_, i) => i !== index),
    }));
  }, []);

  const handleStatusChange = useCallback((e: SelectChangeEvent<string>) => {
    setStatusForm({ status: e.target.value });
  }, []);

  const handleToggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'list' ? 'grid' : 'list'));
  }, []);

  const handleCreate = async () => {
    if (!formData.customerName || !formData.customerEmail || !formData.orderItems.length) {
      toast.error(t('fillAllFields')); // Tarjima
      return;
    }
    if (formData.orderItems.some((item) => item.productId === 0 || item.quantity <= 0)) {
      toast.error(t('invalidOrderItems')); // Tarjima
      return;
    }
    try {
      await createOrder(formData).unwrap();
      toast.success(t('orderCreated')); // Tarjima
      setIsCreateOpen(false);
      refetch();
    } catch {
      toast.error(t('errorOccurred')); // Tarjima
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    try {
      await updateOrderStatus({ id: Number(selectedOrder.id), body: statusForm }).unwrap();
      toast.success(t('orderStatusUpdated')); // Tarjima
      setIsStatusOpen(false);
      refetch();
    } catch {
      toast.error(t('errorOccurred')); // Tarjima
    }
  };

  const handleDelete = async () => {
    if (!selectedOrder) return;
    try {
      await deleteOrder(Number(selectedOrder.id)).unwrap();
      toast.success(t('orderDeleted')); // Tarjima
      setIsDeleteOpen(false);
      setSelectedOrder(null);
      refetch();
    } catch {
      toast.error(t('deleteError')); // Tarjima
    }
  };

  const handleClose = useCallback(() => {
    setIsCreateOpen(false);
    setIsStatusOpen(false);
    setIsDetailsOpen(false);
    setIsDeleteOpen(false);
    setSelectedOrder(null);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">{t('loading')}</div>; // Tarjima
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">{t('errorOccurredTitle')}</h3> {/* Tarjima */}
          <pre className="text-sm">{JSON.stringify(error, null, 2)}</pre>
          <button
            onClick={refetch}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t('retry')} {/* Tarjima */}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-bg min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h4" className="text-title">
          {t('ordersFound', { count: totalElements })} {/* Tarjima */}
        </Typography>
        {isAdmin && (
          <div className="flex gap-4">
            <button
              onClick={handleCreateOpen}
              className="px-4 hidden py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t('createOrder')} {/* Tarjima */}
            </button>
            <button
              onClick={handleToggleViewMode}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              {t('toggleView', { mode: viewMode === 'list' ? t('gridView') : t('listView') })} {/* Tarjima */}
            </button>
          </div>
        )}
      </div>

      <OrdersList
        viewMode={viewMode}
        orders={orders}
        isAdmin={isAdmin}
        onStatusOpen={handleStatusOpen}
        onDetailsOpen={handleDetailsOpen}
        onDeleteOpen={handleDeleteOpen}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {totalPages > 1 && (
        <div className="mt-6">
          <PaginationGlobal page={page} pageCount={totalPages} onChange={handlePageChange} />
        </div>
      )}

      <OrderDialog
        open={isCreateOpen}
        onClose={handleClose}
        formData={formData}
        onFormChange={handleFormChange}
        onOrderItemChange={handleOrderItemChange}
        addOrderItem={addOrderItem}
        removeOrderItem={removeOrderItem}
        onSubmit={handleCreate}
        isAdmin={isAdmin}
      />

      <StatusUpdateDialog
        open={isStatusOpen}
        onClose={handleClose}
        selectedOrder={selectedOrder}
        statusForm={statusForm}
        onStatusChange={handleStatusChange}
        onSubmit={handleStatusUpdate}
      />

      <OrderDetailsDialog open={isDetailsOpen} onClose={handleClose} selectedOrder={selectedOrder} />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onClose={handleClose}
        selectedOrder={selectedOrder}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default OrdersPage;
