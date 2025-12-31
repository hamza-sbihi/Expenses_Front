import { useNavigate } from "react-router-dom";
import './Header.css'


const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"));
        navigate("/login");
    }
  return (
    <div className = "header-container">
        <h1>Expense Tracker</h1>
        <button onClick = {handleLogout}>Logout</button>
    </div>
  )
}

export default Header
