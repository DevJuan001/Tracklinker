import { useState, useRef } from "react";
import Calendar from "../ui/Calendar";
import ConfirmCancelButtons from "./ConfirmCancelButtons";

export default function FilterModal({
  applyButtonOnClick,
  orderByStartDateOnChange,
  orderByStartDateValue,
  orderByFinishDateOnChange,
  orderByFinishDateValue,
  onClose,
  children,
  fieldName = "Creación",
}) {
  const [showCalendarStartDate, setShowCalendarStartDate] = useState(false);
  const [showCalendarFinishDate, setShowCalendarFinishDate] = useState(false);
  const startInputRef = useRef(null);
  const finishInputRef = useRef(null);

  return (
    <section className="flex flex-col gap-3 px-1 font-dmsans">
      <div className="flex flex-col">
        {/* Inputs para seleccionar las fechas */}
        <span className="text-sm dark:text-white">Fecha de {fieldName}</span>
        <div className="flex justify-between gap-3">
          <div
            onClick={() => setShowCalendarStartDate(!showCalendarStartDate)}
            className="relative"
          >
            <span className="text-xs dark:text-white">Desde:</span>
            <input
              ref={startInputRef}
              readOnly
              id="start-date-input"
              name="start_date"
              value={
                orderByStartDateValue ? orderByStartDateValue : "yyyy-mm-dd"
              }
              onChange={(formatted) => {
                orderByStartDateOnChange({
                  target: { name: "start_date", value: formatted },
                });
                setShowCalendarStartDate(false);
              }}
              className="w-full h-11 rounded-lg border border-[#a1a1a131] outline-[#00000028] bg-[#e5e5e527] text-center cursor-pointer
              dark:border-[#ffffff15] dark:bg-[#ffffff1a] text-sm dark:text-white"
            />

            {showCalendarStartDate && (
              <Calendar
                triggerRef={startInputRef}
                value={orderByStartDateValue}
                onClose={() => setShowCalendarStartDate(false)}
                onChange={(formatted) => {
                  orderByStartDateOnChange({
                    target: { name: "start_date", value: formatted },
                  });
                  setShowCalendarStartDate(false);
                }}
              />
            )}
          </div>

          <div
            onClick={() => setShowCalendarFinishDate(!showCalendarFinishDate)}
            className="relative"
          >
            <span className="text-xs dark:text-white">Hasta:</span>
            <input
              ref={finishInputRef}
              readOnly
              id="finish-date-input"
              name="finish_date"
              value={
                orderByFinishDateValue ? orderByFinishDateValue : "yyyy-mm-dd"
              }
              onChange={orderByFinishDateOnChange}
              className="w-full h-11 rounded-lg border border-[#a1a1a131] outline-[#00000028] bg-[#e5e5e527] text-center cursor-pointer
              dark:border-[#ffffff15] dark:bg-[#ffffff1a] text-sm dark:text-white"
            />

            {showCalendarFinishDate && (
              <div className="absolute top-full mt-1 left-0">
                <Calendar
                  triggerRef={finishInputRef}
                  setShowCalendar={setShowCalendarFinishDate}
                  value={orderByFinishDateValue}
                  onClose={() => setShowCalendarFinishDate(false)}
                  onChange={(formatted) => {
                    orderByFinishDateOnChange({
                      target: { name: "end_date", value: formatted },
                    });
                    setShowCalendarFinishDate(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="w-full">{children}</section>

      {/* Botones de aplicar y cancelar */}
      <ConfirmCancelButtons
        confirmButtonOnClick={applyButtonOnClick}
        confirmText="Aplicar"
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
