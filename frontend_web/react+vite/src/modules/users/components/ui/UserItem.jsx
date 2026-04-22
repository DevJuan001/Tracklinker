import { userStatus } from "../../constants/userStatus";
import { usersIcons } from "../../../../assets/icons/usersIcons";
import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function UserItem({
  user,
  openModal,
  editButtonOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-lg transition duration-300 cursor-pointer
      hover:bg-[#9692923b]
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
      key={user.id}
      onClick={editButtonOnClick}
    >
      {/* Datos del Usuario */}
      <article>
        <address className="flex items-center gap-3 not-italic font-medium dark:text-white">
          <p className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl">
            {user.name} {user.first_surname} {user.second_surname}
          </p>
          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center">
            <img
              src={usersIcons.phoneIcon}
              alt=""
              className="w-5 h-5 dark:invert"
            />
            <p>{user.phone}</p>
          </div>
          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center">
            <img
              src={usersIcons.rolIcon}
              alt=""
              className="w-5 h-5 dark:invert"
            />
            <p>{user.rol_name}</p>
          </div>
          <div
            className={`flex items-center px-2 py-0.5 gap-1 rounded-full border text-xs ${userStatus[user.status]?.styles}`}
          >
            <img src={userStatus[user.status]?.icon} alt="" />
            <span>{userStatus[user.status]?.text}</span>
          </div>
        </address>
      </article>

      <ActionButtons
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={(e) => {
          e.stopPropagation();
          openModal(
            user,
            userStatus[user.status]?.modalType,
            null,
            e.currentTarget,
          );
        }}
        visibilityIcon={userStatus[user.status]?.visibilityIcon}
      />
    </li>
  );
}
