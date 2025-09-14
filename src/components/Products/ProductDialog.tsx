import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next'; // i18next hook
import { useCreateProductMutation, useUpdateProductMutation } from '../../api/apiSlice';
import { toast } from 'react-toastify';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../../interface';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  formData: CreateProductRequest;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: SelectChangeEvent) => void;
  selectedProduct: Product | null;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onClose,
  isEdit,
  formData,
  onFormChange,
  onSwitchChange,
  onCategoryChange,
  selectedProduct,
}) => {
  const { t } = useTranslation(); // Tarjima uchun hook
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.category ||
      formData.price === undefined ||
      formData.stock === undefined
    ) {
      toast.error(t('fillAllFields')); // Tarjima
      return;
    }

    try {
      const payload: UpdateProductRequest = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (isEdit && selectedProduct) {
        await updateProduct({ id: selectedProduct.id, body: payload }).unwrap();
        toast.success(t('productUpdated')); // Tarjima
      } else {
        await createProduct(payload).unwrap();
        toast.success(t('productAdded')); // Tarjima
      }
      onClose();
    } catch (err) {
      toast.error(t('errorOccurred')); // Tarjima
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? t('editProduct') : t('addProduct')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={onFormChange}
          margin="normal"
          required
          error={!formData.name}
          helperText={!formData.name ? t('requiredField') : ''}
        />

        <TextField
          fullWidth
          label={t('price')}
          name="price"
          type="number"
          value={formData.price ?? ''}
          onChange={onFormChange}
          margin="normal"
          required
          error={formData.price === undefined}
          helperText={formData.price === undefined ? t('requiredField') : ''}
          inputProps={{ min: 0 }}
        />

        <TextField
          fullWidth
          label={t('stock')}
          name="stock"
          type="number"
          value={formData.stock ?? ''}
          onChange={onFormChange}
          margin="normal"
          required
          error={formData.stock === undefined}
          helperText={formData.stock === undefined ? t('requiredField') : ''}
          inputProps={{ min: 0 }}
        />

        <FormControl fullWidth margin="normal" required error={!formData.category}>
          <InputLabel>{t('category')}</InputLabel>
          <Select value={formData.category} label={t('category')} onChange={onCategoryChange}>
            <MenuItem value="" disabled>
              {t('selectCategory')}
            </MenuItem>
            <MenuItem value="Laptop">{t('laptop')}</MenuItem>
            <MenuItem value="Phone">{t('phone')}</MenuItem>
            <MenuItem value="Moto">{t('moto')}</MenuItem>
            <MenuItem value="MacBook">{t('macbook')}</MenuItem>
          </Select>
          {!formData.category && (
            <Typography variant="caption" color="error">
              {t('requiredField')}
            </Typography>
          )}
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Switch checked={formData.isActive} onChange={onSwitchChange} />
          <Typography>{t('active')}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formData.name ||
            !formData.category ||
            formData.price === undefined ||
            formData.stock === undefined
          }
        >
          {isEdit ? t('save') : t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
