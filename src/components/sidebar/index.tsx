import { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";
import { Menu, Close, ShoppingBag, Inventory } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: "Buyurtmalar", icon: <ShoppingBag />, path: "/orders" },
        { text: "Mahsulotlar", icon: <Inventory />, path: "/products" },
    ];

    const drawerContent = (
        <Box className="bg-primary text-white h-full flex flex-col">
            <Box className="p-4 flex items-center justify-between">
                <Typography variant="h6" className="font-semibold">
                    Dashboard
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={handleDrawerToggle}
                    className="lg:hidden"
                >
                    <Close />
                </IconButton>
            </Box>
            <Divider className="bg-white opacity-20" />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            className="py-3 px-4 hover:bg-blue-700"
                        >
                            <ListItemIcon className="text-white">
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{ className: "text-sm sm:text-base" }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box component="nav">
            {/* Mobile Hamburger Menu */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className="lg:hidden fixed top-4 left-4 z-50 text-white"
            >
                <Menu />
            </IconButton>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better performance on mobile
                }}
                sx={{
                    display: { xs: "block", lg: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 240,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", lg: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 240,
                        borderRight: "none",
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;