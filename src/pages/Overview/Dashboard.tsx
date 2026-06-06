import {useState,useEffect} from 'react'
import './Dashboard.css'
import { matchPath, useNavigate } from 'react-router-dom'
import { coreApi } from '../../api/coreApi';
import DonutChart from './Charts/DonutChart';
import HistoChart from './Charts/HistoChart';
import { Periods, type Period } from '../../types/period';

interface donutChartData {
    label : string;
    value : number
}
type histoData = {
    period : string,
    Income : number,
    Expenses : number
}

const Dashboard = () => {

  const navigate = useNavigate();
  const [totalIncome,SetTotalIncome] = useState<number>(0);
  const [totalExpense,setTotalExpense] = useState<number>(0);
  const [expensesDonut,setExpensesDonut] = useState<donutChartData[]>([]);
  const [incomeDonut,setIncomeDonut] = useState<donutChartData[]>([]);
  const [histogrameData,setHistogrameData] = useState<histoData[]>([]);
  const [periodState,setPeriodState] = useState<Period>(Periods.MONTH);
  const [isExpense,setIsExpense] = useState<boolean>(true);
  const [startDateState,setStartDateState] = useState<Date>(new Date());
  const [endDateState,setEndDateState] = useState<Date>(new Date());
  const [year,setYear] = useState<number>(new Date().getFullYear());
  const [month,setMonth] = useState<number>(new Date().getMonth()+1);
  const [time,setTime] = useState<string>("");

  const getTime=()=>{
    const now  = new Date();
    const hr = now.getHours();
    if (hr >= 6 && hr < 12) {
      setTime("Morning");
    } else if (hr >= 12 && hr < 23) {
      setTime("Evening"); 
    } else {
      setTime("Morning"); 
    }
  }

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
  const getIncomeDonut = async(startDate:string,endDate:string)=>{
    try{
      const responseIncomeDonut = await coreApi.stats.getIncomeDonut(startDate,endDate);
      setIncomeDonut(responseIncomeDonut.data);
    }
    catch(error){
      console.log("error while getting income donut data");
    }
  }
  const getHistoData = async(startDate:string,endDate:string,period:Period) =>{
    try{
      const responseHistoData = await coreApi.stats.getHistograme(startDate,endDate,period);
      setHistogrameData(responseHistoData.data);
    }
    catch(error){
      console.log("error while getting histograme data")
    }

  }
  useEffect(()=> {
    getTime();
    fetchdata(year,month);
    getExpenseDonut(startDateState.toISOString().split("T")[0],endDateState.toISOString().split("T")[0]);
    getIncomeDonut(startDateState.toISOString().split("T")[0],endDateState.toISOString().split("T")[0]);
    getHistoData(startDateState.toISOString().split("T")[0],endDateState.toISOString().split("T")[0],periodState);

  },[year,month,startDateState,endDateState,periodState])

  const getThisMonth = ()=>{
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth()+1);
    fetchdata(year,month);
    setStartDateState(new Date(now.getFullYear(),now.getMonth(),1));
    setEndDateState(new Date(now.getFullYear(),now.getMonth()+1,1));
    getExpenseDonut(startDateState.toISOString().split("T")[0],endDateState.toISOString().split("T")[0]);
    getIncomeDonut(startDateState.toISOString().split("T")[0],endDateState.toISOString().split("T")[0]);
    getHistoData(startDateState.toISOString().split("T")[0],endDateState.toISOString().split("T")[0],periodState);

  }
  const getLastMonth = ()=> {
    const now = new Date();
    let curryear = now.getFullYear();
    let currmonth = now.getMonth()+1;
    if(currmonth === 1 ){
      currmonth = 12;
      curryear = curryear-1;
    }
    else{
      currmonth = currmonth-1;
    }
    setYear(curryear);
    setMonth(currmonth);
    setStartDateState(new Date(now.getFullYear(),now.getMonth()-1,1));
    setEndDateState(new Date(now.getFullYear(),now.getMonth(),1));

  }
  const getByYear =async()=>{
    const now = new Date();
    const curryear = now.getFullYear();
    try{
      const responseExpense =  await coreApi.expense.getExpensesByYear(curryear);
      console.log(responseExpense.data);
      setTotalExpense(responseExpense.data);
      const responseIncome = await coreApi.income.getIncomeByYear(curryear);
      console.log(responseIncome.data);
      SetTotalIncome(responseIncome.data);
    }
    catch(error){
      console.error("error while getting income and expense by year")
    }
    setStartDateState(new Date(now.getFullYear(),1,1));
    setEndDateState(new Date(now.getFullYear()+1,1,1));

  }

  const data :donutChartData[] = isExpense? expensesDonut : incomeDonut;

  const renderDonutChart = ()=>{
    setIsExpense(prev =>!prev);
  }
  const changePeriod = (period:Period)=>{
    setPeriodState(period);
  }

  return (
    <div>
      <div className='dashboard-header'>
        <h2>Good {time} username</h2>
        <div className="header-actions">
          <button className='dash-button' onClick = {getThisMonth}>this month</button>
          <button className='dash-button' onClick = {getLastMonth}>last month</button>
          <button className='dash-button' onClick = {getByYear}>this year</button>
          <button className='dash-button'>select period</button>
        </div>
      </div>
      <div className = 'dashboard-content'>
        {/* First Row */}
          <div className = 'dashboard-content-row1'>
            <button onClick={()=>{
              navigate('/categories')
            }}>add</button>
            <p>add expense</p>
          </div>
          <div className = 'dashboard-content-row1'>
            <button onClick={()=>{
              navigate('/incomes')
            }}>add</button>
            <p>add income</p>
          </div>
          <div className = 'dashboard-content-row1'>
            <p>AI review</p>
          </div>
        
        {/* Second Row */}
          <div className = 'dashboard-content-row2'>
            <div className='row2-title'>
              <p className='row2-label'>balance</p>
            </div>
            <p className='row2-value'>{totalIncome-totalExpense}DH</p>
          </div>
          <div className = 'dashboard-content-row2'>
            <div className='row2-title'>
              <p className='row2-label'>income</p>
              <button onClick={()=>{
                navigate('/incomes')
              }}>+</button>
            </div>
            <p className='row2-value'>{totalIncome}DH</p>
          </div>
          <div className = 'dashboard-content-row2'>
            <div className='row2-title'>
              <p className='row2-label'>expense</p>
              <button onClick={()=>{
                navigate('/categories')
              }}>+</button>
            </div>
            <p className='row2-value'>{totalExpense}DH</p>
          </div>
        
        {/* Third Row */}
          <div className="chart">
            <div className="histograme_periods">
              <button className='dash-button' onClick={()=>changePeriod(Periods.DAY)}> Daily</button>
              <button className='dash-button' onClick={()=>changePeriod(Periods.WEEK)}> Weekly</button>
              <button className='dash-button' onClick={()=>changePeriod(Periods.MONTH)}> Monthly</button>
              <button className='dash-button' onClick={()=>changePeriod(Periods.YEAR)}> Yearly</button>
            </div>
            <HistoChart data = {histogrameData}/>

          </div>
          <div className="round-chart">
            <div className='donut_action_button'>
              <button className='dash-button' onClick={renderDonutChart}>get {isExpense ? "Incomes":"Expenses"}</button>

            </div>

            <DonutChart data = {data}/>
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
