import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // i18next hook
import type { Order } from '../../interface';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  selectedOrder: Order | null;
  onConfirm: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  selectedOrder,
  onConfirm,
}) => {
  const { t } = useTranslation(); // Tarjima uchun hook

  if (!selectedOrder) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'bg-bg',
      }}
    >
      <DialogTitle className="text-title flex items-center gap-2">
        <WarningIcon color="warning" />
        {t('deleteOrder')} {/* Tarjima */}
      </DialogTitle>

      <DialogContent>
        <Typography className="text-body mb-4">
          {t('confirmDelete')} {/* Tarjima */}
        </Typography>

        <Box className="bg-bg p-4 rounded-lg">
          <Typography variant="subtitle2" className="text-title mb-2">
            {t('orderDetails')}: {/* Tarjima */}
          </Typography>
          <Typography className="text-body">
            <strong>{t('id')}:</strong> #{selectedOrder.id}
          </Typography>
          <Typography className="text-body">
            <strong>{t('customer')}:</strong> {selectedOrder.customerName}
          </Typography>
          <Typography className="text-body">
            <strong>{t('email')}:</strong> {selectedOrder.customerEmail}
          </Typography>
          <Typography className="text-body">
            <strong>{t('totalAmount')}:</strong>{' '}
            {new Intl.NumberFormat('uz-UZ').format(selectedOrder.totalAmount)} {t('currency')} {/* Tarjima */}
          </Typography>
          <Typography className="text-body">
            <strong>{t('status')}:</strong> {t(selectedOrder.status.toLowerCase())} {/* Tarjima */}
          </Typography>
        </Box>

        <Typography className="text-red-600 mt-4 text-sm">
          <strong>{t('warning')}:</strong> {t('irreversibleAction')} {/* Tarjima */}
        </Typography>
      </DialogContent>

      <DialogActions className="p-4">
        <Button
          onClick={onClose}
          variant="outlined"
          className="mr-2"
        >
          {t('cancel')} {/* Tarjima */}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          autoFocus
        >
          {t('delete')} {/* Tarjima */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;