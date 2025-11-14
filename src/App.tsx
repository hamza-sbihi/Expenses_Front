import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element = {<HomePage/>} />
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/register" element = {<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
