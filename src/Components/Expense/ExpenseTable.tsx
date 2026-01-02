import {useEffect,useState} from 'react'
import { coreApi } from '../../api/coreApi'
import ExpenseForm from './ExpenseForm'
import './ExpenseTable.css'

type Expense = {
  id: number;
  description: string;
  date: string;
  cost: number;
  category: {id:number};
}

const ExpenseTable = () => {

    const [expenses,setExpenses] = useState<Expense[]>([]);
    const [showForm,setShowForm] = useState<boolean>(false);
    const [editExpense,setEditExpense] = useState<Expense | null>(null);

    const fetchData = async() =>{
        try{
            const responseExpenses = await coreApi.expense.getExpenses();
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
            setExpenses([...expenses, created.data]);
        }
        catch(error){
            console.error('Error creating expense:', error);
        }
        setShowForm(false);
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
            setExpenses(expenses.map(exp => exp.id === expense.id ? updated.data : exp));
        }
        catch(error){
            console.error('Error updating expense:', error);
        }
        setShowForm(false);
        setEditExpense(null);
    }

  return (
    <div>
        <div className = "expense-header">
            <h2>Expenses</h2>
            <button onClick={()=>{
                setShowForm(true);
                setEditExpense(null);
            }}>Add Expense</button>
            {showForm &&
            <ExpenseForm
             expense={editExpense}
             onSubmit={editExpense? handleUpdate : handleCreate}
             onClose={() => {
                setShowForm(false);
                setEditExpense(null);
             }}/>
            }
        </div>
        <table className='expense-table'>
            <thead>
                <tr className='table-row'>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Cost</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense =>(
                    <tr className='table-row' key = {expense.id}>
                        <td>{expense.id}</td>
                        <td>{expense.description}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>{expense.cost}</td>
                        <td>{expense.category.id}</td>
                        <td className='action-buttons'>
                            <button onClick={() => {
                                setShowForm(true);
                                //to make sure the date input is correctly formatted dd-mm-yyyy
                                setEditExpense({...expense,date:new Date(expense.date).toISOString().split("T")[0]});
                            }}>Edit</button>
                            <button onClick={() => handleDelete(expense.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ExpenseTable
