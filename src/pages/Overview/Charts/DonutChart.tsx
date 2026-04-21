import React from 'react'
import { PieChart,Pie, Cell,Tooltip,Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';

interface donutChartData {
    label : string;
    value : number
}
type donutChartProps = {
    data : donutChartData[];
}

const DonutChart = (props:donutChartProps) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
        <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data = {props.data}
                dataKey = "value"
                nameKey = "label"
                innerRadius={60}
                outerRadius={100}
                label={(entry) => `${entry.name}: ${entry.value}`}
            >
            {props.data.map((entry,index)=>(
                <Cell fill={COLORS[index % COLORS.length ]}/>
            ))}

            </Pie>

            <Tooltip/>
            <Legend/>

        </PieChart>
        </ResponsiveContainer>
      
    </div>
  )
}


export default DonutChart
