import { items } from "../../constants/homeSections";
import ActionCard from "./ActionCard";

export default function SectionsContainer() {
  return (
    <section
      className="min-h-[90%] grid grid-cols-4 grid-rows-2 p-[100px_13px] gap-[20px_12px] place-items-center
      xl:p-[140px_250px_240px_300px]
      lg:p-[100px_150px_250px_150px]
      md:p-[50px_50px_200px_50px]"
    >
      {items.map((item) => (
        <ActionCard
          key={item.name}
          itemName={item.name}
          itemPath={item.path}
          itemIcon={item.icon}
          itemAlt={item.alt}
        />
      ))}
    </section>
  );
}
