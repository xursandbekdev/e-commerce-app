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
} from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { useAuth } from "../../context/authContext"
import { useTranslation } from "react-i18next" 

const Profile: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [openManageAccount, setOpenManageAccount] = useState(true)
  const [openOrders, setOpenOrders] = useState(true)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <Breadcrumbs aria-label="breadcrumb" className="text-sm hidden sm:flex text-gray-600 dark:text-gray-300">
          <Link underline="hover" color="inherit" href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            {t("home")} {/* Tarjima */}
          </Link>
          <Typography color="text.primary" className="text-gray-900 dark:text-gray-100">
            {t("myAccount")} {/* Tarjima */}
          </Typography>
        </Breadcrumbs>

        <div className="flex items-center gap-4">
          <Typography variant="body2" className="text-gray-600 dark:text-gray-300 hidden sm:block">
            {t("welcomeUser", { username: user.username })} {/* Tarjima */}
          </Typography>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-8">
        <div className="hidden sm:block w-64 flex-shrink-0">
          <List component="nav" className="space-y-2">
            <ListItem onClick={() => setOpenManageAccount(!openManageAccount)} className="px-0 py-2">
              <ListItemText
                primary={t("manageMyAccount")} // Tarjima
                primaryTypographyProps={{ className: "font-medium text-gray-900 dark:text-gray-100" }}
              />
              {openManageAccount ? <ExpandLess className="text-gray-600 dark:text-gray-300" /> : <ExpandMore className="text-gray-600 dark:text-gray-300" />}
            </ListItem>
            <Collapse in={openManageAccount} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className="pl-4 py-1">
                  <ListItemText
                    primary={t("myProfile")} // Tarjima
                    primaryTypographyProps={{ className: "text-red-600 dark:text-red-400 text-sm" }}
                  />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText
                    primary={t("addressBook")} // Tarjima
                    primaryTypographyProps={{ className: "text-gray-600 dark:text-gray-300 text-sm" }}
                  />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText
                    primary={t("myPaymentOptions")} // Tarjima
                    primaryTypographyProps={{ className: "text-gray-600 dark:text-gray-300 text-sm" }}
                  />
                </ListItem>
              </List>
            </Collapse>

            <ListItem onClick={() => setOpenOrders(!openOrders)} className="px-0 py-2">
              <ListItemText
                primary={t("myOrders")} // Tarjima
                primaryTypographyProps={{ className: "font-medium text-gray-900 dark:text-gray-100" }}
              />
              {openOrders ? <ExpandLess className="text-gray-600 dark:text-gray-300" /> : <ExpandMore className="text-gray-600 dark:text-gray-300" />}
            </ListItem>
            <Collapse in={openOrders} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className="pl-4 py-1">
                  <ListItemText
                    primary={t("myReturns")} // Tarjima
                    primaryTypographyProps={{ className: "text-gray-600 dark:text-gray-300 text-sm" }}
                  />
                </ListItem>
                <ListItem className="pl-4 py-1">
                  <ListItemText
                    primary={t("myCancellations")} // Tarjima
                    primaryTypographyProps={{ className: "text-gray-600 dark:text-gray-300 text-sm" }}
                  />
                </ListItem>
              </List>
            </Collapse>

            <ListItem className="px-0 py-2">
              <ListItemText
                primary={t("myWishlist")} // Tarjima
                primaryTypographyProps={{ className: "font-medium text-gray-900 dark:text-gray-100" }}
              />
            </ListItem>
          </List>
        </div>

        <div className="flex-1">
          <Typography variant="h5" className="text-red-600 dark:text-red-400 font-medium mb-6">
            {t("yourProfileInformation")} {/* Tarjima */}
          </Typography>

          <Box className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Typography variant="body2" className="text-gray-700 dark:text-gray-200 mb-2">
                  {t("firstName")} {/* Tarjima */}
                </Typography>
                <TextField
                  fullWidth
                  value={user.username || ""}
                  variant="outlined"
                  size="small"
                  className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  InputProps={{ readOnly: true }}
                />
              </div>
              <div>
                <Typography variant="body2" className="text-gray-700 dark:text-gray-200 mb-2">
                  {t("email")} {/* Tarjima */}
                </Typography>
                <TextField
                  fullWidth
                  value={user.email || ""}
                  variant="outlined"
                  size="small"
                  className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  InputProps={{ readOnly: true }}
                />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Profile
