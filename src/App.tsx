import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import { ProtectedRoute } from './route/ProtectedRoute'
import MainLayout from './layout/MainLayout'
import Transactions from './pages/Transactions/Transactions'
import Categories from './pages/Categories/Categories'
import Dashboard from './pages/Overview/Dashboard'

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/register" element = {<RegisterPage/>}/>
        <Route element = {<ProtectedRoute />}>
          <Route element = {<MainLayout />}>
            <Route path="/" element = {<Dashboard/>}/>
            <Route path="/transactions" element = {<Transactions/>}/>
            <Route path="/categories" element = {<Categories/>}/>
            <Route path="/incomes" />
            <Route path="/aiReview" />
          </Route>
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
