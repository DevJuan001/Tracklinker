import { productsIcons } from "../../../assets/icons/mainIcons";
import { usersIcons } from "../../../assets/icons/mainIcons";

export const productStatusConfig = {
  0: {
    text: "Deshabilitado",
    modalType: "enable",
    visibilityIcon: false,
    icon: usersIcons.inactiveCircle,
    styles:
      "w-32 bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  },
  1: {
    text: "Activo",
    modalType: "disable",
    visibilityIcon: true,
    icon: usersIcons.activeCircle,
    styles:
      "w-20 bg-green-100 text-green-600 dark:bg-[#00ff151f] dark:text-[#00ff3779]",
  },
  2: {
    text: "Vendido",
    modalType: "disable",
    visibilityIcon: true,
    icon: productsIcons.paymentCard,
    styles:
      "w-20 bg-blue-100 text-blue-600 dark:bg-[#1e3a5f] dark:text-[#60a5fa]",
  },
  3: {
    text: "En garantía",
    modalType: "disable",
    visibilityIcon: true,
    icon: productsIcons.clockIcon,  
    styles:
      "w-28 bg-amber-100 text-amber-600 dark:bg-[#2d1f00] dark:text-[#fbbf24]",
  },
};
