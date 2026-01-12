import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router';
import { coreApi } from '../../api/coreApi';
import IncomeTable from '../../Components/Income/IncomeTable';

type Income = {
  id: number;
  description: string;
  date: string;
  amount: number;
  incomeSourceId: number;
  incomeSourceName: string;
}

const SourcesDetails = () => {

    const {id} = useParams();
    const [incomes,setIncomes] = useState<Income[]>([]);
    
    const fetchData = async() =>{
        try{
            console.log(id);
            console.log("heeere");
            const responseIncomes = await coreApi.income.getIncomeBySource(Number(id));
            setIncomes(responseIncomes.data); 
            console.log("here  "+responseIncomes);
        }
        catch(error){
            console.error('Error fetching incomes:', error);
        }
    }

    useEffect(() =>{
             
        fetchData();

    },[])

    const handleCreate = async (income:Income) => {
        //creating the post data object
        const postData = {
            description: income.description,
            date: income.date,
            amount: income.amount,
            incomeSourceId: income.incomeSourceId
        }
        try{
            const created = await coreApi.income.createIncome(postData);
            if(created.data.incomeSourceId === Number(id)){
            setIncomes([...incomes, created.data]);
            }
        }
        catch(error){
            console.error('Error creating income:', error);
        }
    }

    const handleDelete = async (incomeId : number) =>{

        try{
            await coreApi.income.deleteIncome(incomeId);
            //filtering the deleted expense from the list
            setIncomes(incomes.filter(income=>income.id !== incomeId));
        }
        catch(error){
            console.error('Error Deleting income:',error);
        }

    }

    const handleUpdate = async (income:Income) => {
        //creating the put data object
        const putData = {
            description: income.description,
            date: income.date,
            amount: income.amount,
            incomeSourceId: income.incomeSourceId
        }
        try{
            const updated = await coreApi.income.updateIncome(income.id,putData);
            if(updated.data.incomeSourceId !== Number(id)){
                //if category changed, remove from current list
                setIncomes(incomes.filter(inc => inc.id !== income.id));
            }
            else {
                setIncomes(incomes.map(inc => inc.id === income.id ? updated.data : inc));

            }
        }
        catch(error){
            console.error('Error updating income:', error);
        }

    }

  return (
    <div>
        <IncomeTable
         incomes = {incomes} 
         onCreate={handleCreate} 
         onUpdate={handleUpdate} 
         onDelete={handleDelete}/>
    </div>
  )
}

export default SourcesDetails
