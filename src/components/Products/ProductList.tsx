import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // i18next hook
import PaginationGlobal from '../paginition';
import type { Product } from '../../interface';

interface ProductsListProps {
  viewMode: 'grid' | 'list';
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
  const { t, i18n } = useTranslation(); // Tarjima uchun hook

  return (
    <>
      {viewMode === 'list' ? (
        <TableContainer component={Paper} className="bg-offwhite">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('id')}</TableCell>
                <TableCell>{t('name')}</TableCell>
                <TableCell>{t('category')}</TableCell>
                <TableCell>{t('price')}</TableCell>
                <TableCell>{t('stock')}</TableCell>
                <TableCell>{t('active')}</TableCell>
                <TableCell align="right">{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{t(product.category.toLowerCase())}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(product.price)} {t('currency')}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.isActive ? t('yes') : t('no')}</TableCell>
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            mt: 2,
          }}
        >
          {products.map((product) => (
            <Card key={product.id} className="bg-offwhite">
              <CardContent>
                <Typography variant="h6" className="text-title">
                  {product.name}
                </Typography>
                <Typography className="text-body">
                  {t('category')}: {t(product.category.toLowerCase())}
                </Typography>
                <Typography className="text-primary">
                  {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(product.price)} {t('currency')}
                </Typography>
                <Typography className="text-body">
                  {t('stock')}: {product.stock}
                </Typography>
                <Typography className="text-body">
                  {t('active')}: {product.isActive ? t('yes') : t('no')}
                </Typography>
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
          ))}
        </Box>
      )}

      <PaginationGlobal page={page} pageCount={totalPages} onChange={onPageChange} />
    </>
  );
};

export default ProductsList;
