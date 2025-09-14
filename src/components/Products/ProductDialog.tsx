import React from "react";
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
} from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";
import { useCreateProductMutation, useUpdateProductMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import type { Product, CreateProductRequest, UpdateProductRequest } from "../../interface";

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
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async () => {
    try {
      if (isEdit && selectedProduct) {
        await updateProduct({ id: selectedProduct.id, body: formData as UpdateProductRequest }).unwrap();
        toast.success("Mahsulot yangilandi!");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Mahsulot qo'shildi!");
      }
      onClose();
    } catch (err) {
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Mahsulotni Tahrirlash" : "Yangi Mahsulot Qo'shish"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Nomi"
          name="name"
          value={formData.name}
          onChange={onFormChange}
          margin="normal"
          className="bg-input"
        />
        <TextField
          fullWidth
          label="Narx"
          name="price"
          type="number"
          value={formData.price === 0 ? "" : formData.price} // Empty string if 0
          onChange={onFormChange}
          margin="normal"
          className="bg-input"
          placeholder="Narxni kiriting"
        />
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock === 0 ? "" : formData.stock} // Empty string if 0
          onChange={onFormChange}
          margin="normal"
          className="bg-input"
          placeholder="Stockni kiriting"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Kategoriya</InputLabel>
          <Select value={formData.category} label="Kategoriya" onChange={onCategoryChange}>
            <MenuItem value="Laptop">Laptop</MenuItem>
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Moto">Moto</MenuItem>
            <MenuItem value="MacBook">MacBook</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Switch checked={formData.isActive} onChange={onSwitchChange} />
          <Typography>Faol</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button onClick={handleSubmit} variant="contained" className="bg-primary text-white">
          {isEdit ? "Saqlash" : "Qo'shish"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;