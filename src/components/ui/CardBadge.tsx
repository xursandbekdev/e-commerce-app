import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartBadge: React.FC = () => {
    const { getCartItemsCount } = useCart();
    const navigate = useNavigate();

    return (
        <IconButton
            onClick={() => navigate('/basket')}
            color="inherit"
        >
            <Badge
                badgeContent={getCartItemsCount()}
                color="error"
                showZero={false}
            >
                <ShoppingCart />
            </Badge>
        </IconButton>
    );
};

export default CartBadge;