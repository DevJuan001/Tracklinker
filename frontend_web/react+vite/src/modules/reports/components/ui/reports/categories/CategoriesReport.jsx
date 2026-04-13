// Hooks
import { useCategoriesData } from "../../../../hooks/categories/useCategoriesData";
import { useState } from "react";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import ReportsTopSection from "../../ReportsTopSection";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import CategoriesAreaChart from "./CategoriesAreaChart";
import CategoriesTable from "./CategoriesTable";

export default function CategoriesReport({ setReport }) {
  const { categoriesData } = useCategoriesData();
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

      {categoriesData.map((item) => (
        <ReportsContainer
          reportsName={"Categorias"}
          reportsDate={`${startDate} - ${endDate}`}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Totales"}
            firstKpiValue={item.total_categories}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_categories}
            thirdKpiName={"Inactivas"}
            thirdKpiValue={item.inactive_categories}
            fourthKpiName={"Activas"}
            fourthKpiValue={item.active_categories}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <CategoriesAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}></ReportCard>

          <TableCard tableTitle={"Categorías recientes"}>
            <CategoriesTable />
          </TableCard>
        </ReportsContainer>
      ))}
    </section>
  );
}
