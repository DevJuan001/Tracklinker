import { useState, useEffect } from "react";
import { getWarranties } from "../services/getWarranties";

export function useWarranties() {
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchWarranties(filters) {
    try {
      setLoading(true);
      const data = await getWarranties(filters);
      setWarranties(data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Esto llama a la función getWarranties y espera a obtener toda los datos y los almacena en "data"
  useEffect(() => {
    fetchWarranties();
  }, []);

  return { warranties, loading, error, fetchWarranties };
}
