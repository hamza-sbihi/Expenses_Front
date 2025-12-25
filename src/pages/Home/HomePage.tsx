import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/authApi';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    navigate("/login");
  }

  return (
    <div>
      <p>this is Home</p>
      <button onClick = {handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage
