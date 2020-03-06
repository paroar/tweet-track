import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#50d890", "#d63447", "#ffd868"];

type RingChartProps = {
  data: number[];
};

const RingChart: React.FC<RingChartProps> = props => {
  const [good, bad, neutral] = props.data;
  const data = [
    { name: "Good", value: good },
    { name: "Bad", value: bad },
    { name: "Neutral", value: neutral }
  ];
  return (
    <PieChart width={80} height={80}>
      <Pie
        data={data}
        cx={35}
        cy={35}
        innerRadius={15}
        outerRadius={35}
        paddingAngle={1}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default RingChart;
