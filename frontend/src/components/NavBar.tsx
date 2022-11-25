import * as React from "react"
import {
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp"
import { Link } from "react-router-dom"
import { styled } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import "../css/navBar.css"

const drawerWidth = 240
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}))
type navBarProps = {
  cartOpened: boolean
  openCart: () => void
  loggedIn: boolean
}
export const NavBar = ({ cartOpened, openCart, loggedIn }: navBarProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const pages = ["Home", "Products", "About"]
  const settingsIn = ["Profile", "Account", "Dashboard", "Logout"]
  const settingsOut = ["Register", "Login"]

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" open={cartOpened}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenUserMenu}
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {loggedIn
              ? settingsIn.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              : settingsOut.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Link
                      key={setting}
                      style={{
                        textDecoration: "none",
                        color: "Black",
                      }}
                      to={`/${setting}`}>
                      {setting}
                    </Link>
                  </MenuItem>
                ))}
          </Menu>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}>
            {pages.map((page) => (
              <Link
                className="link"
                key={page}
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "0.5em",
                }}
                to={page === "Home" ? "/" : `/${page}`}>
                {page}
              </Link>
            ))}
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openCart}
            sx={{ mr: 2 }}>
            <ShoppingCartCheckoutSharpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
