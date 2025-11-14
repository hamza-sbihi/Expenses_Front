import axios from "axios";

const BASE_URL = 'http://localhost:8080';
type UserObject = {
    username: string;
    password: string;   
}
export const authApi = {
    login : async (username: string,password:string)=>{        
            const instance = axios.create({
                auth: {
                    username,
                    password
                }
            })            
        return await instance.get(`${BASE_URL}/api/hello`);
    },
    register : async (userObj : UserObject)=>{
        return await axios.post(`${BASE_URL}/api/register`,userObj);
    }
}