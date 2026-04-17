import { modalIcons } from "../../../../assets/icons/modalIcons";

export default function CreditsContent() {
  return (
    <section className="flex flex-col w-full pb-10 gap-7 animate-blurUp dark:text-white">
      {/* Creditos */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">Creditos</span>
            <span className="text-xs">Repositorio de github</span>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-black text-white"
            onClick={() =>
              window.open("https://github.com/DevJuan001/tracklinker", "_blank")
            }
          >
            <img src={modalIcons.githubIcon} alt="Github" className="w-5 h-5" />
            <span className="text-sm font-medium">Github</span>
          </button>
        </div>
      </section>
    </section>
  );
}
