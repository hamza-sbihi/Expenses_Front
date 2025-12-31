import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const BASE_URL = 'http://localhost:8080';


export const coreApi =  {

    category : {
        getCategories : async () =>{
            return await axiosInstance.get(`${BASE_URL}/api/categories`);
        },
        createCategory : async (postData:{name: string}) =>{
        
            return await axiosInstance.post(`${BASE_URL}/api/categories`,postData);
        },
        deleteCategory : async (categoryId : number) =>{
            return await axiosInstance.delete(`${BASE_URL}/api/categories/${categoryId}`);
        },
        updateCategory : async (categoryId : number, putData:{name:string}) =>{
            return await axiosInstance.put(`${BASE_URL}/api/categories/${categoryId}`,putData);
        }
    },
    expense : {
        getExpenses : async () =>{
            return await axiosInstance.get(`${BASE_URL}/api/expenses`);
        },
        createExpense : async (postData:{description:string, date:string, cost:number, category:{id:number}}) =>{
            return await axiosInstance.post(`${BASE_URL}/api/expenses`,postData);
        },
        updateExpense : async (expenseId : number, putData:{description:string, date:string, cost:number, category:{id:number}}) =>{
            return await axiosInstance.put(`${BASE_URL}/api/expenses/${expenseId}`,putData);
        },
        deleteExpense : async (expenseId : number) =>{
            return await axiosInstance.delete(`${BASE_URL}/api/expenses/${expenseId}`);
        }

    }
}
