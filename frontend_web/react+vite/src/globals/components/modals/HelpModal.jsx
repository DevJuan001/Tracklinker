import { actionsIcons } from "../../../assets/icons/actionsIcons";
import useSendSuggestion from "../../hooks/useSendSuggestion";
import Loader from "../ui/Loader";
import ConfirmCancelButtons from "./ConfirmCancelButtons";

export default function HelpModal({ onClose }) {
  const { form, loading, handleChange, handleSubmit } = useSendSuggestion({
    suggestion: "",
  });
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <span className="text-[#75777E] text-sm">
        Si te encontraste con algún error, necesitas ayuda con un registro o
        presentas un problema con la aplicación, puedes comunicarte con nosotros
        y te ayudaremos.
      </span>
      <div className="w-full pr-1 pl-2 pt-2 border border-gray-500 text-black rounded-xl">
        <textarea
          name="suggestion"
          value={form.sugggestion}
          onChange={handleChange}
          className="w-full h-40 outline-none
          placeholder:text-gray-800
          dark:bg-transparent dark:placeholder:text-gray-300"
          placeholder="Escribe aquí tu problema o sugerencia"
        />
      </div>
      <ConfirmCancelButtons
        itemsPosition="end"
        confirmText={loading ? <Loader /> : "Enviar"}
        confirmImageDisplay={loading ? false : true}
        confirmImage={actionsIcons.sendIcon}
        confirmButtonOnClick={(e) => handleSubmit(e)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
