import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import { Routes,Route } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url="https://food-del-backend-8jq0.onrender.com";
  
  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <hr/>
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path="/add" element={<Add url={url} />} /> 
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url}  />}/>
        </Routes>

      </div>
      
    </div>
  )
}

export default App