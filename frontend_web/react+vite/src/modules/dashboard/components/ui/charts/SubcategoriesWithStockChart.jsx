import { useSubcategoriesChart } from "../../../hooks/useSubcategoriesChart";
import ChartCard from "../ChartCard";
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function SubcategoriesWithStockChart() {
  const { subcategories } = useSubcategoriesChart();
  return (
    <ChartCard rowSpan={2} colSpan={5} name={"Subcategorias con mas productos"}>
      <div className="w-full h-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={subcategories}
            margin={{ left: 30, right: 10 }}
          >
            <YAxis width="auto" fontSize={"11px"} />
            <XAxis dataKey={"subcategory"} fontSize={"10px"} />
            <Area
              dataKey={"stock"}
              fill="#152DD1"
              stroke="#3B5BFF"
              strokeWidth={2}
              type={"natural"}
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
