import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const BASE_URL = 'http://localhost:8080';
type UserObject = {
    username: string;
    password: string;   
}
export const authApi = {
    login : async (username: string,password:string)=>{ 
            const postData = {
                username: username,
                password: password
            }       
                       
        return await axios.post(`${BASE_URL}/user/login`, postData);
    },
    home : async () =>{
        console.log("is this called");
        return await axiosInstance.get(`${BASE_URL}/api/hello`); 
    },
    register : async (userObj : UserObject)=>{
        return await axios.post(`${BASE_URL}/user/register`,userObj);
    }
}