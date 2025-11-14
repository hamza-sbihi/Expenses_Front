import {useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './LoginPage.css'
import { authApi } from '../../api/authApi'

const LoginPage = () => {
    const [message,setMessage] = useState<string>('')
    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const navigate = useNavigate();
    const location = useLocation();
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(() =>{
      if(location.state?.fromRegister){
        setMessage('Registration successful! You can now log in.');
      }
    },[])
    const handleSubmit = async (event: React.FormEvent)=>{
      event.preventDefault();
      setLoading(true);
      try{
        
        setLoading(true);
        const response = await authApi.login(username,password);
        setMessage(response.data);
        navigate('/home');
      }
      catch(error:any){
        console.error('Error during login:', error);
        if(error.response && error.response.status === 401){
          setMessage('Invalid credentials. Please try again.');
        }
        else{
          setMessage('An error occurred. Please try again later.');
        }
      }
      finally{
        setLoading(false);
      }

    }
  return (
    <div className = "login-container">
      <div className="login-box">
        <h2>Welcome</h2>
        <form onSubmit={handleSubmit}>          
            <input type="text"
             placeholder='Username'
             value ={username} 
             onChange={(e)=>{
              setUsername(e.target.value)
            }}>
            </input>
          
          <br />
          
            <input type="password"
             placeholder='Password'
             value ={password} 
             onChange={(e)=>{
              setPassword(e.target.value)
            }}>
          </input>        
          <br />
          <button type="submit" disabled={loading}>
            {loading? "loading..":"Login"}</button>
          <button type="button" onClick = {()=>{
            navigate('/register')
          }}> Register </button>
        </form>
        <p>
          { message}
        </p>
      </div>
    </div>
  )
}

export default LoginPage
