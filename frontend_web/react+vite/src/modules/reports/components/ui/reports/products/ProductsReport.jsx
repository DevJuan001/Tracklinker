// Hooks
import { useState } from "react";
import { useProductsData } from "../../../../hooks/products/useProductsData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import ReportsTopSection from "../../ReportsTopSection";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import ProductsTable from "./ProductsTable";
import ProductsPieChart from "./ProductsPieChart";
import ProductsAreaChart from "./ProductsAreaChart";

export default function ProductsReport({ setReport }) {
  const { productsData } = useProductsData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <section className="w-full h-full flex flex-col gap-2 animate-blurUp">
      <ReportsTopSection
        setReport={setReport}
        periods={["7d", "30d", "6m", "1a"]}
        setPeriod={setPeriod}
        currentPeriod={period}
      />

      {productsData.map((item) => (
        <ReportsContainer
          reportsName={"Productos"}
          reportsDate={`${startDate} - ${endDate}`}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total productos"}
            firstKpiValue={item.total_products}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_products}
            thirdKpiName={"En garantía"}
            thirdKpiValue={item.warranties_products}
            fourthKpiName={"Vendidos"}
            fourthKpiValue={item.sold_products}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <ProductsAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <ProductsPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Productos recientes"}>
            <ProductsTable />
          </TableCard>
        </ReportsContainer>
      ))}
    </section>
  );
}
