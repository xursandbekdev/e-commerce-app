import React from "react";
import { Card, CardMedia, CardContent, Typography, Rating, Chip, Box, IconButton } from "@mui/material";
import { Visibility as EyeIcon } from "@mui/icons-material";
import type { Product } from "../../interface";
import Image from "../../assets/register.jpg";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="relative group shadow-none border border-line bg-offwhite hover:shadow-lg transition-all">
      <Chip
        label={`- 50%`}
        className="absolute top-3 left-3 z-10 bg-error text-text text-xs font-medium"
        size="small"
      />
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
          <Rating value={5} readOnly size="small" />
          <Typography className="text-label text-sm">({Math.floor(23)})</Typography>
        </Box>
      </CardContent>
    </Card>

  );
};

export default ProductCard;

