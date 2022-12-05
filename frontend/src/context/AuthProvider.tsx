import React, { createContext, useState } from "react"
export type AuthContextType = {
  user: string
  pwd: string
  accessToken: any
}
export type ContextType = {
  auth: AuthContextType
  setAuth: (ac: AuthContextType) => void
}

export const AuthContext = createContext<ContextType>({} as ContextType)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextType>({} as AuthContextType)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
