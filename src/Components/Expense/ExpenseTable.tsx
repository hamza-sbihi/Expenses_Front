import {useEffect,useState} from 'react'
import ExpenseForm from './ExpenseForm'
import './ExpenseTable.css'

type Expense = {
  id: number;
  description: string;
  date: string;
  cost: number;
  categoryId: number;
  categoryName: string
}
type ExpenseTableProps = {
    expenses: Expense[];
    onCreate: (expense: Expense) => void;
    onUpdate: (expense: Expense) => void;
    onDelete: (expenseId: number) => void;
}

const ExpenseTable = (props: ExpenseTableProps) => {

    const [showForm,setShowForm] = useState<boolean>(false);
    const [editExpense,setEditExpense] = useState<Expense | null>(null);


    const handleCreate = async (expense:Expense) => {
        //creating the post data object
        props.onCreate(expense);
        setShowForm(false);

    }

    const handleDelete = async (expenseId : number) =>{
        //parents delete handler
        props.onDelete(expenseId);

    }

    const handleUpdate = async (expense:Expense) => {
        //creating the put data object
        props.onUpdate(expense);
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
                {props.expenses.map(expense =>(
                    <tr className='table-row' key = {expense.id}>
                        <td>{expense.id}</td>
                        <td>{expense.description}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>{expense.cost}</td>
                        <td>{expense.categoryName}</td>
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
