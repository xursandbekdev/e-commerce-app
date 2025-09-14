import React, { useState, useMemo, useEffect } from "react";
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
} from "@mui/material";
import { Visibility as EyeIcon } from "@mui/icons-material";
import { useGetProductsQuery } from "../../api/apiSlice";
import Image from "../../assets/register.jpg";
import type { HomeCardProps, Product } from "../../interface";
import PaginationGlobal from "../paginition";
import { Link } from "react-router-dom";


const HomeCard: React.FC<HomeCardProps> = ({ searchValue }) => {
    const { data, isLoading, isError } = useGetProductsQuery();
    const products: Product[] = data?.data?.content || [];
    const skeletonArray = Array.from({ length: 5 });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

    const itemsPerPage = isMobile ? 2 : isTablet ? 3 : 5;
    const [page, setPage] = useState(1);

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
    return (
        <Box className="px-6 py-12 max-w-7xl mx-auto">
            <Box className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <Box>
                    <Typography variant="h4" className="font-semibold text-title">
                        Flash Sales
                    </Typography>
                </Box>
            </Box>

            <Box className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8`}>
                {isLoading
                    ? skeletonArray.map((_, idx) => (
                        <Card key={idx} className="relative shadow-none border border-line bg-offwhite">
                            <Skeleton variant="rectangular" height={200} className="p-4" />
                            <CardContent className="p-4">
                                <Skeleton data-testid="skeleton" variant="text" width="80%" height={20} className="mb-2" />
                                <Skeleton data-testid="skeleton" variant="text" width="60%" height={20} />
                            </CardContent>
                        </Card>
                    ))
                    : currentProducts.map((product) => (
                        <Link key={product.id} aria-label={product.name} to={`/products/${product.id}`} >
                            <Card
                                key={product.id}
                                className="relative group shadow-none border border-line bg-offwhite hover:shadow-lg transition-all"
                            >
                                <Box className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <IconButton className="w-8 h-8 bg-offwhite shadow-sm hover:bg-bg">
                                        <EyeIcon fontSize="small" className="text-body" />
                                    </IconButton>
                                </Box>

                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={Image}
                                    alt={product.name}
                                    className="h object-contain"
                                />

                                <CardContent className="p-4">
                                    <Typography className="font-medium text-title mb-2 text-sm">{product.name}</Typography>
                                    <Box className="flex items-center gap-3 mb-2">
                                        <Typography className="text-error font-medium">
                                            {new Intl.NumberFormat("uz-UZ").format(product.price)} so'm
                                        </Typography>
                                    </Box>
                                    <Box className="flex items-center gap-2">
                                        <Rating value={Math.floor(Math.random() * 5) + 1} readOnly size="small" />
                                        <Typography className="text-label text-sm">({Math.floor(Math.random() * 100)})</Typography>
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
            {isError && <Typography className="text-error">API call error</Typography>}
        </Box>
    );
};

export default HomeCard;


