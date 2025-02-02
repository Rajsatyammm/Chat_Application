import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useThemeStore } from './store/useThemeStore'

function App() {

  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectedRoute component={<Home />} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<ProtectedRoute component={<ProfilePage />} />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
