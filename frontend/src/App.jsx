import React from 'react'
import Admin from './Pages/Admin'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import CreateFood from './Pages/CreateFood'
import EditFood from './Pages/EditFood'
import DeleteFood from './Pages/DeleteFood'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AdminNavbar from './Pages/AdminNavbar'
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import Footer from './Pages/Footer'
import Cart from './Pages/Cart'
import Success from './Pages/Success'
import Cancel from './Pages/Cancel'


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>

      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart" element={<Register />} />
        <Route
          path='/admin/*'
          element={

            <ProtectedRoute>

              <AdminRoutes />

            </ProtectedRoute>

          }
        />

      </Routes>
      <Footer />

    </>
  )
}

//Admin routes

const AdminRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/food/create' element={<CreateFood />} />
      <Route path='/food/edit/:id' element={<EditFood />} />
      <Route path='/food/delete/:id' element={<DeleteFood />} />
    </Routes>
  )

}

export default App