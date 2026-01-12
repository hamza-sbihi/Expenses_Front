import {useEffect, useState} from 'react'
import { coreApi } from '../../api/coreApi';

type Income = {
  id: number;
  description: string;
  date: string;
  amount: number;
  incomeSourceId: number;
  incomeSourceName: string
}

type Source = {
  id: number;
  name: string;
}

type IncomeFormProps = {
    income: Income | null;
    onSubmit: (income: Income) => void;
    onClose: () => void;
}

const IncomeForm = (props: IncomeFormProps) => {

    const emptyIncome: Income = {
        id: 0,
        description: "",
        date: "",
        amount: 0,
        incomeSourceId: 0,
        incomeSourceName: ""
    };  
    const [formData,setFormData] = useState<Income>(props.income? props.income : emptyIncome);
    const [sources,setSources] = useState<Source[]>([]);
    const isEditMode = props.income !== null;

    const fetchData = async() => {
        try{
            const responseSources = await coreApi.incomeSource.getSources();
            setSources(responseSources.data);
        }
        catch(error){
            console.error('Error fetching categories:', error);
        }
    }
    useEffect(() => {
        fetchData();
        if (props.income) {
            setFormData(props.income);
        } else {
            setFormData(emptyIncome);
        }
    }, [props.income]);

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
                 name = "amount"
                 type="number"
                 value={formData?.amount}
                 onChange={(e)=>{
                    setFormData({...formData,amount:e.target.valueAsNumber})
                 }}/>
            </label>
            <label >
                CategoryID:
                <select 
                value={formData?.incomeSourceId}
                onChange={(e)=>{
                    setFormData({...formData,
                        incomeSourceId: Number(e.target.value)
                    })
                }}
                >
                    <option value={""}>Select a category</option>
                    {sources.map((source)=>(
                        <option key = {source.id} value={source.id}>
                            {source.name}
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

export default IncomeForm
