import { months } from "./months";

export const getDateRange = (period) => {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "7d":
      start.setDate(end.getDate() - 7);
      break;
    case "30d":
      start.setDate(end.getDate() - 30);
      break;
    case "6m":
      start.setMonth(end.getMonth() - 6);
      break;
    case "1a":
      start.setFullYear(end.getFullYear() - 1);
      break;
  }

  return {
    startDate: `${start.getDate()} De ${months[start.getMonth()]} del ${start.getFullYear()}`,
    endDate: `${end.getDate()} De ${months[end.getMonth()]} del ${end.getFullYear()}`,
  };
};
