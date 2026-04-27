import Aside from "./Aside";

export default function Layout({ avatarOnClick, helpOnClick, children }) {
  return (
    // Container
    <div
      className="min-h-screen min-w-screen max-w-screen max-h-screen grid grid-cols-1 grid-rows-[1fr_65px]
        md:grid-cols-[110px_1fr] md:grid-rows-1
        xl:grid-cols-[260px_1fr] xl:grid-rows-1
        "
    >
      <Aside avatarOnClick={avatarOnClick} helpOnClick={helpOnClick} />
      <main
        className="min-w-full h-full pl-0.5 pr-3 py-2 dark:bg-black overflow-hidden order-1
        md:order-2 md:py-4 md:max-h-full
        xl:order-2 xl:pb-3 xl:max-h-full"
      >
        {children}
      </main>
    </div>
  );
}
