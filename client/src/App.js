import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import AllBooks from './pages/AllBooks'


import SingleBook from './pages/SingleBook'



import NewBook from './pages/admin/NewBook'

import EditBook from './pages/admin/EditBook'
import AdminBooks from './pages/admin/AdminBooks'
import AdminUsers from './pages/admin/AdminUsers'


//Autentifikacijos komponentai


import Login from './pages/Login'
import Register from './pages/Register'

//Kontekstas
import MainContext from './context/MainContext'

//Baziniai komponentai
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
import './App.css';

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
    .then(resp => {
      setUserInfo(resp.data)
    })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
          {userInfo.role === 1 &&
          <Route path="/admin">
            <Route path="/admin/books/new" element={<NewBook />} />
            
            <Route path="/admin/edit/:id" element={<EditBook />} />
            <Route path="/admin/books" element={<AdminBooks />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            </Route>
  
          }
            <Route path="" element={<AllBooks />} />


             <Route path="books/single/:id" element={<SingleBook />} />
             



            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /> 
            
            <Route path="*" element={<Login />} /> 
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App