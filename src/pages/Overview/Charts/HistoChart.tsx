import { ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Bar,Tooltip,Legend } from 'recharts'
type histoData = {
    period : string,
    income : number,
    expense : number
}

type histoProps = {
    data : histoData[]
}

const HistoChart = (props : histoProps) => {

  return (
    <div>
        <ResponsiveContainer  width="100%" height={300}>
            <BarChart data = {props.data}>
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="period"/>
                <YAxis/>

                <Tooltip/>
                <Legend/>

                <Bar dataKey="income" fill="#00C49F"/>
                <Bar dataKey="expense" fill="#FF8042"/>
            </BarChart>
        </ResponsiveContainer>
      
    </div>
  )
}

export default HistoChart
