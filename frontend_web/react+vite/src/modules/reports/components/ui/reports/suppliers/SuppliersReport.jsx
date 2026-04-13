// Hooks
import { useState } from "react";
import { useSuppliersData } from "../../../../hooks/suppliers/useSuppliersData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import ReportsTopSection from "../../ReportsTopSection";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import SuppliersAreaChart from "./SuppliersAreaChart";
import SuppliersPieChart from "./SuppliersPieChart";
import SuppliersTable from "./SuppliersTable";

export default function SuppliersReport({ setReport }) {
  const { suppliersData } = useSuppliersData();
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
      {suppliersData.map((item) => (
        <ReportsContainer
          reportsName={"Proveedores"}
          reportsDate={`${startDate} - ${endDate}`}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total"}
            firstKpiValue={item.total_suppliers}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_suppliers}
            thirdKpiName={"Inactivos"}
            thirdKpiValue={item.inactive_suppliers}
            fourthKpiName={"Activos"}
            fourthKpiValue={item.active_suppliers}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <SuppliersAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <SuppliersPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Proveedores recientes"}>
            <SuppliersTable />
          </TableCard>
        </ReportsContainer>
      ))}
    </section>
  );
}
