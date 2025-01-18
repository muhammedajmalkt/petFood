import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectAdmin = ({children}) => {
    const {isAdminLogin}= useSelector((state)   => state.auth)
    if(!isAdminLogin){
        return <Navigate to="/login" replace={true} />
    }

  return children
}

export default ProtectAdmin