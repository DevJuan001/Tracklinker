import { useState, useEffect } from "react";
import { months } from "../../../utils/months";
import { actionsIcons } from "../../../assets/icons/actionsIcons";

export default function Calendar({ onClose, value, onChange, triggerRef }) {
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
          className="fixed min-w-[400px] max-w-[600px] mt-14 p-2 bg-white border border-[#a1a1a131] rounded-[32px] cursor-default overflow-hidden z-[600]
        dark:border-[#ffffff15] dark:bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-[#a1a1a13f] dark:border-[#ffffff15]">
            <span className="text-base font-medium dark:text-white">
              {months[month]} {year}
            </span>
            <div className="flex">
              <button
                onClick={prevMonth}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-[#ffffff15] rounded-full"
              >
                <actionsIcons.arrowBackCalendar />
              </button>
              <button
                onClick={nextMonth}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-[#ffffff15] rounded-full"
              >
                <actionsIcons.arrowForwardCalendar />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            <div>Do</div>
            <div>Lu</div>
            <div>Ma</div>
            <div>Mi</div>
            <div>Ju</div>
            <div>Vi</div>
            <div>Sa</div>
            {/* Mes anterior */}
            {Array.from({ length: firstDow }).map((_, i) => {
              const prevMonthDays = new Date(year, month, 0).getDate();
              const day = prevMonthDays - firstDow + i;
              return (
                <button
                  key={`prev-${i}`}
                  type="button"
                  disabled
                  style={{ aspectRatio: 1 }}
                  className="flex items-center justify-center text-[13px] rounded-full text-gray-300 dark:text-[#ffffff25]"
                >
                  {day}
                </button>
              );
            })}

            {/* Mes actual */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleSelect(day)}
                style={{ aspectRatio: 1 }}
                className={`flex items-center justify-center text-base rounded-2xl transition-colors hover:text-black
                ${
                  isSelected(day)
                    ? "bg-black text-white font-bold text-lg dark:bg-white dark:text-black hover:bg-gray-200"
                    : isToday(day)
                      ? "bg-gray-100 dark:bg-[#ffffff15] dark:bg-[#75777e60] font-medium dark:text-white hover:bg-gray-200"
                      : "text-[#44474e] hover:bg-gray-200 dark:hover:bg-[#ffffff15] dark:text-white hover:font-bold"
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
                  style={{ aspectRatio: 1 }}
                  className="flex items-center justify-center text-[13px] rounded-full text-gray-300 dark:text-[#ffffff25]"
                >
                  {i + 1}
                </button>
              ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
