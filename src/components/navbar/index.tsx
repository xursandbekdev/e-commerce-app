import {
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  Dashboard as DashboardIcon,
  LightMode as LightModeIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as OrdersIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuItem as MuiMenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import type { NavbarProps } from "../../interface";
import CartBadge from "../ui/CardBadge";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "1px solid var(--color-line)" },
  },
};

const Navbar: React.FC<NavbarProps> = ({ searchValue, setSearchValue }) => {
  const { user, logout } = useAuth();
  const role = user?.role;
  const [language, setLanguage] = useState<"en" | "uz">("en");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const isUserSection = ["dashboard", "orders", "products"].includes(location.pathname.split("/")[1] || "");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(searchValue), 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
      ? "bg-primary text-text"
      : "text-body hover:text-primary hover:bg-input"
    }`;

  const mobileNavLinkStyles = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-text"
      : "text-body hover:bg-input";

  return (
    <>
      <AppBar
        position="static"
        className={`bg-offwhite shadow-none border-b border-line ${darkMode ? "dark:bg-[#1E1E2F]" : ""}`}
        elevation={0}
      >
        <Toolbar className="px-4 py-2 sm:px-6 flex justify-between items-center">
          <Link to={"/"}>
            <Typography
              variant="h6"
              component="div"
              className={`font-semibold text-lg sm:text-xl ${darkMode ? "text-text" : "text-offwhite"}`}
              translate="no"
            >
              TenzorSoft
            </Typography>
          </Link>

          <Box className="flex items-center space-x-2 sm:space-x-4">
            {location.pathname === "/" && (
              <Box className="hidden sm:block w-full max-w-[200px] lg:max-w-[250px]">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search ..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full bg-input rounded-md"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" className="text-body hover:text-primary">
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Box>
            )}
            {role === "USER" && isUserSection && (
              <Box className="hidden md:flex items-center space-x-2">
                <NavLink to="/dashboard" className={navLinkStyles}>
                  Dashboard
                </NavLink>
                <NavLink to="/orders" className={navLinkStyles}>
                  Orders
                </NavLink>
                <NavLink to="/products" className={navLinkStyles}>
                  Products
                </NavLink>
              </Box>
            )}

            <IconButton onClick={() => setDarkMode((prev) => !prev)} className="text-body hover:text-primary">
              {darkMode ? <LightModeIcon className="text-offwhite" /> : <DarkModeIcon className="text-offwhite" />}
            </IconButton>

            {location.pathname !== "/dashboard" && location.pathname !== "/orders" && <CartBadge />}

            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "uz")}
              size="small"
              variant="outlined"
              className="bg-input rounded-md hidden sm:block min-w-[70px] lg:min-w-[80px]"
              sx={{ ...inputStyles, "& .MuiSelect-select": { padding: "6px 10px" } }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="uz">UZ</MenuItem>
            </Select>

            {role === null && (
              <Box className="hidden sm:flex gap-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant="contained"
                  size="small"
                  className="text-offwhite border-line hover:border-primary hover:text-primary"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  variant="contained"
                  size="small"
                  className="bg-primary text-text hover:bg-secondary"
                >
                  Sign Up
                </Button>
              </Box>
            )}

            {role === "USER" && (
              <Box className="hidden md:flex items-center">
                <IconButton onClick={handleMenuOpen}>
                  <Avatar alt={user?.username || "User"} src="/static/images/avatar/1.jpg" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MuiMenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleMenuClose();
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MuiMenuItem>
                  <MuiMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MuiMenuItem>
                </Menu>
              </Box>
            )}

            <div className="flex md:hidden">
              <IconButton edge="end" className="text-title lg:hidden" onClick={() => setDrawerOpen(true)}>
                <MenuIcon className="text-offwhite" />
              </IconButton>
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box className="w-[80vw] max-w-[300px] flex flex-col h-full bg-offwhite">
          <Box className="flex items-center justify-between px-4 py-3 border-b border-line">
            <Typography variant="h6" className="text-title font-semibold text-lg" translate="no">
              TenzorSoft
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {location.pathname === "/" && (
            <Box className="p-4">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-input rounded-md"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" className="text-body hover:text-primary">
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />
            </Box>
          )}

          <Divider />

          {role === "USER" && (
            <>
              <List className="px-2 py-2">
                <ListItem disablePadding>
                  <NavLink
                    to="/dashboard"
                    className="w-full"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {({ isActive }) => (
                      <ListItemButton className={`rounded-md mx-2 ${mobileNavLinkStyles({ isActive })}`}>
                        <ListItemIcon>
                          <DashboardIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    )}
                  </NavLink>
                </ListItem>
                <ListItem disablePadding>
                  <NavLink
                    to="/orders"
                    className="w-full"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {({ isActive }) => (
                      <ListItemButton className={`rounded-md mx-2 ${mobileNavLinkStyles({ isActive })}`}>
                        <ListItemIcon>
                          <OrdersIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                      </ListItemButton>
                    )}
                  </NavLink>
                </ListItem>
                <ListItem disablePadding>
                  <NavLink
                    to="/products"
                    className="w-full"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {({ isActive }) => (
                      <ListItemButton className={`rounded-md mx-2 ${mobileNavLinkStyles({ isActive })}`}>
                        <ListItemIcon>
                          <OrdersIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                      </ListItemButton>
                    )}
                  </NavLink>
                </ListItem>
              </List>
              <Divider />
            </>
          )}

          {role === null && (
            <Box className="p-4 flex flex-col gap-2">
              <Button
                onClick={() => navigate("/login")}
                variant="outlined"
                size="small"
                className="text-body border-line hover:border-primary hover:text-primary"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                size="small"
                className="bg-primary text-text hover:bg-secondary"
              >
                Sign Up
              </Button>
            </Box>
          )}

          {role === "USER" && (
            <Box className="p-4 flex flex-col gap-2">
              <Button
                onClick={() => {
                  navigate("/profile");
                  setDrawerOpen(false);
                }}
                variant="outlined"
                size="small"
                startIcon={<AccountCircleIcon />}
              >
                Profile
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                variant="outlined"
                size="small"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Box>
          )}

          <Divider />

          <Box className="p-4">
            <Select
              fullWidth
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "uz")}
              size="small"
              variant="outlined"
              className="bg-input rounded-md"
              sx={{ ...inputStyles, "& .MuiSelect-select": { padding: "6px 10px" } }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="uz">UZ</MenuItem>
            </Select>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;