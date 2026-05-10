import {useEffect } from 'react'
import type { ExpenseFormProps } from './ExpenseForm'
import ExpenseForm from './ExpenseForm'

const ExpenseModal = (props:ExpenseFormProps) => {

    useEffect(()=>{
        console.log("here in Exp modal");
    },[])

  return (
    <div className='modal-backdrop'>
        <ExpenseForm {...props}/>
    </div>
  )
}


export default ExpenseModal
