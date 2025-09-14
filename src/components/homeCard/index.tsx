import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Visibility as EyeIcon } from '@mui/icons-material';
import { useGetProductsQuery } from '../../api/apiSlice';
import Image from '../../assets/register.jpg';
import type { HomeCardProps, Product } from '../../interface';
import PaginationGlobal from '../paginition';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18next hook

const HomeCard: React.FC<HomeCardProps> = ({ searchValue }) => {
  const { t } = useTranslation(); // Tarjima uchun hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const itemsPerPage = isMobile ? 2 : isTablet ? 3 : 5;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetProductsQuery({
    page: page - 1,
    size: itemsPerPage,
    name: searchValue || undefined,
  });

  const products: Product[] = data?.data?.content ?? [];
  const skeletonArray = Array.from({ length: itemsPerPage });

  const filteredProducts = useMemo(() => {
    if (!searchValue) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [products, searchValue]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [searchValue, itemsPerPage]);

  if (isError) {
    return (
      <Box className="px-6 py-12 max-w-7xl mx-auto bg-bg dark:bg-bg">
        <Typography className="text-error dark:text-error">
          {t('apiError')} {/* Tarjima */}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="px-6 py-12 max-w-7xl mx-auto bg-bg dark:bg-bg">
      <Box className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <Typography
          variant="h4"
          className="font-semibold text-title dark:text-title-active"
        >
          {t('flashSales')} {/* Tarjima */}
        </Typography>
      </Box>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {isLoading
          ? skeletonArray.map((_, idx) => (
              <Card
                key={idx}
                className="relative shadow-none border border-line bg-offwhite dark:bg-off-white"
              >
                <Skeleton variant="rectangular" height={200} className="p-4" />
                <CardContent className="p-4">
                  <Skeleton variant="text" width="80%" height={20} className="mb-2" />
                  <Skeleton variant="text" width="60%" height={20} />
                </CardContent>
              </Card>
            ))
          : currentProducts.map((product) => (
              <Link
                key={product.id}
                aria-label={product.name}
                to={`/products/${product.id}`}
              >
                <Card className="relative group shadow-none border border-line bg-offwhite dark:bg-off-white hover:shadow-lg transition-all">
                  <Box className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton className="w-8 h-8 bg-offwhite dark:bg-off-white shadow-sm hover:bg-bg dark:hover:bg-bg">
                      <EyeIcon
                        fontSize="small"
                        className="text-body dark:text-text-body"
                      />
                    </IconButton>
                  </Box>

                  <CardMedia
                    component="img"
                    height="250"
                    image={Image}
                    alt={product.name}
                    className="h-[250px] object-contain"
                  />

                  <CardContent className="p-4 bg-bg">
                    <Typography className="font-medium text-title dark:text-title-active mb-2 text-sm">
                      {product.name}
                    </Typography>
                    <Box className="flex items-center gap-3 mb-2">
                      <Typography className="text-error dark:text-error font-medium">
                        {new Intl.NumberFormat('uz-UZ').format(product.price)} {t('currency')} {/* Tarjima */}
                      </Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Rating
                        value={Math.floor(Math.random() * 5) + 1}
                        readOnly
                        size="small"
                      />
                      <Typography className="text-placeholder dark:text-placeholder text-sm">
                        ({Math.floor(Math.random() * 100)})
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </Box>

      {pageCount > 1 && (
        <PaginationGlobal
          page={page}
          pageCount={pageCount}
          onChange={(value) => setPage(value)}
        />
      )}
    </Box>
  );
};

export default HomeCard;