// Hooks
import { useState } from "react";
import { useUsersData } from "../../../../hooks/users/useUsersData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import UsersTable from "./UsersTable";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import UsersPieChart from "./UsersPieChart";
import UsersAreaChart from "./UsersAreaChart";
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import ReportsTopSection from "../../ReportsTopSection";

export default function UsersReport({ setReport }) {
  const { usersData } = useUsersData();
  const [period, setPeriod] = useState("30d");
  const { startDate, endDate } = getDateRange(period);
  return (
    <section className="w-full h-full flex flex-col gap-2 animate-blurUp">
      <ReportsTopSection
        setReport={setReport}
        periods={["7d", "30d", "6m", "1a"]}
        setPeriod={setPeriod}
        currentPeriod={period}
      />

      {usersData.map((item) => (
        <ReportsContainer
          reportsName={"Usuarios"}
          reportsDate={`${startDate} - ${endDate}`}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total usuarios"}
            firstKpiValue={item.total_users}
            secondKpiName={"Activos"}
            secondKpiValue={item.active_users}
            thirdKpiName={"Deshabilitados"}
            thirdKpiValue={item.inactive_users}
            fourthKpiName={"Nuevos este mes"}
            fourthKpiValue={item.recent_users}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <UsersAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <UsersPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Usuarios recientes"}>
            <UsersTable />
          </TableCard>
        </ReportsContainer>
      ))}
    </section>
  );
}
