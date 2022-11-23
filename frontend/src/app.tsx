import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Products } from "./pages/Products"
import { Login } from "./pages/Login"
import { NavBar } from "./components/NavBar"
import { Cart } from "./components/Cart"
import Box from "@mui/material/Box"
import React from "react"

export function App() {
  const [cartOpened, setcartOpended] = React.useState(false)
  const handleDrawerOpen = () => {
    setcartOpended(true)
  }

  const handleDrawerClose = () => {
    setcartOpended(false)
  }
  return (
    <Box>
      <NavBar cartOpened={cartOpened} openCart={handleDrawerOpen} />
      <Cart cartOpened={cartOpened} closeCart={handleDrawerClose} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  )
}
