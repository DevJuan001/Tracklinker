import { useEffect, useRef, useState } from "react";
import { getWarrantiesDataService } from "../../services/warranties/getWarrantiesDataService";

export function useWarrantiesData() {
  const [warrantiesData, setWarrantiesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchWarrantiesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getWarrantiesDataService(
          controllerRef.current.signal,
        );
        setWarrantiesData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchWarrantiesData();
    return () => controllerRef.current?.abort();
  }, []);

  return { warrantiesData, error };
}
