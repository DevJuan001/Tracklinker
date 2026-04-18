import { useState, useEffect } from "react";

export function useCalendar(value, onChange, triggerRef) {
  const [coords, setCoords] = useState(null);

  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const { year, month } = current;

  const firstDow = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
    setCurrent((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { ...prev, month: prev.month - 1 },
    );
  const nextMonth = () =>
    setCurrent((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { ...prev, month: prev.month + 1 },
    );

  const handleSelect = (day) => {
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(formatted);
  };

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isSelected = (day) => {
    if (!value) return false;
    const [yyyy, mm, dd] = value.split("-").map(Number);
    return day === dd && month + 1 === mm && year === yyyy;
  };

  useEffect(() => {
    if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const calendarWidth = 400;
      const padding = 20;

      const wouldOverflowRight = rect.left + calendarWidth > window.innerWidth;

      let finalLeft = rect.left;

      if (wouldOverflowRight) {
        finalLeft = window.innerWidth - calendarWidth - padding;
      }

      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: Math.max(padding, finalLeft),
      });
    }
  }, [triggerRef]);

  return {
    coords,
    year,
    month,
    firstDow,
    daysInMonth,
    prevMonth,
    nextMonth,
    handleSelect,
    isToday,
    isSelected,
  };
}
