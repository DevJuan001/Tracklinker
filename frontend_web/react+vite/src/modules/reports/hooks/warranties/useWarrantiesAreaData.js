import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getWarrantiesAreaChartService } from "../../services/warranties/getWarrantiesAreaChartService";

export function useWarrantiesAreaData(period) {
  const [warrantiesData, setWarrantiesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchWarrantiesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getWarrantiesAreaChartService(
          period,
          controllerRef.current.signal,
        );
        const data = response.map((row) => ({
          month: formatLabel(row.label, period),
          warranties: row.warranties,
        }));
        setWarrantiesData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchWarrantiesData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { warrantiesData, error };
}
