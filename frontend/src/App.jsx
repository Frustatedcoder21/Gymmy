import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router'
import Allpages from './Allpages'
import Userauth from './user/Userauth'
import Adminauth from './admin/Adminauth'
import Usertype from './Usertype'
import Userlanding from './user/Userlanding'
import Protectedu from './Protectedu'
import Protecta from './Protecta'
import Adminlanding from './admin/Adminlanding'
const App = () => {
  return (
    <div className='w-screen h-screen   '>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<div className='w-full h-full'> <Allpages /> </div>} />
        <Route path='/user/login' element={<div className='w-full h-full'><Userauth /></div>} />
        <Route path='/admin/login' element={<div className='w-full h-full'><Adminauth /></div>} />
        <Route path='/user-type' element={<div className='w-full h-full'><Usertype /></div>} />
        <Route path='/user/landing' element={<div className='w-full h-full'><Protectedu><Userlanding /></Protectedu></div>} />
        <Route path='/admin/landing' element={<div className='w-full h-full'><Protecta><Adminlanding /></Protecta></div>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
