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
  Chip,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Order } from '../../interface';

interface OrdersListProps {
  viewMode: 'grid' | 'list';
  orders: Order[];
  isAdmin: boolean;
  onStatusOpen: (order: Order) => void;
  onDeleteOpen: (order: Order) => void;
  onDetailsOpen: (order: Order) => void;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({
  viewMode,
  orders,
  isAdmin,
  onStatusOpen,
  onDeleteOpen,
  onDetailsOpen,
}) => {
  const { t } = useTranslation(); // Tarjima uchun hook

  // Ensure orders is an array
  if (!Array.isArray(orders)) {
    console.error('Orders is not an array:', orders);
    return <Typography color="error">{t('ordersListError')}</Typography>;
  }

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
    <>
      {viewMode === 'list' ? (
        <TableContainer component={Paper} className="bg-offwhite">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('id')}</TableCell>
                <TableCell>{t('customer')}</TableCell>
                <TableCell>{t('email')}</TableCell>
                <TableCell>{t('date')}</TableCell>
                <TableCell>{t('status')}</TableCell>
                <TableCell>{t('totalAmount')}</TableCell>
                <TableCell align="right">{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.customerEmail}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString(
                      t('language') === 'uz' ? 'uz-UZ' : 'en-US'
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t(order.status.toLowerCase())}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat(t('language') === 'uz' ? 'uz-UZ' : 'en-US').format(
                      order.totalAmount
                    )}{' '}
                    {t('currency')}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onDetailsOpen(order)}>
                      <VisibilityIcon />
                    </IconButton>
                    {isAdmin && order.status === 'PENDING' && (
                      <>
                        <IconButton onClick={() => onStatusOpen(order)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDeleteOpen(order)} color="error">
                          <DeleteIcon />
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
          {orders.map((order) => (
            <Card key={order.id} className="bg-offwhite">
              <CardContent>
                <Typography variant="h6" className="text-title">
                  #{order.id}
                </Typography>
                <Typography className="text-body">{order.customerName}</Typography>
                <Typography className="text-body">{order.customerEmail}</Typography>
                <Typography className="text-body">
                  {new Date(order.orderDate).toLocaleDateString(
                    t('language') === 'uz' ? 'uz-UZ' : 'en-US'
                  )}
                </Typography>
                <Chip
                  label={t(order.status.toLowerCase())}
                  color={getStatusColor(order.status)}
                  sx={{ mt: 2 }}
                />
                <Typography className="text-primary" sx={{ mt: 2 }}>
                  {new Intl.NumberFormat(t('language') === 'uz' ? 'uz-UZ' : 'en-US').format(
                    order.totalAmount
                  )}{' '}
                  {t('currency')}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => onDetailsOpen(order)}>
                  <VisibilityIcon />
                </IconButton>
                {isAdmin && order.status === 'PENDING' && (
                  <>
                    <IconButton onClick={() => onStatusOpen(order)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteOpen(order)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default OrdersList;