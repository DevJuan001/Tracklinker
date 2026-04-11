import { useState, useEffect } from "react";
import { months } from "../../../utils/months";

export default function Calendar({ onClose, value, onChange, triggerRef }) {
  const [coords, setCoords] = useState(null);

  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const { year, month } = current;

  const firstDow = (() => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  })();
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
      setCoords({
        top: rect.bottom - 60,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [triggerRef]);

  return (
    <div
      className="fixed inset-0 flex z-[500] bg-[#00000009] animate-blurUp"
      onClick={() => onClose(false)}
    >
      {coords && (
        <div
          style={{ top: coords.top, right: coords.right }}
          className="fixed w-80 h-fit bg-white border border-[#a1a1a131] rounded-2xl overflow-hidden z-[600]
        dark:border-[#ffffff15] dark:bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#a1a1a13f] dark:border-[#ffffff15]">
            <button
              onClick={prevMonth}
              className="text-gray-400 hover:bg-gray-100 dark:hover:bg-[#ffffff15] rounded-lg px-2 py-1 text-lg leading-none"
            >
              ‹
            </button>
            <span className="text-sm font-medium dark:text-white">
              {months[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="text-gray-400 hover:bg-gray-100 dark:hover:bg-[#ffffff15] rounded-lg px-2 py-1 text-lg leading-none"
            >
              ›
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {/* Mes anterior */}
            {Array.from({ length: firstDow }).map((_, i) => {
              const prevMonthDays = new Date(year, month, 0).getDate();
              const d = prevMonthDays - firstDow + i + 1;
              return (
                <button
                  key={`prev-${i}`}
                  type="button"
                  disabled
                  className="aspect-square flex items-center justify-center text-[13px] rounded-full text-gray-300 dark:text-[#ffffff25]"
                >
                  {d}
                </button>
              );
            })}

            {/* Mes actual */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleSelect(day)}
                className={`aspect-square flex items-center justify-center text-[13px] rounded-full transition-colors
                ${
                  isSelected(day)
                    ? "bg-black text-white dark:bg-white dark:text-black font-medium"
                    : isToday(day)
                      ? "bg-gray-100 dark:bg-[#ffffff15] font-medium dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-[#ffffff15] dark:text-white"
                }`}
              >
                {day}
              </button>
            ))}

            {/* Mes siguiente */}
            {(() => {
              const totalCells = firstDow + daysInMonth;
              const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
              return Array.from({ length: remaining }).map((_, i) => (
                <button
                  key={`next-${i}`}
                  type="button"
                  disabled
                  className="aspect-square flex items-center justify-center text-[13px] rounded-full text-gray-300 dark:text-[#ffffff25]"
                >
                  {i + 1}
                </button>
              ));
            })()}
          </div>

          {/* Footer */}
          <div className="px-3 pb-3 flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {value ?? "Sin selección"}
            </span>
            {value && (
              <button
                onClick={() => onChange(null)}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#ffffff15]"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
