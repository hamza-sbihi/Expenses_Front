import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterPage.css'
import { authApi } from '../../api/authApi';

const RegisterPage = () => {
    const [message,setMessage] = useState<string>('')
    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const navigate = useNavigate();
    const [loading,setLoading] = useState<boolean>(false);



    useEffect(() =>{
      
    },[])
    const handleSubmit = async (event: React.FormEvent)=>{
      const userObject = {
      username: username,
      password: password
      }
      event.preventDefault();
      setLoading(true);
      try{
        await authApi.register(userObject);
        setMessage('Registration successful! You can now log in.');
        navigate('/login',{state: { fromRegister: true }});
      }
      catch(error:any){
        console.error('Error during login:', error);
        setMessage('An error occurred. Please try again later.');        
      }
      finally{
        setLoading(false);
      }
    }

  return (
    <div>
      <div className="login-box">
        <h2>Registration</h2>
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
            {loading? "loading..":"Register"}</button>
        </form>
        <p>
          {message}
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
