import React from 'react'
import Admin from './Pages/Admin'
import { Routes,Route,useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import CreateFood from './Pages/CreateFood'
import EditFood from './Pages/EditFood'
import DeleteFood from './Pages/DeleteFood'
import Logout from './Pages/Logout'
import Login from './Pages/Login'
import Register from './Pages/Register'


const App = () => {
  return (
    <>

    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route
      path='/admin/*'
      element={

      <ProtectedRoute>

        <AdminRoutes/>
      </ProtectedRoute>
    
    
    
    }
      />

    </Routes>

    <ProtectedRoute/>
    
   
    
    </>
  )
}

//Admin routes

const AdminRoutes =()=>{

  return(
    <Routes>
      <Route path='/' element={<Admin/>}/>
      <Route path='/food/create' element={<CreateFood/>}/>
      <Route path='/food/edit/:id' element={<EditFood/>}/>
      <Route path='/food/delete/:id' element={<DeleteFood/>}/>
    </Routes>
  )

}

export default App