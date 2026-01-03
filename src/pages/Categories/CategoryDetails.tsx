import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router';
import { coreApi } from '../../api/coreApi';
import ExpenseTable from '../../Components/Expense/ExpenseTable';

type Expense = {
  id: number;
  description: string;
  date: string;
  cost: number;
  category: {id:number};
}

const CategoryDetails = () => {

    const {id} = useParams();
    const [expenses,setExpenses] = useState<Expense[]>([]);
    
    const fetchData = async() =>{
        try{
            const responseExpenses = await coreApi.expense.getExpensesByCategory(Number(id));
            setExpenses(responseExpenses.data); 
        }
        catch(error){
            console.error('Error fetching expenses:', error);
        }
    }

    useEffect(() =>{
             
        fetchData();

    },[])

    const handleCreate = async (expense:Expense) => {
        //creating the post data object
        const postData = {
            description: expense.description,
            date: expense.date,
            cost: expense.cost,
            category: {id: expense.category.id}
        }
        try{
            const created = await coreApi.expense.createExpense(postData);
            if(created.data.category.id === Number(id)){
            setExpenses([...expenses, created.data]);
            }
        }
        catch(error){
            console.error('Error creating expense:', error);
        }
    }

    const handleDelete = async (expenseId : number) =>{

        try{
            await coreApi.expense.deleteExpense(expenseId);
            //filtering the deleted expense from the list
            setExpenses(expenses.filter(expense=>expense.id !== expenseId));
        }
        catch(error){
            console.error('Error Deleting expense:',error);
        }

    }

    const handleUpdate = async (expense:Expense) => {
        //creating the put data object
        const putData = {
            description: expense.description,
            date: expense.date,
            cost: expense.cost,
            category: {id: expense.category.id}
        }
        try{
            const updated = await coreApi.expense.updateExpense(expense.id, putData);
            if(updated.data.category.id !== Number(id)){
                //if category changed, remove from current list
                setExpenses(expenses.filter(exp => exp.id !== expense.id));
            }
            else {
                setExpenses(expenses.map(exp => exp.id === expense.id ? updated.data : exp));

            }
        }
        catch(error){
            console.error('Error updating expense:', error);
        }

    }

  return (
    <div>
        <ExpenseTable
         expenses = {expenses} 
         onCreate={handleCreate} 
         onUpdate={handleUpdate} 
         onDelete={handleDelete}/>
    </div>
  )
}

export default CategoryDetails
