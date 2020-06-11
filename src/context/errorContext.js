import React, { createContext, useState } from 'react'

export const ErrorContext = createContext();


const ErrorProvider = ({children}) => {
  const [error, setError] = useState({isError: false, message: ''})

  const showError = (obj)=>{
    setError({
      isError: obj.isError,
      message: obj.message
    })
    setTimeout(()=>{
      setError({
        isError: false,
        message: ''
      })
    },3000)
  }

  return (
    <ErrorContext.Provider
    value={{error, showError}}>
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorProvider
