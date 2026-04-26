import { useState, useRef } from "react";
import Calendar from "../ui/Calendar";
import ConfirmCancelButtons from "./ConfirmCancelButtons";
import { actionsIcons } from "../../../assets/icons/actionsIcons";
import DateField from "../ui/DateField";

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
    <section className="w-full flex flex-col gap-2 font-dmsans">
      <div className="flex flex-col gap-1">
        {/* Inputs para seleccionar las fechas */}
        <span className="text-sm dark:text-white">Fecha de {fieldName}</span>
        <div className="flex gap-2">
          <DateField
            onClick={() => setShowCalendarStartDate(!showCalendarStartDate)}
            spanText={"Desde:"}
            inputRef={startInputRef}
            name={"start_date"}
            value={orderByStartDateValue ? orderByStartDateValue : "yyyy-mm-dd"}
            onChange={(formatted) => {
              orderByStartDateOnChange({
                target: { name: "start_date", value: formatted },
              });
              setShowCalendarStartDate(false);
            }}
          >
            {showCalendarStartDate && (
              <Calendar
                growDirection={"center"}
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
          </DateField>

          <DateField
            onClick={() => setShowCalendarFinishDate(!showCalendarFinishDate)}
            spanText={"Hasta:"}
            inputRef={finishInputRef}
            name={"end_date"}
            value={
              orderByFinishDateValue ? orderByFinishDateValue : "yyyy-mm-dd"
            }
            onChange={(formatted) => {
              orderByFinishDateOnChange({
                target: { name: "end_date", value: formatted },
              });
              setShowCalendarFinishDate(false);
            }}
          >
            {showCalendarFinishDate && (
              <Calendar
                growDirection={"center"}
                triggerRef={finishInputRef}
                value={orderByFinishDateValue}
                onClose={() => setShowCalendarFinishDate(false)}
                onChange={(formatted) => {
                  orderByFinishDateOnChange({
                    target: { name: "end_date", value: formatted },
                  });
                  setShowCalendarFinishDate(false);
                }}
              />
            )}
          </DateField>
        </div>
      </div>

      <section>{children}</section>

      {/* Botones de aplicar y cancelar */}
      <ConfirmCancelButtons
        confirmButtonOnClick={applyButtonOnClick}
        confirmText="Aplicar"
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
