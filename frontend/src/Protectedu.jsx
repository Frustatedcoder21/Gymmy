import React from 'react'
import { useSelector } from 'react-redux'
import Usertype from './Usertype'
const Protected = ({children}) => {
    const isLogged=useSelector((state)=>state.auth.isLoggedIn)
    const type=useSelector((state)=>state.auth.type)
  return (
    <div className='w-full h-full'>
      {isLogged && type=="user"?children:<Usertype/>}
    </div>
  )
}

export default Protected
