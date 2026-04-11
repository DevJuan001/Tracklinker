import { lazy } from "react";

export const routesConfig = [
  {
    path: "/home",
    component: lazy(() => import("../../modules/home/HomePage")),
    roles: ["Admin"],
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../../modules/dashboard/DashboardPage")),
    roles: ["Admin"],
  },
  {
    path: "/users",
    component: lazy(() => import("../../modules/users/UsersPage")),
    roles: ["Admin"],
  },
  {
    path: "/products",
    component: lazy(() => import("../../modules/products/ProductsPage")),
    roles: ["Admin"],
  },
  {
    path: "/categories",
    component: lazy(() => import("../../modules/categories/CategoriesPage")),
    roles: ["Admin"],
  },
  {
    path: "/subcategories",
    component: lazy(
      () => import("../../modules/subcategories/SubcategoriesPage"),
    ),
    roles: ["Admin"],
  },
  {
    path: "/reports",
    component: lazy(() => import("../../modules/reports/ReportsPage")),
    roles: ["Admin"],
  },
  {
    path: "/warranties",
    component: lazy(() => import("../../modules/warranties/WarrantiesPage")),
    roles: ["Admin"],
  },
  {
    path: "/suppliers",
    component: lazy(() => import("../../modules/suppliers/SuppliersPage")),
    roles: ["Admin"],
  },
  {
    path: "/transformations",
    component: lazy(
      () => import("../../modules/transformations/TransformationsPage"),
    ),
    roles: ["Admin"],
  },
];
