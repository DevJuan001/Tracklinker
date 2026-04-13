import { usersIcons } from "../../../assets/icons/usersIcons";

export const userStatus = {
  1: {
    text: "Deshabilitado",
    modalType: "enable",
    visibilityIcon: false,
    icon: usersIcons.inactiveCircle,
    styles: "w-32 bg-gray-50 text-gray-400 border-gray-300 dark:border-gray-700 dark:bg-[#75777e80]",
  },
  2: {
    text: "Activo",
    modalType: "disable",
    visibilityIcon: true,
    icon: usersIcons.activeCircle,
    styles:
      "w-20 bg-green-200 text-green-600 border-green-300 dark:border-green-900 dark:text-[#00ff3779] dark:bg-[#00ff151f]",
  },
};
