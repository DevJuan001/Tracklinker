import { NavLink } from "react-router-dom";
import {
  avatarItem,
  firstSectionItems,
  secondSectionItems,
  mobileRelevantItems,
  mobileItems,
} from "../../../constants/asideMenuItems";
import { useUser } from "../../hooks/useUser";
import { asideIcons } from "../../../assets/icons/asideIcons";
import { useState } from "react";

// Menú lateral principal de opciones
export default function Aside({ avatarOnClick, helpOnClick }) {
  const { user } = useUser();
  const [openMore, setOpenMore] = useState(false);

  return (
    <aside
      className="flex order-2 h-[65px]
      md:h-full md:flex-col md:order-1 md:px-5 md:pt-5
      xl:h-full xl:flex-col xl:row-span-2 xl:px-3 xl:pt-5 xl:order-1
      dark:bg-black"
    >
      {/* Menús de opciones - Mobile */}
      <section
        className="relative w-screen p-1
        sm:hidden md:hidden xl:hidden"
      >
        <ul className="flex w-auto">
          {mobileRelevantItems.map((item) => (
            <li key={item.name} className="rounded-xl hover:bg-[#7e808854]">
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <section
                    className={`w-auto h-14 flex flex-col py-2.5 px-5 items-center justify-center subpixel-antialiased rounded-xl transition duration-300 group
                        ${
                          isActive
                            ? `bg-black font-medium shadow-[0px_0px_32px_-9px_#000000] text-white fill-white
                        dark:bg-white dark:text-black dark:shadow-[0px_0px_32px_-11px_#ffffff] animate-clickEffect`
                            : `text-[#75777E] font-normal dark:text-[7E8088]`
                        }`}
                  >
                    <item.icon
                      className={`group-hover:stroke-black
                          ${
                            isActive
                              ? "fill-white scale-105 stroke-none animate-iconFill dark:fill-black"
                              : "stroke-[60] stroke-[#75777E] fill-none group-hover:stroke-[90] dark:group-hover:stroke-white"
                          }`}
                    />
                    <div
                      className={`flex gap-1 text-center font-medium
                        ${isActive ? "" : "group-hover:text-black dark:group-hover:text-white"}
                        `}
                    >
                      <span className="text-nowrap text-[10px]">
                        {item.name}
                      </span>
                    </div>
                  </section>
                )}
              </NavLink>
            </li>
          ))}
          <li
            key={"Más"}
            onClick={() => setOpenMore(!openMore)}
            className="w-auto rounded-xl cursor-pointer hover:bg-[#7e808854]"
          >
            <section
              className={`w-auto h-14 flex flex-col py-2.5 px-5 items-center justify-center rounded-xl group`}
            >
              <asideIcons.moreIcon className="fill-[#75777E] group-hover:fill-black dark:group-hover:fill-white" />
              <div
                className={`flex gap-1 text-center font-medium text-[#75777E]`}
              >
                <span
                  className="text-nowrap text-[10px] group-hover:text-black
                dark:group-hover:text-white"
                >
                  Más
                </span>
              </div>
            </section>
          </li>
        </ul>
        {openMore && (
          <div
            className="w-auto h-auto absolute bottom-full right-4 rounded-lg border bg-white z-10 animate-blurUp
          dark:bg-[#1a1a1a] dark:text-white dark:border-none"
          >
            <button
              onClick={avatarOnClick}
              className="w-full h-full flex items-center justify-center py-1.5 px-4 gap-2.5 rounded-lg transition duration-300
              hover:bg-gray-200 dark:text-gray-50
              xl:justify-start
              "
            >
              <img
                src={avatarItem.icon}
                alt={avatarItem.alt}
                className="w-8 h-8"
              />
              <section className="hidden xl:block text-center">
                <span className="text-[#4a4a4d] font-medium dark:text-[#7E8088]">
                  {user.name} {user.first_surname}
                </span>
              </section>
            </button>
            {mobileItems.map((item) => (
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <section
                    className={`w-auto h-14 flex flex-col py-2.5 px-5 items-center justify-center subpixel-antialiased rounded-xl transition duration-300 group
                      hover:bg-[#7e808854]
                    ${
                      isActive
                        ? `bg-black font-medium shadow-[0px_0px_32px_-9px_#000000] text-white fill-white
                    dark:bg-white dark:text-black dark:shadow-[0px_0px_32px_-11px_#ffffff] animate-clickEffect`
                        : `text-[#75777E] font-normal dark:text-[7E8088]`
                    }`}
                  >
                    <item.icon
                      className={`group-hover:stroke-black
                      ${
                        isActive
                          ? "fill-white scale-105 stroke-none animate-iconFill dark:fill-black"
                          : "stroke-[60] stroke-[#75777E] fill-none group-hover:stroke-[90] dark:group-hover:stroke-white"
                      }`}
                    />
                    <div
                      className={`flex gap-1 text-center font-medium
                      ${isActive ? "" : "group-hover:text-black dark:group-hover:text-white"}
                      `}
                    >
                      <span className="text-[9px]">{item.name}</span>
                    </div>
                  </section>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </section>

      {/* Menús de opciones - Desktop */}
      <nav className="hidden h-full sm:block md:flex xl:flex flex-col justify-between gap-1 order-1">
        {/* Primera Sección */}
        <section className="flex">
          <ul
            className="min-w-full flex gap-[3px]
            md:flex-col
            xl:flex-col"
          >
            <li>
              <button
                onClick={avatarOnClick}
                className="w-full h-full flex items-center justify-center py-1.5 gap-2.5 rounded-2xl transition duration-300
              hover:bg-gray-200 
              dark:text-gray-50 dark:hover:bg-[#202022]
              xl:justify-start xl:pl-6
              "
              >
                <img
                  src={avatarItem.icon}
                  alt={avatarItem.alt}
                  className="w-8 h-8"
                />
                <section className="hidden text-center xl:block">
                  <span className="text-[#75777E] font-medium dark:text-[#7E8088]">
                    {user.name} {user.first_surname}
                  </span>
                </section>
              </button>
            </li>
            {/* Esto lo que hace es recorrer la constante y traer los datos uno a uno e ir creando un li para cada uno */}
            {firstSectionItems.map((item) => (
              <li key={item.name}>
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <section
                      className={`w-auto h-14 flex flex-col items-center py-3 justify-center subpixel-antialiased rounded-2xl transition duration-300 group
                        md:w-full md:h-full md:py-4
                        xl:w-full xl:h-full xl:flex-row xl:pl-7 xl:py-3 xl:gap-2.5 xl:justify-start
                        ${
                          isActive
                            ? `bg-black font-medium shadow-[0px_0px_32px_-9px_#000000] text-white fill-white
                        dark:bg-white dark:text-black dark:shadow-[0px_0px_32px_-11px_#ffffff] animate-clickEffect`
                            : `text-[#75777E] font-normal hover:bg-gray-200
                        dark:text-[7E8088] dark:hover:bg-[#3b3b3f98]`
                        }`}
                    >
                      <item.icon
                        className={`w-6 h-6 group-hover:stroke-black
                          ${
                            isActive
                              ? "fill-white scale-105 stroke-none animate-iconFill dark:fill-black"
                              : "stroke-[90] stroke-[#75777eb7] fill-none group-hover:stroke-[90] group-hover:stroke-[#ffffff] dark:group-hover:stroke-white"
                          }`}
                      />
                      <div
                        className={`flex gap-1 text-center font-medium
                        ${isActive ? "" : "group-hover:text-black dark:group-hover:text-white"}
                        `}
                      >
                        <span
                          className="text-nowrap text-xs  
                          md:hidden 
                          xl:block xl:text-base"
                        >
                          {item.name}
                        </span>
                        <span
                          className="text-nowrap text-xs hidden
                          xl:block xl:text-base"
                        >
                          {item.nameTwo}
                        </span>
                      </div>
                    </section>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
        {/* Segunda Sección */}
        <section
          className="order-2
            md:py-3
            xl:py-4"
        >
          <ul className="flex flex-col gap-[3px]">
            <span className="text-sm text-[#75777eb7] pb-2 md:pl-1 xl:pl-3">
              Otros
            </span>
            {secondSectionItems.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl hover:bg-gray-200 transition duration-300 dark:hover:bg-[#3b3b3f98]"
              >
                {item.path ? (
                  <NavLink to={item.path} onClick={item.onClick}>
                    <section
                      className="w-20 h-14 flex items-center justify-center gap-2.5 py-2.5 subpixel-antialiased text-[#75777E] group
                      dark:text-[7E8088]
                      md:pl-0
                      xl:w-full xl:h-auto xl:justify-start xl:pl-7"
                    >
                      <item.icon className="stroke-[80] stroke-[#75777eb7] fill-none group-hover:stroke-black group-hover:stroke-[90] dark:group-hover:stroke-[#ffffff]" />
                      <span className="hidden font-medium group-hover:text-black dark:group-hover:text-white xl:block">
                        {item.name}
                      </span>
                    </section>
                  </NavLink>
                ) : (
                  <button onClick={helpOnClick} className="w-full">
                    <section
                      className="w-full h-full flex items-center justify-center gap-2.5 py-2.5 pl-7  subpixel-antialiased text-[#75777E] group
                      md:pl-0
                      xl:w-full xl:h-auto xl:justify-start xl:pl-7"
                    >
                      <item.icon className="w-6 h-6 stroke-[80] stroke-[#75777eb7] fill-none group-hover:stroke-black group-hover:stroke-[90] dark:group-hover:stroke-[#ffffff]" />
                      <span className="hidden font-medium group-hover:text-black dark:group-hover:text-white xl:block">
                        {item.name}
                      </span>
                    </section>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </nav>
    </aside>
  );
}
