import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { useTranslation } from 'react-i18next'; // i18next hook
import type { Order } from '../../interface';

interface OrderDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedOrder: Order | null;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ open, onClose, selectedOrder }) => {
  const { t } = useTranslation(); // Tarjima uchun hook

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'DELIVERED':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="text-title">
        {t('orderDetails')} #{selectedOrder?.id ?? t('orderNotFound')} {/* Tarjima */}
      </DialogTitle>
      <DialogContent>
        {selectedOrder ? (
          <Box>
            <Typography variant="h6">
              {t('customer')}: {selectedOrder.customerName} {/* Tarjima */}
            </Typography>
            <Typography>
              {t('email')}: {selectedOrder.customerEmail} {/* Tarjima */}
            </Typography>
            <Typography>
              {t('date')}: {new Date(selectedOrder.orderDate).toLocaleString('uz-UZ')} {/* Tarjima */}
            </Typography>
            <Chip
              label={t(selectedOrder.status.toLowerCase())} // Tarjima
              color={getStatusColor(selectedOrder.status)}
              className="mt-2"
            />
            <Typography className="text-primary mt-2">
              {t('total')}: {new Intl.NumberFormat('uz-UZ').format(selectedOrder.totalAmount)}{' '}
              {t('currency')} {/* Tarjima */}
            </Typography>
            <Typography variant="h6" className="mt-4">
              {t('items')}: {/* Tarjima */}
            </Typography>
            <List>
              {selectedOrder.orderItems.map((item: any) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.productName} x${item.quantity}`}
                    secondary={`${t('price')}: ${new Intl.NumberFormat('uz-UZ').format(
                      item.unitPrice
                    )} ${t('currency')} | ${t('total')}: ${new Intl.NumberFormat('uz-UZ').format(
                      item.totalPrice
                    )} ${t('currency')}`} // Tarjima
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography color="error">{t('orderNotFound')}</Typography> // Tarjima
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" className="bg-primary text-white">
          {t('close')} {/* Tarjima */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;