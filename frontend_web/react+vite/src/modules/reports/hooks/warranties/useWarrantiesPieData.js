import { useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getWarrantiesPieDataService } from "../../services/warranties/getWarrantiesPieDataService";

export function useWarrantiesPieData(period) {
  const [warrantiesData, setWarrantiesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchWarrantiesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getWarrantiesPieDataService(
          period,
          controllerRef.current.signal,
        );

        const pieData = data.map((item, index) => ({
          name: item.name,
          value: item.value,
          color: colors[index % colors.length],
        }));
        setWarrantiesData(pieData);
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
