import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"));
        navigate("/login");
    }
  return (
    <div className = "header-container">
        <h1>Expense Tracker</h1>
        <div className="navbar-navigation">
          <NavLink to="/">Overview</NavLink>
          <NavLink to="/transactions">Transaction</NavLink>
          <NavLink to="/categories">Expenses</NavLink>
          <NavLink to="/incomes">Incomes</NavLink>
          <NavLink to="/aiReview">AI Review</NavLink>
        </div>
        
        <button onClick = {handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
