import {
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as OrdersIcon,
} from '@mui/icons-material';
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
  MenuItem as MuiMenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import { useTranslation } from 'react-i18next';
import type { NavbarProps } from '../../interface';
import CartBadge from '../ui/CardBadge';
import ThemeToggle from './themeToggle';
import LanguageSelect from './languageSelect';

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid var(--color-line)' },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--color-placeholder)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--color-primary)',
  },
};

const Navbar: React.FC<NavbarProps> = ({ searchValue, setSearchValue }) => {
  const { user, logout } = useAuth();
  const role = user?.role;
  const { t } = useTranslation();
  const [language, setLanguage] = useState<'en' | 'uz'>('en');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const AdminSection = ['dashboard', 'orders', 'productsAdmin'];
  const isAdminSection = AdminSection.some((section) =>
    location.pathname.startsWith(`/${section}`)
  );

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(searchValue), 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue, setSearchValue]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const dashboardButtonStyles = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
      ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white'
      : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400'
    }`;

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
      ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white'
      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  const mobileNavLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `rounded-md mx-2 ${isActive
      ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <>
      <AppBar
        position="static"
        className="bg-white dark:bg-gray-900 shadow-none border-b border-gray-200 dark:border-gray-700"
        elevation={0}
      >
        <Toolbar className="px-4 py-2 sm:px-6 flex justify-between items-center">
          <Link to="/">
            <Typography
              variant="h6"
              component="div"
              className="font-semibold text-lg sm:text-xl text-white"
              translate="no"
            >
              {t('welcome')}
            </Typography>
          </Link>

          <Box className="flex items-center space-x-2 sm:space-x-4">
            {location.pathname === '/' && (
              <Box className="hidden sm:block w-full max-w-[200px] lg:max-w-[250px]">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={t('searchPlaceholder')}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-500 rounded-md text-gray-900 dark:text-gray-100"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Box>
            )}
            {role === 'USER' && location.pathname === '/' && (
              <Box className="hidden md:flex items-center space-x-2">
                <NavLink to="/dashboard" className={dashboardButtonStyles}>
                  {t('dashboard')}
                </NavLink>
              </Box>
            )}

            {role === 'USER' && isAdminSection && location.pathname !== '/' && (
              <Box className="hidden md:flex items-center space-x-2">
                <NavLink to="/dashboard" className={navLinkStyles}>
                  {t('dashboard')}
                </NavLink>
                <NavLink to="/orders" className={navLinkStyles}>
                  {t('orders')}
                </NavLink>
                <NavLink to="/productsAdmin" className={navLinkStyles}>
                  {t('products')}
                </NavLink>
              </Box>
            )}

            <ThemeToggle />

            {location.pathname !== '/dashboard' &&
              location.pathname !== '/orders' &&
              location.pathname !== '/productsAdmin' && <CartBadge />}

            {/* LanguageSelect komponentini ishlatish */}
            <Box className="hidden sm:block">
              <LanguageSelect language={language} setLanguage={setLanguage} />
            </Box>

            {role === null && (
              <Box className="hidden sm:flex gap-2">
                <Button
                  onClick={() => navigate('/login')}
                  variant="outlined"
                  size="small"
                  className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t('signIn')}
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  variant="contained"
                  size="small"
                  className="bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  {t('signUp')}
                </Button>
              </Box>
            )}

            {role === 'USER' && (
              <Box className="hidden md:flex items-center">
                <IconButton onClick={handleMenuOpen}>
                  <Avatar
                    alt={user?.username || 'User'}
                    src="/static/images/avatar/1.jpg"
                    className="border border-gray-300 dark:border-gray-600"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    className:
                      'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                  }}
                >
                  <MuiMenuItem
                    onClick={() => {
                      navigate('/profile');
                      handleMenuClose();
                    }}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ListItemIcon>
                      <AccountCircleIcon
                        fontSize="small"
                        className="text-gray-600 dark:text-gray-400"
                      />
                    </ListItemIcon>
                    <ListItemText>{t('profile')}</ListItemText>
                  </MuiMenuItem>
                  <MuiMenuItem
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ListItemIcon>
                      <LogOutIcon
                        size={16}
                        className="text-gray-600 dark:text-gray-400"
                      />
                    </ListItemIcon>
                    <ListItemText>{t('logout')}</ListItemText>
                  </MuiMenuItem>
                </Menu>
              </Box>
            )}

            <Box className="flex md:hidden">
              <IconButton
                edge="end"
                className="text-gray-900 dark:text-white lg:hidden"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon className="text-gray-900 dark:text-white" />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className="w-[80vw] max-w-[300px] flex flex-col h-full bg-white dark:bg-gray-900">
          <Box className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Typography
              variant="h6"
              className="text-white font-semibold text-lg"
              translate="no"
            >
              {t('welcome')}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon className="text-gray-900 dark:text-white" />
            </IconButton>
          </Box>

          {location.pathname === '/' && (
            <Box className="p-4">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder={t('searchPlaceholder')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-gray-50 dark:bg-gray-500 rounded-md text-gray-900 dark:text-gray-100"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />
            </Box>
          )}

          <Divider className="bg-gray-200 dark:bg-gray-700" />

          {role === 'USER' && (
            <>
              <List className="px-2 py-2">
                {location.pathname === '/' ? (
                  <ListItem disablePadding>
                    <NavLink
                      to="/dashboard"
                      className="w-full"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {({ isActive }) => (
                        <ListItemButton
                          className={mobileNavLinkStyles({ isActive })}
                        >
                          <ListItemIcon>
                            <OrdersIcon
                              fontSize="small"
                              className="text-gray-600 dark:text-gray-400"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={t('dashboard')}
                            className="text-gray-700 dark:text-gray-300"
                          />
                        </ListItemButton>
                      )}
                    </NavLink>
                  </ListItem>
                ) : (
                  <>
                    <ListItem disablePadding>
                      <NavLink
                        to="/dashboard"
                        className="w-full"
                        onClick={() => setDrawerOpen(false)}
                      >
                        {({ isActive }) => (
                          <ListItemButton
                            className={mobileNavLinkStyles({ isActive })}
                          >
                            <ListItemIcon>
                              <OrdersIcon
                                fontSize="small"
                                className="text-gray-600 dark:text-gray-400"
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={t('dashboard')}
                              className="text-gray-700 dark:text-gray-300"
                            />
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
                          <ListItemButton
                            className={mobileNavLinkStyles({ isActive })}
                          >
                            <ListItemIcon>
                              <OrdersIcon
                                fontSize="small"
                                className="text-gray-600 dark:text-gray-400"
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={t('orders')}
                              className="text-gray-700 dark:text-gray-300"
                            />
                          </ListItemButton>
                        )}
                      </NavLink>
                    </ListItem>
                    <ListItem disablePadding>
                      <NavLink
                        to="/productsAdmin"
                        className="w-full"
                        onClick={() => setDrawerOpen(false)}
                      >
                        {({ isActive }) => (
                          <ListItemButton
                            className={mobileNavLinkStyles({ isActive })}
                          >
                            <ListItemIcon>
                              <OrdersIcon
                                fontSize="small"
                                className="text-gray-600 dark:text-gray-400"
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={t('products')}
                              className="text-gray-700 dark:text-gray-300"
                            />
                          </ListItemButton>
                        )}
                      </NavLink>
                    </ListItem>
                  </>
                )}
              </List>
              <Divider className="bg-gray-200 dark:bg-gray-700" />
            </>
          )}

          {role === null && (
            <Box className="p-4 flex flex-col gap-2">
              <Button
                onClick={() => navigate('/login')}
                variant="outlined"
                size="small"
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t('signIn')}
              </Button>
              <Button
                onClick={() => navigate('/register')}
                variant="contained"
                size="small"
                className="bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                {t('signUp')}
              </Button>
            </Box>
          )}

          {role === 'USER' && (
            <Box className="p-4 flex flex-col gap-2">
              <Button
                onClick={() => {
                  navigate('/profile');
                  setDrawerOpen(false);
                }}
                variant="outlined"
                size="small"
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                startIcon={
                  <AccountCircleIcon className="text-gray-600 dark:text-gray-400" />
                }
              >
                {t('profile')}
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                variant="outlined"
                size="small"
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                startIcon={
                  <LogOutIcon
                    size={16}
                    className="text-gray-600 dark:text-gray-400"
                  />
                }
              >
                {t('logout')}
              </Button>
            </Box>
          )}

          <Divider className="bg-gray-200 dark:bg-gray-700" />

          <Box className="p-4 flex flex-col gap-2">
            {/* LanguageSelect komponentini Drawer ichida ishlatish */}
            <LanguageSelect language={language} setLanguage={setLanguage} />
            <ThemeToggle />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;