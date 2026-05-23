import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface DonutChartData {
  label: string;
  value: number;
}

type DonutChartProps = {
  data: DonutChartData[];
};

const COLORS = [
  "var(--accent)",
  "var(--primary)",
  "var(--secondary)",
  "var(--income)",
];

const DonutChart = ({ data }: DonutChartProps) => {
    const getChartColor = (index: number) => {

        const hues = [
            210, // blue
            160, // green
            35,  // orange
            190, // cyan
            10,  // red-orange
            50,  // yellow
            0,
        ];

        const hue = hues[index % hues.length];

        const saturation = 65 + (index * 2) % 15;

        const lightness = 50 + (index * 3) % 10;

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

  return (
    <div style={{ width: "100%", height: 320 }}>

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="label"

            innerRadius={70}
            outerRadius={95}

            paddingAngle={3}

            stroke="none"
          >

            {data.map((_, index) => (
              <Cell
                key={index}
                fill={getChartColor(index)}
              />
            ))}

          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface-elevated)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 2px 10px var(--shadow)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default DonutChart;