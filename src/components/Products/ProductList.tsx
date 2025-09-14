// src/components/ProductsList.tsx

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import PaginationGlobal from "../paginition";
import type { Product } from "../../interface";

interface ProductsListProps {
  viewMode: "grid" | "list";
  products: Product[];
  isAdmin: boolean;
  onEditOpen: (product: Product) => void;
  onDeleteOpen: (product: Product) => void;
  onDetailsOpen: (product: Product) => void;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  viewMode,
  products,
  isAdmin,
  onEditOpen,
  onDeleteOpen,
  onDetailsOpen,
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      {viewMode === "list" ? (
        <TableContainer component={Paper} className="bg-offwhite">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nomi</TableCell>
                <TableCell>Kategoriya</TableCell>
                <TableCell>Narx</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Faol</TableCell>
                <TableCell align="right">Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price.toLocaleString()} so'm</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.isActive ? "Ha" : "Yo'q"}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onDetailsOpen(product)}>
                      <VisibilityIcon />
                    </IconButton>
                    {isAdmin && (
                      <>
                        <IconButton onClick={() => onEditOpen(product)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDeleteOpen(product)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className="bg-offwhite">
                <CardContent>
                  <Typography variant="h6" className="text-title">
                    {product.name}
                  </Typography>
                  <Typography className="text-body">Kategoriya: {product.category}</Typography>
                  <Typography className="text-primary">{product.price.toLocaleString()} so'm</Typography>
                  <Typography className="text-body">Stock: {product.stock}</Typography>
                  <Typography className="text-body">Faol: {product.isActive ? "Ha" : "Yo'q"}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => onDetailsOpen(product)}>
                    <VisibilityIcon />
                  </IconButton>
                  {isAdmin && (
                    <>
                      <IconButton onClick={() => onEditOpen(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDeleteOpen(product)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <PaginationGlobal page={page} pageCount={totalPages} onChange={onPageChange} />
    </>
  );
};

export default ProductsList;