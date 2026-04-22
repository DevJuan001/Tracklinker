import HomePage from "../../modules/home/HomePage";
import DashBoardPage from "../../modules/dashboard/DashboardPage";
import UsersPage from "../../modules/users/UsersPage";
import ProductsPage from "../../modules/products/ProductsPage";
import CategoriesPage from "../../modules/categories/CategoriesPage";
import SubcategoriesPage from "../../modules/subcategories/SubcategoriesPage";
import ReportsPage from "../../modules/reports/ReportsPage";
import WarrantiesPage from "../../modules/warranties/WarrantiesPage";
import SuppliersPage from "../../modules/suppliers/SuppliersPage";
import TransformationsPage from "../../modules/transformations/TransformationsPage";

export const routesConfig = [
  {
    path: "/home",
    component: HomePage,
    roles: ["Admin"],
  },
  {
    path: "/dashboard",
    component: DashBoardPage,
    roles: ["Admin"],
  },
  {
    path: "/users",
    component: UsersPage,
    roles: ["Admin"],
  },
  {
    path: "/products",
    component: ProductsPage,
    roles: ["Admin"],
  },
  {
    path: "/categories",
    component: CategoriesPage,
    roles: ["Admin"],
  },
  {
    path: "/subcategories",
    component: SubcategoriesPage,
    roles: ["Admin"],
  },
  {
    path: "/reports",
    component: ReportsPage,
    roles: ["Admin"],
  },
  {
    path: "/warranties",
    component: WarrantiesPage,
    roles: ["Admin"],
  },
  {
    path: "/suppliers",
    component: SuppliersPage,
    roles: ["Admin"],
  },
  {
    path: "/transformations",
    component: TransformationsPage,
    roles: ["Admin"],
  },
];
