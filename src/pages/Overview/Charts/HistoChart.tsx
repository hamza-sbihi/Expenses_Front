import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend
} from "recharts";

type HistoData = {
  period: string;
  Income: number;
  Expenses: number;
};

type HistoProps = {
  data: HistoData[];
};

const HistoChart = ({ data }: HistoProps) => {

  return (

    <div style={{ width: "100%", height: 320 }}>

      <ResponsiveContainer>

        <BarChart
          data={data}
          barGap={6}
        >

          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="2 2"
            vertical={true}
          />

          <XAxis
            dataKey="period"
            tick={{
              fill: "var(--text-muted)",
              fontSize: 12
            }}

            axisLine={true}
            tickLine={true}
          />

          <YAxis
            tick={{
              fill: "var(--text-muted)",
              fontSize: 12
            }}

            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface-elevated)",
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 2px 10px var(--shadow)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
                paddingTop:"20px"
            }}
          />

          <Bar
            dataKey="totalIncome"
            fill="var(--primary)"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="totalExpenses"
            fill="var(--accent)"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default HistoChart;