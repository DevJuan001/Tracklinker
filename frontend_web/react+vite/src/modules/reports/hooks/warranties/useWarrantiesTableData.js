import { useEffect, useRef, useState } from "react";
import { getWarrantiesTableDataService } from "../../services/warranties/getWarrantiesTableDataService";

export function useWarrantiesTableData() {
  const [warranties, setWarranties] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchWarrantiesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getWarrantiesTableDataService(
          controllerRef.current.signal,
        );
        setWarranties(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchWarrantiesData();
    return () => controllerRef.current?.abort();
  }, []);

  return { warranties, error };
}
