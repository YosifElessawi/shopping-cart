import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
