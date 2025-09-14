import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import type { Product } from "../../interface";

interface ProductDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({ open, onClose, selectedProduct }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-title">Mahsulot Detallari</DialogTitle>
      <DialogContent>
        {selectedProduct ? (
          <Box>
            <Typography variant="h6" className="text-title">Nomi: {selectedProduct.name}</Typography>
            <Typography className="text-body">Kategoriya: {selectedProduct.category}</Typography>
            <Typography className="text-primary">Narx: {selectedProduct.price.toLocaleString()} so'm</Typography>
            <Typography className="text-body">Stock: {selectedProduct.stock}</Typography>
            <Typography className="text-body">Faol: {selectedProduct.isActive ? "Ha" : "Yo'q"}</Typography>
            <Typography className="text-body mt-2">
              Yaratilgan: {new Date(selectedProduct.createdAt).toLocaleString("uz-UZ")}
            </Typography>
          </Box>
        ) : (
          <Typography className="text-error">Mahsulot topilmadi!</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" className="bg-primary text-white">
          Yopish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsDialog;