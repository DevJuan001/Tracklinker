// Hooks
import { useLogin } from "../../hooks/useLogin";
// Iconos
import { loginIcons } from "../../../../assets/icons/loginIcons";
import { actionsIcons } from "../../../../assets/icons/actionsIcons";
// Components
import FormButtons from "./FormButtons";
import Loader from "../../../../globals/components/ui/Loader";

export default function LoginForm({ openModal }) {
  const {
    setEmail,
    setPassword,
    handleLogin,
    showPassword,
    setShowPassword,
    loading,
  } = useLogin(openModal);
  return (
    <section className="w-full h-full flex items-center justify-center">
      {/* Container del formulario */}
      <div className="min-w-[500px] flex flex-col items-center px-4 py-8 ">
        {/* Icono de Tracklinker */}
        <img
          src={loginIcons.tracklinkerIcon}
          alt=""
          className="w-[150px] h-[150px] dark:invert dark:brightness-0"
        />
        <form className="w-[370px] flex flex-col gap-1.5 dark:text-white">
          {/* Campo del correo */}
          <div>
            <span className="text-sm font-medium">Correo</span>
            <div className="h-14 flex rounded-xl border dark:border-gray-700">
              <input
                id="email-input"
                type="text"
                placeholder="tu@correo.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-3 text-sm rounded-xl outline-none bg-transparent
                autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]
                dark:text-white dark:placeholder:text-[#7c7c7cb5]"
              />
            </div>
          </div>

          {/* Campo de la contraseña */}
          <div>
            <span className="text-sm font-medium">Contraseña</span>
            <div className="h-14 flex items-center rounded-xl border dark:border-gray-700">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 text-sm outline-none rounded-xl bg-transparent
                autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]
                dark:text-white dark:placeholder:text-[#7c7c7cb5]"
              />

              <button
                className="pr-2"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  src={
                    showPassword
                      ? actionsIcons.visibility
                      : actionsIcons.lockVisibility
                  }
                  alt=""
                  className="dark:invert dark:brightness-0"
                />
              </button>
            </div>
          </div>
          {/* Botones de Ingresar y recuperar contraseña */}
          <FormButtons
            getIntoButtonText={loading ? <Loader /> : "Ingresar"}
            getIntoButtonOnclick={(e) => handleLogin(e)}
            recoverButtonOnclick={(e) =>
              openModal(null, "rememberPassword", null, e.currentTarget)
            }
          />
        </form>
      </div>
    </section>
  );
}
