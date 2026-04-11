import Aside from "./Aside";

export default function Layout({ avatarOnClick, helpOnClick, children }) {
  return (
    // Container
    <div
      className="w-screen h-screen grid grid-cols-1 grid-rows-[1fr_80px]
        md:grid-cols-[120px_1fr] md:grid-rows-1
        xl:grid-cols-[270px_85%] xl:grid-rows-1
        "
    >
      <Aside avatarOnClick={avatarOnClick} helpOnClick={helpOnClick} />
      <main
        className="min-w-full max-h-full px-0.5 py-4 dark:bg-black overflow-hidden order-1
        md:order-2
        xl:order-2"
      >
        {children}
      </main>
    </div>
  );
}
