import React, { createContext, useState, useEffect } from 'react'
import { GetAll } from '../commons/Api'

export const UsersContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    GetAll(`users/me`)
      .then(res => setCurrentUser(res))
      .catch(error => console.error(error))
  }, [])

  return (
    <UsersContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContext
