import {useState,useEffect} from 'react'
import axios from 'axios'

const HomePage = () => {
    const [message,SetMessage] = useState<string>('')
    const [username,SetUsername] = useState<string>('')
    const [password,SetPassword] = useState<string>('')

    useEffect(() =>{
      
    },[])
    const handleSubmit = async (event: React.FormEvent)=>{
      event.preventDefault();
      const instance = axios.create({
        auth: {
          username,
          password
        }
    });
        instance.get<string>('http://localhost:8080/api/hello')
        .then((response : {data:string}) => SetMessage(response.data))
        .catch((error : any) => console.error('Error fetching data:', error));
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label >Username 
          <input type="text" value ={username} onChange={(e)=>{
            SetUsername(e.target.value)
          }}>

          </input>
        </label>
        <br />
        <label >Password 
          <input type="password" value ={password} onChange={(e)=>{
            SetPassword(e.target.value)
          }}>

          </input>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>{message}</h1>
    </div>
  )
}

export default HomePage
