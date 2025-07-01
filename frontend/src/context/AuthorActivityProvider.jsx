import React, { createContext, useContext } from 'react'

const AuthorContext=createContext();

export const AuthorActivityProvider = ({children}) => {

    

  return (
    <AuthorContext.Provider value={{}}>
       {children}
    </AuthorContext.Provider>
  )
}

export const authorActivity=()=>useContext(AuthorContext)
