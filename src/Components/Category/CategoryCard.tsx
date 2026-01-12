import React, { use, useEffect } from 'react'
import './CategoryCard.css'
import { coreApi } from '../../api/coreApi';
import { useNavigate } from 'react-router-dom';

type category = {
    id: number;
    name: string;
}

type CategoryCardProps = {
    category:category
    OnDelete: (categoryId:number) => void;
    OnUpdate: (cate:category) => void;
}

const CategoryCard = (props: CategoryCardProps) => {
    const [totalExpense,setTotalExpense] = React.useState<number>(0);
    const navigate = useNavigate();

    const fetchTotalExpense = async() =>{
        try{
            const response = await coreApi.expense.getTotalExpensePerCategory(props.category.id);
            setTotalExpense(response.data);
        }
        catch(error){
            console.error('Error fetching total expense for category:', error);
        }
    }
    useEffect(() =>{
        fetchTotalExpense();
    },[])
    console.log(totalExpense);

  return (
    <div className="category-card" onClick={()=>{navigate(`/categories/${props.category.id}`)}}>
      <div className="card-header">
        <h3 className="category-name">{props.category.name}</h3>
        <h3 className="category-name">{totalExpense}DH</h3>

      </div>
      <div className='action-buttons'>
        <button onClick={(e) =>{
          e.stopPropagation();
          props.OnDelete(props.category.id)}}>Delete</button>
        <button onClick={(e) =>{ 
          e.stopPropagation();
          props.OnUpdate(props.category)}}>Update</button>
      </div>
     
    </div>
  )
}

export default CategoryCard
