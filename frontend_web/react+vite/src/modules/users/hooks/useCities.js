import { useState, useEffect } from "react";
import { getCitiesService } from "../services/getCitiesService";

export function useCities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCities() {
    try {
      const data = await getCitiesService();
      setCities(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return { cities, loading, error, fetchCities };
}
