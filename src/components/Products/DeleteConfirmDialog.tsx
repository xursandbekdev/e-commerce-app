// src/components/DeleteConfirmDialog.tsx (Fixed to check null)

import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useDeleteProductMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import type { Product } from "../../interface";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, selectedProduct }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id).unwrap();
        toast.success("Mahsulot o'chirildi!");
        onClose();
      } catch (err) {
        toast.error("O'chirishda xatolik!");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-warning">O'chirishni tasdiqlang</DialogTitle>
      <DialogContent>
        <Typography>Haqiqatan ham "{selectedProduct?.name ?? 'Nomalum'}" ni o'chirmoqchimisiz?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Yo'q</Button>
        <Button onClick={handleDelete} variant="contained" color="error" disabled={!selectedProduct}>
          Ha
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;