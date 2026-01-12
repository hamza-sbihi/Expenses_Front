import {useState,useEffect} from 'react'
import './Dashboard.css'
import { matchPath, useNavigate } from 'react-router-dom'
import { coreApi } from '../../api/coreApi'

const Dashboard = () => {

  const navigate = useNavigate();
  const [totalIncome,SetTotalIncome] = useState<number>(0);
  const [totalExpense,setTotalExpense] = useState<number>(0);

  const fetchdata = async(year:number,month:number)=>{
    
    try{
      const responseExpense =  await coreApi.expense.getExpensesByMonth(year,month);
      console.log(responseExpense.data);
      setTotalExpense(responseExpense.data);
      const responseIncome = await coreApi.income.getIncomeByMonth(year,month);
      console.log(responseIncome.data);
      SetTotalIncome(responseIncome.data);
    }
    catch(error){
      console.error("error while getting income and expense by date")
    }
  }
  useEffect(()=> {

    getThisMonth();

  },[])

  const getThisMonth = ()=>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    fetchdata(year,month);

  }
  const getLastMonth = ()=> {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    if(month === 1 ){
      month = 12;
      year = year-1;
    }
    else{
      month = month-1;
    }
    fetchdata(year,month);
  }
  const getByYear =async()=>{
    const now = new Date();
    const year = now.getFullYear();
    try{
      const responseExpense =  await coreApi.expense.getExpensesByYear(year);
      console.log(responseExpense.data);
      setTotalExpense(responseExpense.data);
      const responseIncome = await coreApi.income.getIncomeByYear(year);
      console.log(responseIncome.data);
      SetTotalIncome(responseIncome.data);
    }
    catch(error){
      console.error("error while getting income and expense by year")
    }
  }

  return (
    <div>
      <div className='dashboard-header'>
        <h2>Good Morning username</h2>
        <div className="header-actions">
          <button onClick = {getThisMonth}>this month</button>
          <button onClick = {getLastMonth}>last month</button>
          <button onClick = {getByYear}>this year</button>
          <button>select period</button>
        </div>
      </div>
      <div className = 'dashboard-content'>
        {/* First Row */}
          <div className = 'dashboard-content-row1'>
            <button onClick={()=>{
              navigate('/categories')
            }}>add</button>
            <p>here will add expense</p>
          </div>
          <div className = 'dashboard-content-row1'>
            <button onClick={()=>{
              navigate('/incomes')
            }}>add</button>
            <p>here will add income</p>
          </div>
          <div className = 'dashboard-content-row1'>
            <p>here will get AI review</p>
          </div>
        
        {/* Second Row */}
          <div className = 'dashboard-content-row2'>
            <p>balance</p>
            <p>{totalIncome-totalExpense}DH</p>
          </div>
          <div className = 'dashboard-content-row2'>
            <p>income</p>
            <p>{totalIncome}DH</p>
          </div>
          <div className = 'dashboard-content-row2'>
            <p>expense</p>
            <p>{totalExpense}DH</p>
          </div>
        
        {/* Third Row */}
          <div className="chart">
            <p>here will add chart</p>
          </div>
          <div className="round-chart">
            <p>here will add round chart</p>
          </div>

        {/*fourth Row*/}
          <div className="latest-Transactions">
              <p>here will have latest transaction table</p>
          </div>
        
      </div>
    </div>
  )
}

export default Dashboard
