import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <div className='dashboard-header'>
        <h2>Good Morning username</h2>
        <div className="header-actions">
          <button>filter 1</button>
          <button>filter 2</button>
          <button>filter 3</button>
          <button>filter 4</button>
        </div>
      </div>
      <div className = 'dashboard-content'>
        {/* First Row */}
          <div className = 'dashboard-content-row1'>
            <p>here will add expense</p>
          </div>
          <div className = 'dashboard-content-row1'>
            <p>here will add income</p>
          </div>
          <div className = 'dashboard-content-row1'>
            <p>here will get AI review</p>
          </div>
        
        {/* Second Row */}
          <div className = 'dashboard-content-row2'>
            <p>here will have balance</p>
          </div>
          <div className = 'dashboard-content-row2'>
            <p>here will have total income</p>
          </div>
          <div className = 'dashboard-content-row2'>
            <p>here will total expense/or spending habit score</p>
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
