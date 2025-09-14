import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next'; // i18next hook
import { useDeleteProductMutation } from '../../api/apiSlice';
import { toast } from 'react-toastify';
import type { Product } from '../../interface';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, selectedProduct }) => {
  const { t } = useTranslation(); // Tarjima uchun hook
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id).unwrap();
        toast.success(t('deleteSuccess')); // Tarjima
        onClose();
      } catch (err) {
        toast.error(t('deleteError')); // Tarjima
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-warning">{t('deleteProduct')}</DialogTitle>
      <DialogContent>
        <Typography>
          {t('confirmDeleteProduct', { name: selectedProduct?.name ?? t('productNotFound') })} {/* Tarjima */}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('no')}</Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={!selectedProduct}
        >
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
