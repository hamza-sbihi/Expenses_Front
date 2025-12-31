import {useEffect, useState} from 'react'
import { coreApi } from '../../../api/coreApi';

type Expense = {
  id: number;
  description: string;
  date: string;
  cost: number;
  category: {id:number};
}

type Category = {
  id: number;
  name: string;
}

type ExpenseFormProps = {
    expense: Expense | null;
    onSubmit: (expense: Expense) => void;
    onClose: () => void;
}

const ExpenseForm = (props: ExpenseFormProps) => {

    const emptyExpense: Expense = {
        id: 0,
        description: "",
        date: "",
        cost: 0,
        category: { id: 0 }
    };  
    const [formData,setFormData] = useState<Expense>(props.expense? props.expense : emptyExpense);
    const [categories,setCategories] = useState<Category[]>([]);
    const isEditMode = props.expense !== null;

    const fetchData = async() => {
        try{
            const responseCategories = await coreApi.category.getCategories();
            setCategories(responseCategories.data);
        }
        catch(error){
            console.error('Error fetching categories:', error);
        }
    }
    useEffect(() => {
        fetchData();
        if (props.expense) {
            setFormData(props.expense);
        } else {
            setFormData(emptyExpense);
        }
    }, [props.expense]);

  return (
    <div>
        <form onSubmit={(e)=>
        {e.preventDefault();
         props.onSubmit(formData)}}>
            <label >
                Description:
                <input 
                 name = "description"
                 type="text"
                 value = {formData?.description}
                 onChange = {(e) =>{
                    setFormData({...formData,
                        description : e.target.value
                    })
                 }}/>
            </label>
            <label>
                Date:
                <input 
                 name = "date"
                 type="date"
                 value={formData?.date}
                 onChange = {(e)=>{
                    setFormData({...formData,
                        date : e.target.value
                    })
                 }}/>
            </label>
            <label >
                Cost:
                <input 
                 name = "cost"
                 type="number"
                 value={formData?.cost}
                 onChange={(e)=>{
                    setFormData({...formData,cost:e.target.valueAsNumber})
                 }}/>
            </label>
            <label >
                CategoryID:
                <select 
                value={formData?.category?.id}
                onChange={(e)=>{
                    setFormData({...formData,
                        category: {id: Number(e.target.value)}
                    })
                }}
                >
                    <option value={""}>Select a category</option>
                    {categories.map((category)=>(
                        <option key = {category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}

                </select>
            </label>
            <button  type="submit">
                {isEditMode ? 'Update' : 'Create'}
                </button>
            <button onClick = {props.onClose}>close</button>
        </form>
      
    </div>
  )
}

export default ExpenseForm
