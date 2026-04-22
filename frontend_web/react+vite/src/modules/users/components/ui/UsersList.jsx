import UserItem from "./UserItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UsersList({ users, loading, openModal }) {
  const noUsers = users.length === 0 && !loading;
  const isFirstLoad = users.length === 0 && loading;

  return (
    /* Contenedor de los usuarios */
    <section className="max-h-[95%] max-w-full overflow-x-auto overflow-y-auto overflow-hidden">
      <ul className="flex flex-col gap-1">
        {noUsers && (
          <span className="text-center dark:text-white pt-5">
            No se encontraron usuarios
          </span>
        )}
        {isFirstLoad ? (
          <SkeletonTheme baseColor="#f3eef5" highlightColor="#c5c1c7">
            <li>
              <Skeleton height={"68px"} count={13} borderRadius={"8px"} />
            </li>
          </SkeletonTheme>
        ) : (
          users.map((user) => (
            // Usuarios
            <UserItem
              key={user.id}
              user={user}
              openModal={openModal}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(user, "edit", null, e.currentTarget);
              }}
            />
          ))
        )}
      </ul>
    </section>
  );
}
