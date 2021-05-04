import { createContext, useEffect, useState, useContext } from 'react'
import { firebaseInstance } from '../config/firebase'
import nookies from 'nookies'
import React from 'react'
const AuthContext = createContext({ user: null })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  //if there is a user and its not loading
  const isAuthenticated = user !== null && !loading
  useEffect(() => {
    return firebaseInstance.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', null, { path: '/' })
      } else {
        const token = user.getIdToken()
        setUser(user)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
      setLoading(false)
    })
  })

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseInstance.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    return clearInterval(handle)
  })

  return (
    //double {{}} when passing multiple values
    <AuthContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
