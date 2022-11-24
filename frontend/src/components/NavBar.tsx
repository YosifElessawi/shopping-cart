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
}
export const NavBar = ({ cartOpened, openCart }: navBarProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const pages = ["Home", "Products", "About", "Login"]
  const settings = ["Profile", "Account", "Dashboard", "Logout"]

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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
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
