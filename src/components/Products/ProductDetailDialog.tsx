import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next'; 
import type { Product } from '../../interface';

interface ProductDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({ open, onClose, selectedProduct }) => {
  const { t, i18n } = useTranslation(); // Tarjima uchun hook

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-title">{t('productDetails')}</DialogTitle>
      <DialogContent>
        {selectedProduct ? (
          <Box>
            <Typography variant="h6" className="text-title">
              {t('name')}: {selectedProduct.name}
            </Typography>
            <Typography className="text-body">
              {t('category')}: {selectedProduct.category}
            </Typography>
            <Typography className="text-primary">
              {t('price')}: {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(selectedProduct.price)} {t('currency')}
            </Typography>
            <Typography className="text-body">
              {t('stock')}: {selectedProduct.stock}
            </Typography>
            <Typography className="text-body">
              {t('active')}: {selectedProduct.isActive ? t('yes') : t('no')}
            </Typography>
            <Typography className="text-body mt-2">
              {t('createdAt')}: {new Date(selectedProduct.createdAt).toLocaleString(i18n.language === 'uz' ? 'uz-UZ' : 'en-US')}
            </Typography>
          </Box>
        ) : (
          <Typography className="text-error">{t('productNotFound')}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" className="bg-primary text-white">
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsDialog;
