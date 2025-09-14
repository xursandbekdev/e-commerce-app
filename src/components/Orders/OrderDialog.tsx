import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // i18next hook
import type { CreateOrderRequest } from '../../interface';

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  formData: CreateOrderRequest;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onOrderItemChange: (index: number, field: 'productId' | 'quantity', value: number) => void;
  addOrderItem: () => void;
  removeOrderItem: (index: number) => void;
  onSubmit: () => void;
  isAdmin: boolean;
}

const OrderDialog: React.FC<OrderDialogProps> = ({
  open,
  onClose,
  formData,
  onFormChange,
  onOrderItemChange,
  addOrderItem,
  removeOrderItem,
  onSubmit,
  isAdmin,
}) => {
  const { t } = useTranslation(); // Tarjima uchun hook

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t('addOrder')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={t('customer')}
          name="customerName"
          value={formData.customerName}
          onChange={onFormChange}
          margin="normal"
          className="bg-input"
          required
        />
        <TextField
          fullWidth
          label={t('email')}
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={onFormChange}
          margin="normal"
          className="bg-input"
          required
        />
        <Typography variant="h6" className="mt-4 text-title">
          {t('orderItems')}
        </Typography>
        <List>
          {formData.orderItems.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                formData.orderItems.length > 1 && (
                  <IconButton onClick={() => removeOrderItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                )
              }
            >
              <ListItemText
                primary={`${t('items')} ${index + 1}`}
                secondary={
                  <Box>
                    <TextField
                      label={t('productId')}
                      type="number"
                      value={item.productId}
                      onChange={(e) =>
                        onOrderItemChange(index, 'productId', Number(e.target.value))
                      }
                      size="small"
                      className="mr-2 bg-input"
                      required
                    />
                    <TextField
                      label={t('quantity')}
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        onOrderItemChange(index, 'quantity', Number(e.target.value))
                      }
                      size="small"
                      className="bg-input"
                      inputProps={{ min: 1 }}
                      required
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        <Button startIcon={<AddIcon />} onClick={addOrderItem} className="mt-2">
          {t('addItem')}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          className="bg-primary text-white"
          disabled={!isAdmin}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;