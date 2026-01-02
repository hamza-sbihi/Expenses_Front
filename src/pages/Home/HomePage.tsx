import {useEffect} from 'react'
import CategoryTable from '../../Components/Category/CategoryTable'
import ExpenseTable from '../../Components/Expense/ExpenseTable'
import Navbar from '../../Components/Navbar/Navbar'
import './HomePage.css'


const HomePage = () => {

  useEffect(() =>{
  
    
  },[])

  return (
    <div>
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
