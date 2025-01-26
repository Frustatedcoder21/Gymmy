import React from 'react'
import Usertype from './Usertype'
import { useSelector } from 'react-redux'
const Protecta = ({children}) => {
  const isLogged=useSelector((state)=>state.auth.isLoggedIn)
    const type=useSelector((state)=>state.auth.type)
  return (
    <div className='w-full h-full'>
      {isLogged&& type=="admin"?children:<Usertype/>}
    </div>
  )
}

export default Protecta
