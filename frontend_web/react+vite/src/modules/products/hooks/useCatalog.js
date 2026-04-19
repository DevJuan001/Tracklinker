// Hooks
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Services
import { getProducts } from "../services/getProducts";
import { getProductStatus } from "../services/getProductStatus";
import { getProductBrands } from "../services/getProductBrands";
import { getProductModels } from "../services/getProductModels";
import { getInputOrdersService } from "../services/getInputOrdersService";
import { getCategoriesService } from "../../categories/services/getCategoriesService";
import { getSubcategories } from "../../subcategories/services/getSubcategoriesService";
// Status
import { productStatusConfig } from "../constants/productStatusConfig";

export function useCatalog() {
  const [filters, setFilters] = useState([]);

  const products = useQuery({
    queryKey: ["products", filters],
    queryFn: ({ signal }) => getProducts(filters, signal),
    select: (data) =>
      data.map((product) => ({
        ...product,
        status_text: productStatusConfig[product.status]?.text,
      })),
    staleTime: 1000 * 60 * 3,
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
    staleTime: 1000 * 60 * 10,
  });

  const subcategories = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
    staleTime: 1000 * 60 * 10,
  });

  const brands = useQuery({
    queryKey: ["brands"],
    queryFn: getProductBrands,
    staleTime: 1000 * 60 * 10,
  });

  const models = useQuery({
    queryKey: ["models"],
    queryFn: getProductModels,
    staleTime: 1000 * 60 * 10,
  });

  const inputOrders = useQuery({
    queryKey: ["inputOrders"],
    queryFn: getInputOrdersService,
    staleTime: 1000 * 60 * 5,
  });

  const productStatus = useQuery({
    queryKey: ["productStatus"],
    queryFn: getProductStatus,
    staleTime: 1000 * 60 * 10,
  });

  return {
    products: products.data || [],
    categories: categories.data || [],
    subcategories: subcategories.data || [],
    brands: brands.data || [],
    models: models.data || [],
    inputOrders: inputOrders.data || [],
    productStatus: productStatus.data || [],
    loading:
      products.isLoading ||
      categories.isLoading ||
      subcategories.isLoading ||
      brands.isLoading ||
      models.isLoading ||
      inputOrders.isLoading ||
      productStatus.isLoading,
    error:
      products.error ||
      categories.error ||
      subcategories.error ||
      brands.error ||
      models.error ||
      inputOrders.error ||
      productStatus.error,
    setFilters,
  };
}
