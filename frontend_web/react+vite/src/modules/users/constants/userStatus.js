import { usersIcons } from "../../../assets/icons/usersIcons";

export const userStatus = {
  0: {
    text: "Deshabilitado",
    modalType: "enable",
    visibilityIcon: false,
    icon: usersIcons.inactiveCircle,
    styles: "w-32 bg-gray-50 text-gray-400 border-gray-400 dark:bg-[#1f2937]",
  },
  1: {
    text: "Activo",
    modalType: "disable",
    visibilityIcon: true,
    icon: usersIcons.activeCircle,
    styles:
      "w-20 bg-green-200 text-green-600 border-green-500 dark:text-[#00ff3779] dark:bg-[#00ff151f]",
  },
};
