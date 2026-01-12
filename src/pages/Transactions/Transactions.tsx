import {useState,useEffect} from 'react'
import ExpenseTable from '../../Components/Expense/ExpenseTable'
import { coreApi } from '../../api/coreApi'


type Expense = {
  id: number;
  description: string;
  date: string;
  cost: number;
  categoryId: number;
  categoryName: string;
}


const Transactions = () => {
    const [expenses,setExpenses] = useState<Expense[]>([]);

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
            categoryId: expense.categoryId

        }
        try{
            const created = await coreApi.expense.createExpense(postData);
            setExpenses([...expenses, created.data]);
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
                categoryId: expense.categoryId
            }
            try{
                const updated = await coreApi.expense.updateExpense(expense.id, putData);
                setExpenses(expenses.map(exp => exp.id === expense.id ? updated.data : exp));
            }
            catch(error){
                console.error('Error updating expense:', error);
            }
            
    }
  
  return (
    <div>
      <h1>Transactions Page</h1>
      <ExpenseTable 
      expenses={expenses} 
      onCreate={handleCreate} 
      onUpdate={handleUpdate} 
      onDelete={handleDelete} />

    </div>
  )
}

export default Transactions
