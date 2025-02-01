import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectedRoute component={<Home />} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<ProtectedRoute component={<ProfilePage />} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
