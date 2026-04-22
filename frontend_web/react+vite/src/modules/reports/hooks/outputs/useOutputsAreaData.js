import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getOutputsAreaChartService } from "../../services/outputs/getOutputsAreaChartService";

export function useOutputsAreaData(period) {
  const [outputsData, setOutputsData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchOutputsData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getOutputsAreaChartService(
          period,
          controllerRef.current.signal,
        );
        const data = response.map((row) => ({
          month: formatLabel(row.label, period),
          outputs: row.outputs,
        }));
        setOutputsData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchOutputsData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { outputsData, error };
}
