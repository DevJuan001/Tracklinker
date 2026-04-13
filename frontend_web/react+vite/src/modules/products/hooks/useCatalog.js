// Hooks
import { useState, useEffect } from "react";
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
  // Definir los estados y sus valores por defecto
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [inputOrders, setInputOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts(filters) {
    try {
      setLoading(true);
      const data = await getProducts(filters);
      const formattedProducts = data.map((product) => ({
        ...product,
        status_text: productStatusConfig[product.status]?.text,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const categoryData = await getCategoriesService();
      setCategories(categoryData);
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchSubcategories() {
    try {
      const subcategoryData = await getSubcategories();
      setSubcategories(subcategoryData);
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchBrands() {
    try {
      const brandsData = await getProductBrands();
      setBrands(brandsData);
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchModels() {
    try {
      const modelsData = await getProductModels();
      setModels(modelsData);
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchInputOrders() {
    try {
      const inputOrdersData = await getInputOrdersService();
      setInputOrders(inputOrdersData);
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchProductStatus() {
    try {
      const productStatus = await getProductStatus();
      setProductStatus(productStatus);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
    fetchBrands();
    fetchModels();
    fetchInputOrders();
    fetchProductStatus();
  }, []);

  return {
    products,
    categories,
    subcategories,
    brands,
    models,
    inputOrders,
    productStatus,
    loading,
    error,
    fetchProducts,
    fetchBrands,
    fetchCategories,
    fetchInputOrders,
    fetchModels,
    fetchSubcategories,
    fetchProductStatus,
  };
}
