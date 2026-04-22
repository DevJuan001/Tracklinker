import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAreaChart } from "../../../hooks/useAreaChart";
import ChartCard from "../ChartCard";

export default function SimpleAreaChart() {
  const { areaChartInfo, error } = useAreaChart();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ChartCard
      rowSpan={2}
      colSpan={6}
      bgColor={""}
      name={"Salidas Mensuales del año"}
    >
      <div className="w-full h-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaChartInfo} margin={{ left: 20 }}>
            <YAxis width="auto" fontSize={"11px"} />
            <XAxis dataKey={"month"} fontSize={"10px"} />
            <Tooltip />
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <Area
              type={"natural"}
              dataKey={"output_orders"}
              stroke="#152DD1"
              fill="#152DD1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
