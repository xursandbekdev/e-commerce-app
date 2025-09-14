
import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { type SelectChangeEvent } from "@mui/material/Select"; // Add this import

interface ProductsFiltersProps {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  searchCategory: string;
  setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
  viewMode: "grid" | "list";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  isAdmin: boolean;
  onAddOpen: () => void;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  searchName,
  setSearchName,
  searchCategory,
  setSearchCategory,
  viewMode,
  setViewMode,
  isAdmin,
  onAddOpen,
}) => {
  // Fixed handler for search category Select
  const handleCategoryChange = (e: SelectChangeEvent) => {
    setSearchCategory(e.target.value as string);
  };

  return (
    <Box className="mb-6 bg-offwhite p-4 rounded-lg">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Nomi bo'yicha qidirish"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="bg-input"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Kategoriya</InputLabel>
            <Select
              value={searchCategory}
              label="Kategoriya"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">Barchasi</MenuItem>
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Phone">Phone</MenuItem>
              <MenuItem value="Moto">Moto</MenuItem>
              <MenuItem value="MacBook">MacBook</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className="flex justify-end space-x-2">
            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddOpen}
                className="bg-primary text-white"
              >
                Qo'shish
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            >
              {viewMode === "list" ? "Grid ko'rinish" : "List ko'rinish"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsFilters;