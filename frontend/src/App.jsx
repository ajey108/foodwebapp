import React from 'react'
import Admin from './Pages/Admin'
import { Routes,Route,useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <>

    <Routes>
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

const AdminRoutes =()=>{

  return(
    <Routes>
      <Route path='/' element={<Admin/>}/>
    </Routes>
  )

}

export default App