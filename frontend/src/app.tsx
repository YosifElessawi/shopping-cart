import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Products } from "./pages/Products"
import { Login } from "./pages/Login"
import { NavBar } from "./components/NavBar"
import { Register } from "./pages/Register"
import { Cart } from "./components/Cart"
import Box from "@mui/material/Box"
import React, { useState } from "react"

export function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [cartOpened, setcartOpended] = useState(false)
  const handleDrawerOpen = () => {
    setcartOpended(true)
  }

  const handleDrawerClose = () => {
    setcartOpended(false)
  }
  const handleLoggedIn = () => {
    setLoggedIn(true)
  }

  const handleLoggedOut = () => {
    setLoggedIn(false)
  }
  return (
    <Box>
      <NavBar
        cartOpened={cartOpened}
        openCart={handleDrawerOpen}
        loggedIn={loggedIn}
      />
      <Cart cartOpened={cartOpened} closeCart={handleDrawerClose} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#6EC0DE",
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Box>
  )
}
