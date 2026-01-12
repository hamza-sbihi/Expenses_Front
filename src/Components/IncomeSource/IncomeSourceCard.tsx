import React, { use, useEffect } from 'react'
import { coreApi } from '../../api/coreApi';
import { useNavigate } from 'react-router-dom';
import './IncomeSourceCard.css'

type source = {
    id: number;
    name: string;
}

type IncomeSourceCardProps = {
    source:source
    OnDelete: (sourceId:number) => void;
    OnUpdate: (cate:source) => void;
}

const IncomeSourceCard = (props: IncomeSourceCardProps) => {
    const [totalIncome,setTotalIncome] = React.useState<number>(0);
    const navigate = useNavigate();

    const fetchTotalIncome = async() =>{
        try{
            const response = await coreApi.income.getTotalIncomeBySource(props.source.id);
            setTotalIncome(response.data);
        }
        catch(error){
            console.error('Error fetching total expense for category:', error);
        }
    }
    useEffect(() =>{
        fetchTotalIncome();
    },[])
    console.log(totalIncome);

  return (
    <div className="source-card" onClick={()=>{navigate(`/incomes/${props.source.id}`)}}>
      <div className="card-header">
        <h3 className="source-name">{props.source.name}</h3>
        <h3 className="source-name">{totalIncome}DH</h3>

      </div>
      <div className='action-buttons'>
        <button onClick={(e) =>{
          e.stopPropagation();
          props.OnDelete(props.source.id)}}>Delete</button>
        <button onClick={(e) =>{ 
          e.stopPropagation();
          props.OnUpdate(props.source)}}>Update</button>
      </div>
     
    </div>
  )
}

export default IncomeSourceCard
