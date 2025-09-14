"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Breadcrumbs,
  Link,
  // IconButton,
  // Drawer,
} from "@mui/material"
import { ExpandLess, ExpandMore} from "@mui/icons-material"
import { useAuth } from "../../context/authContext"

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [openManageAccount, setOpenManageAccount] = useState(true)
  const [openOrders, setOpenOrders] = useState(true)
  // const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <Breadcrumbs aria-label="breadcrumb" className="text-sm hidden sm:flex">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">My Account</Typography>
        </Breadcrumbs>

        <div className="flex items-center gap-4">
          <Typography variant="body2" className="text-gray-600 hidden sm:block">
            Welcome! <span className="text-red-600 font-medium">{user.username}</span>
          </Typography>

          {/* Mobile Sidebar Toggle */}
          {/* <IconButton
            color="inherit"
            className="sm:hidden"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden sm:block w-64 flex-shrink-0">
          <List component="nav" className="space-y-2">
            <ListItem  onClick={() => setOpenManageAccount(!openManageAccount)} className="px-0 py-2">
              <ListItemText
                primary="Manage My Account"
                primaryTypographyProps={{ className: "font-medium text-gray-900" }}
              />
              {openManageAccount ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openManageAccount} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Profile" primaryTypographyProps={{ className: "text-red-600 text-sm" }} />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="Address Book" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Payment Options" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem  onClick={() => setOpenOrders(!openOrders)} className="px-0 py-2">
              <ListItemText primary="My Orders" primaryTypographyProps={{ className: "font-medium text-gray-900" }} />
              {openOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openOrders} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Returns" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Cancellations" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem className="px-0 py-2">
              <ListItemText primary="My Wishlist" primaryTypographyProps={{ className: "font-medium text-gray-900" }} />
            </ListItem>
          </List>
        </div>

        {/* Mobile Sidebar Drawer */}
        {/* <Drawer
          anchor="left"
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          classes={{ paper: "w-64 p-4" }}
        >
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setMobileSidebarOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div> */}

          {/* <List component="nav" className="space-y-2">
            <ListItem  onClick={() => setOpenManageAccount(!openManageAccount)} className="px-0 py-2">
              <ListItemText
                primary="Manage My Account"
                primaryTypographyProps={{ className: "font-medium text-gray-900" }}
              />
              {openManageAccount ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openManageAccount} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Profile" primaryTypographyProps={{ className: "text-red-600 text-sm" }} />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="Address Book" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Payment Options" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem  onClick={() => setOpenOrders(!openOrders)} className="px-0 py-2">
              <ListItemText primary="My Orders" primaryTypographyProps={{ className: "font-medium text-gray-900" }} />
              {openOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openOrders} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Returns" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText primary="My Cancellations" primaryTypographyProps={{ className: "text-gray-600 text-sm" }} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem className="px-0 py-2">
              <ListItemText primary="My Wishlist" primaryTypographyProps={{ className: "font-medium text-gray-900" }} />
            </ListItem>
          </List> */}
        {/* </Drawer> */}

        {/* Main Info */}
        <div className="flex-1">
          <Typography variant="h5" className="text-red-600 font-medium mb-6">
            Your Profile Information
          </Typography>

          <Box className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Typography variant="body2" className="text-gray-700 mb-2">
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  value={user.username || ""}
                  variant="outlined"
                  size="small"
                  className="bg-gray-50"
                  InputProps={{ readOnly: true }}
                />
              </div>
              <div>
                <Typography variant="body2" className="text-gray-700 mb-2">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  value={user.email || ""}
                  variant="outlined"
                  size="small"
                  className="bg-gray-50"
                  InputProps={{ readOnly: true }}
                />
              </div>
            </div>

            {/* <div className="mt-4">
              <Typography variant="body2" className="text-gray-700 mb-2">
                Address
              </Typography>
              <TextField
                fullWidth
                value={user.address || "Not Provided"}
                variant="outlined"
                size="small"
                className="bg-gray-50"
                InputProps={{ readOnly: true }}
              />
            </div> */}
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Profile
