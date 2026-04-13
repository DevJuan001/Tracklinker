import { warrantiesIcons } from "../../../assets/icons/warrantiesIcons";

export const warrantyStatusConfig = {
  1: {
    text: "Pendiente",
    icon: warrantiesIcons.incompleteIcon,
    styles: "bg-red-50 text-red-700 dark:text-[#ff00008e] dark:bg-[#ff00002f]",
  },
  2: {
    text: "En Proceso",
    icon: warrantiesIcons.inprocessIcon,
    styles:
      "bg-yellow-50 text-yellow-700 dark:text-[#eeff009d] dark:bg-[#fbff001f]",
  },
  3: {
    text: "Completada",
    icon: warrantiesIcons.completeIcon,
    styles:
      "bg-green-50 text-green-600 dark:text-[#00ff3779] dark:bg-[#00ff151f]",
  },
};
