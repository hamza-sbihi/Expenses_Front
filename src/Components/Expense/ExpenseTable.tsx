import {useEffect,useState} from 'react'
import './ExpenseTable.css'
import ExpenseModal from './ExpenseModal';

type Expense = {
  id: number;
  description: string;
  date: string;
  cost: number;
  categoryId: number | undefined;
  categoryName: string |undefined
}
type Category = {
  id: number;
  name: string;
}
type ExpenseTableProps = {
    expenses: Expense[];
    onCreate: (expense: Expense) => void;
    onUpdate: (expense: Expense) => void;
    onDelete: (expenseId: number) => void;
    expCategory?:Category ;
}


const ExpenseTable = (props: ExpenseTableProps) => {

    const [showModal,setShowModal] = useState<boolean>(false);
    const [editExpense,setEditExpense] = useState<Expense | null>(null);

    const handleCreate = async (expense:Expense) => {
        //creating the post data object
        props.onCreate(expense);
        setShowModal(false);

    }

    const handleDelete = async (expenseId : number) =>{
        //parents delete handler
        props.onDelete(expenseId);

    }

    const handleUpdate = async (expense:Expense) => {
        //creating the put data object
        props.onUpdate(expense);
        setShowModal(false);
        setEditExpense(null);
    }

  return (
    <div>
        <div className = "expense-header">
            <h2>Expenses</h2>
            <button onClick={()=>{
                setShowModal(true);
                setEditExpense(null);
            }}>Add Expense</button>
            {showModal &&
            <ExpenseModal
             expense={editExpense}
             onSubmit={editExpense? handleUpdate : handleCreate}
             onClose={() => {
                setShowModal(false);
                setEditExpense(null);
             }}
             category={props.expCategory}
             />
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
                                setShowModal(true);
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
