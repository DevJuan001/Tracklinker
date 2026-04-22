import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useBrandsChart } from "../../../hooks/useBrandsChart";
import ChartCard from "../ChartCard";

export default function BrandsChart() {
  const { brandChartInfo, error } = useBrandsChart();

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <ChartCard
      rowSpan={2}
      colSpan={3}
      name={"Marcas con más unidades"}
    >
      <div className="w-full h-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={brandChartInfo}>
            <YAxis width="auto" />
            <XAxis dataKey={"brand"} fontSize={"8px"} />
            <Bar dataKey={"products"} fill="#152DD1" background={"#000"} radius={[8, 8, 0, 0]} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
