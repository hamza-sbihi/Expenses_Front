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
        createExpense : async (postData:{description:string, date:string, cost:number, categoryId:number}) =>{
            return await axiosInstance.post(`${BASE_URL}/api/expenses`,postData);
        },
        updateExpense : async (expenseId : number, putData:{description:string, date:string, cost:number, categoryId:number}) =>{
            return await axiosInstance.put(`${BASE_URL}/api/expenses/${expenseId}`,putData);
        },
        deleteExpense : async (expenseId : number) =>{
            return await axiosInstance.delete(`${BASE_URL}/api/expenses/${expenseId}`);
        },
        getTotalExpensePerCategory : async (categoryId : number) =>{
            return await axiosInstance.get(`${BASE_URL}/api/expenses/total/category/${categoryId}`);
        },
        getExpensesByCategory : async (categoryId : number) =>{
            return await axiosInstance.get(`${BASE_URL}/api/expenses/category/${categoryId}`);
        },
        getExpensesByMonth : async (year:number,month:number)=>{
            return await axiosInstance.get(`${BASE_URL}/api/expenses/total/date`,{
                params : {
                    year:year,
                    month:month
                }
            })
        },
        getExpensesByYear : async(year:number)=>{
            return await axiosInstance.get(`${BASE_URL}/api/expenses/total/date/year`,{
                params:{
                    year:year
                }
            })
        }
    },
    income : {
        getIncomes : async () =>{
            return await axiosInstance.get(`${BASE_URL}/api/incomes`);
        },
        createIncome : async (postData:{description:string, date:string, amount:number,incomeSourceId:number}) =>{
            return await axiosInstance.post(`${BASE_URL}/api/incomes`,postData);
        },
        updateIncome : async (incomeId:number,putData:{description:string, date:string, amount:number,incomeSourceId:number}) =>{
            return await axiosInstance.put(`${BASE_URL}/api/incomes/${incomeId}`,putData);
        },
        deleteIncome : async (incomeId:number)=>{
            return axiosInstance.delete(`${BASE_URL}/api/incomes/${incomeId}`);
        },
        getTotalIncomeBySource : async (incomeSourceId:number)=>{
            return axiosInstance.get(`${BASE_URL}/api/incomes/total/source/${incomeSourceId}`);

        },
        getIncomeBySource : async (incomeSourceId:number)=>{
            return axiosInstance.get(`${BASE_URL}/api/incomes/source/${incomeSourceId}`);
        },
        getIncomeByMonth : async(year:number,month:number) =>{
            return axiosInstance.get(`${BASE_URL}/api/incomes/total/date`,{
                params:{
                    year:year,
                    month:month
                }
            })
        },
        getIncomeByYear : async(year:number) =>{
            return axiosInstance.get(`${BASE_URL}/api/incomes/total/date/year`,{
                params:{
                    year:year
                }
            })
        }

    },
    incomeSource : {
        getSources: async() =>{
            return axiosInstance.get(`${BASE_URL}/api/incomes_sources`);
        },
        createSource : async(name:string)=>{
            return axiosInstance.post(`${BASE_URL}/api/incomes_sources`,name);
        },
        updateSource : async(sourceId:number,putData:{name:string})=>{
            return axiosInstance.put(`${BASE_URL}/api/incomes_sources/${sourceId}`,putData);
        },
        deleteSource : async(sourceId:number)=>{
            return axiosInstance.delete(`${BASE_URL}/api/incomes_sources/${sourceId}`);
        }



    }
}
