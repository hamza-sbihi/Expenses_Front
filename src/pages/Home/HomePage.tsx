import {useState,useEffect} from 'react'
import CategoryTable from './Category/CategoryTable'
import ExpenseTable from './Expense/ExpenseTable'
import Header from './Header'
import './HomePage.css'


const HomePage = () => {

  useEffect(() =>{
  
    
  },[])

  return (
    <div>
      <header className="header">
        <Header />
      </header>
      <div className="main-content">
        <div className="category">
          <CategoryTable />
        </div>
        <div className="expenses">
          <ExpenseTable />
        </div>
      </div>      
    </div>
  )
}

export default HomePage
