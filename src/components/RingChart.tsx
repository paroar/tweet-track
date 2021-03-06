import React, { useEffect, useContext } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ClearContext } from "../context/ClearContext";


const COLORS = ["#2AAD27", "#CB2B3E", "#FFD326"];

type RingChartProps = {
  data: number[];
  clearStop: () => void;  
};

const RingChart: React.FC<RingChartProps> = props => {
  const { clear } = useContext(ClearContext);
  
  const [good, bad, neutral] = props.data;
  const data = [
    { name: "Good", value: good },
    { name: "Bad", value: bad },
    { name: "Neutral", value: neutral }
  ];

  useEffect(() => {
    props.clearStop();
  }, [clear]);

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
