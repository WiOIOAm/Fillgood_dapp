import React, { useContext, useEffect, useState } from "react"
import { getProvider } from "../libs/provider"
import { logout } from "../utils/logout"
import { useWeb3 } from "./Web3Context"

export const UserContext = React.createContext([])

export const UserProvider = ({ children }) => {
  const { setWeb3 } = useWeb3()
  const [user, setUser] = useState(localStorage.getItem("user"))

  const handleUserOnPageLoad = async () => {
    const provider = await getProvider()
    const accounts = await provider.request({ method: "eth_accounts" })
    console.log("accounts", accounts)
    // If user wallet is no longer connected, logout
    if (!accounts[0] && user) {
      logout(setWeb3, setUser)
    }
    // Set user in localStorage, or clear localStorage if no wallet connected
    accounts[0]
      ? localStorage.setItem("user", accounts[0])
      : localStorage.removeItem("user")
    setUser(accounts[0])
  }

  const value = React.useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  )

  useEffect(() => {
    handleUserOnPageLoad()
  }, [])

  return (
    <UserContext.Provider value={{ ...value }}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
