import {useEffect,useState} from 'react'
import IncomeForm from './IncomeForm';
import './IncomeTable.css'
import IncomeModal from './IncomeModal';

type Income = {
  id: number;
  description: string;
  date: string;
  amount: number;
  incomeSourceId: number;
  incomeSourceName: string
}
type IncomeTableProps = {
    incomes: Income[];
    onCreate: (income: Income) => void;
    onUpdate: (income: Income) => void;
    onDelete: (incomeId: number) => void;
}

const 
IncomeTable = (props: IncomeTableProps) => {

    const [showModal,setShowModal] = useState<boolean>(false);
    const [editIncome,setEditIncome] = useState<Income | null>(null);


    const handleCreate = async (income:Income) => {
        //creating the post data object
        props.onCreate(income);
        setShowModal(false);

    }

    const handleDelete = async (incomeId : number) =>{
        //parents delete handler
        props.onDelete(incomeId);

    }

    const handleUpdate = async (income:Income) => {
        //creating the put data object
        props.onUpdate(income);
        setShowModal(false);
        setEditIncome(null);
    }

  return (
    <div>
        <div className = "income-header">
            <h2>Incomes</h2>
            <button onClick={()=>{
                setShowModal(true);
                setEditIncome(null);
            }}>Add Incomes</button>
            {showModal &&
            <IncomeModal
             income={editIncome}
             onSubmit={editIncome? handleUpdate : handleCreate}
             onClose={() => {
                setShowModal(false);
                setEditIncome(null);
             }}/>
            }
        </div>
        <table className='income-table'>
            <thead>
                <tr className='table-row'>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>amount</th>
                    <th>Source</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.incomes.map(income =>(
                    <tr className='table-row' key = {income.id}>
                        <td>{income.id}</td>
                        <td>{income.description}</td>
                        <td>{new Date(income.date).toLocaleDateString()}</td>
                        <td>{income.amount}</td>
                        <td>{income.incomeSourceName}</td>
                        <td className='action-buttons'>
                            <button onClick={() => {
                                setShowModal(true);
                                //to make sure the date input is correctly formatted dd-mm-yyyy
                                setEditIncome({...income,date:new Date(income.date).toISOString().split("T")[0]});
                            }}>Edit</button>
                            <button onClick={() => handleDelete(income.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default IncomeTable
