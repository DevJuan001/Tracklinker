import { Pie, PieChart, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";
import { usePieChart } from "../../../hooks/usePieChart";
import ChartCard from "../ChartCard";

export default function SimplePieChart() {
  const { simplePieChartData, error } = usePieChart();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ChartCard rowSpan={4} colSpan={3} name={"Estados de garantías"}>
      <div className="w-full h-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie
              data={simplePieChartData}
              dataKey={"value"}
              nameKey={"name"}
              cornerRadius="50%"
              innerRadius="80%"
              outerRadius="100%"
              paddingAngle={5}
            >
              {simplePieChartData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
              <Legend />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
