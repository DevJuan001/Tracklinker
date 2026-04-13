// Hooks
import { useState } from "react";
import { useWarrantiesData } from "../../../../hooks/warranties/useWarrantiesData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import ReportsTopSection from "../../ReportsTopSection";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import WarrantiesTable from "./WarrantiesTable";
import WarrantiesPieChart from "./WarrantiesPieChart";
import WarrantiesAreaChart from "./WarrantiesAreaChart";

export default function WarrantiesReport({ setReport }) {
  const { warrantiesData } = useWarrantiesData();
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
      {warrantiesData.map((item) => (
        <ReportsContainer
          reportsName={"Garantías"}
          reportsDate={`${startDate} - ${endDate}`}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total"}
            firstKpiValue={item.total_warranties}
            secondKpiName={"Sin Completar"}
            secondKpiValue={item.without_make_warranties}
            thirdKpiName={"En Proceso"}
            thirdKpiValue={item.inprocess_warranties}
            fourthKpiName={"Completadas"}
            fourthKpiValue={item.complete_warranties}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <WarrantiesAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <WarrantiesPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Garantías recientes"}>
            <WarrantiesTable />
          </TableCard>
        </ReportsContainer>
      ))}
    </section>
  );
}
