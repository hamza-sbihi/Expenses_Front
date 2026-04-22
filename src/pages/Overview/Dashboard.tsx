import {useState,useEffect} from 'react'
import './Dashboard.css'
import { matchPath, useNavigate } from 'react-router-dom'
import { coreApi } from '../../api/coreApi';
import DonutChart from './Charts/DonutChart';
import HistoChart from './Charts/HistoChart';

interface donutChartData {
    label : string;
    value : number
}
type histoData = {
    period : string,
    income : number,
    expense : number
}

const Dashboard = () => {

  const navigate = useNavigate();
  const [totalIncome,SetTotalIncome] = useState<number>(0);
  const [totalExpense,setTotalExpense] = useState<number>(0);
  const [expensesDonut,setExpensesDonut] = useState<donutChartData[]>([]);

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
  const getExpenseDonut = async(startDate:string,endDate:string)=>{
    try{
      const responseExpenseDonut = await coreApi.stats.getExpensesDonut(startDate,endDate);
      setExpensesDonut(responseExpenseDonut.data);
    }
    catch(error){
      console.log("error while getting expense donut data");
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
    const startDate = new Date(now.getFullYear(),now.getMonth(),1);
    const endDate = new Date(now.getFullYear(),now.getMonth()+1,1);
    getExpenseDonut(startDate.toISOString().split("T")[0],endDate.toISOString().split("T")[0]);

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
    const startDate = new Date(now.getFullYear(),now.getMonth()-1,1);
    const endDate = new Date(now.getFullYear(),now.getMonth(),1);
    getExpenseDonut(startDate.toISOString().split("T")[0],endDate.toISOString().split("T")[0]);
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
    const startDate = new Date(now.getFullYear(),1,1);
    const endDate = new Date(now.getFullYear()+1,1,1);
    getExpenseDonut(startDate.toISOString().split("T")[0],endDate.toISOString().split("T")[0]);
  }

  const data :donutChartData[]=[
    {label:"rent",value:1300},
    {label:"cloths",value:800},
    {label:"utilites",value:900}
  ]

  const histData : histoData[]=[
    {period:"Jan",income:2000,expense:1800},
    {period:"feb",income:3450,expense:9850},
    {period:"MAR",income:8900,expense:6500},
    {period:"APR",income:2130,expense:600},
  ]

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
            <HistoChart data = {histData}/>

          </div>
          <div className="round-chart">
            <DonutChart data = {expensesDonut}/>
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
