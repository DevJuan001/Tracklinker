// Hooks
import { useState } from "react";
import { useSubcategoriesData } from "../../../../hooks/subcategories/useSubcategoriesData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import ReportsTopSection from "../../ReportsTopSection";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import SubcategoriesAreaChart from "./SubcategoriesAreaChart";
import SubcategoriesTable from "./SubcategoriesTable";
import SubcategoriesPieChart from "./SubcategoriesPieChart";

export default function SubcategoriesReport({ setReport }) {
  const { subcategoriesData } = useSubcategoriesData();
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
      {subcategoriesData.map((item) => (
        <ReportsContainer
          reportsName={"Subcategorias"}
          reportsDate={`${startDate} - ${endDate}`}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Totales"}
            firstKpiValue={item.total_subcategories}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_subcategories}
            thirdKpiName={"Inactivas"}
            thirdKpiValue={item.inactive_subcategories}
            fourthKpiName={"Activas"}
            fourthKpiValue={item.active_subcategories}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <SubcategoriesAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <SubcategoriesPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Subcategorias recientes"}>
            <SubcategoriesTable />
          </TableCard>
        </ReportsContainer>
      ))}
    </section>
  );
}
