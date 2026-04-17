import { modalIcons } from "../../../../assets/icons/modalIcons";
import { useTheme } from "../../../hooks/useTheme";

export default function AppearanceContent() {
  const { setTheme } = useTheme();
  return (
    <section className="flex flex-col w-full pb-10 gap-7 animate-blurUp dark:text-white">
      {/* Opciones de apariencia */}
      <section className="flex flex-col gap-2 w-full">
        <span className="font-medium text-sm pl-1">Apariencia</span>
        <section className="flex gap-2 w-full">
          {/* Sistema */}
          <button
            onClick={() => setTheme("system")}
            className={`flex flex-col items-start gap-1.5 py-2.5 pl-3 pr-20 border rounded-xl focus:outline focus:outline-2
            dark:bg-[#2020226c] dark:border-[#f0efed5b]
            md:pr-[75px]
            `}
          >
            <div className="flex items-center">
              <img
                src={modalIcons.whiteCircle}
                alt=""
                className="border rounded-xl h-4 dark:border-none"
              />
              <img
                src={modalIcons.blackCircle}
                alt=""
                className="h-5 dark:border dark:border-gray-800 rounded-full"
              />
            </div>
            <span className="font-medium text-xs md:text-sm">Sistema</span>
          </button>
          {/* Claro */}
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-col items-start gap-2 py-2.5 pl-3 pr-20 border rounded-xl focus:outline focus:outline-2
            dark:bg-[#2020226c] dark:border-[#f0efed5b]
            md:pr-[75px]
            `}
          >
            <img
              src={modalIcons.whiteCircle}
              alt=""
              className="border rounded-full h-4 dark:border-none"
            />
            <span className="font-medium text-sm">Claro</span>
          </button>
          {/* Oscuro */}
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-start gap-2 py-2.5 pl-3 pr-20 border rounded-xl focus:outline focus:outline-1.5 
              dark:bg-[#2020226c] dark:border-[#f0efed5b]
              md:pr-[75px]
              `}
          >
            <img
              src={modalIcons.blackCircle}
              alt=""
              className="rounded-full h-4 dark:border dark:border-gray-800"
            />
            <span className="font-medium text-sm">Oscuro</span>
          </button>
        </section>
      </section>

      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm">Lenguaje</span>
          <span className="text-xs font-light">Español</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-black text-white dark:bg-[#2020226c]">
          <img
            src={modalIcons.languageIcon}
            alt="Lenguaje"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Cambiar</span>
        </button>
      </section>
    </section>
  );
}
