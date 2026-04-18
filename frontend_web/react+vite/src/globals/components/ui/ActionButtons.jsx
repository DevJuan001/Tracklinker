import { actionsIcons } from "../../../assets/icons/actionsIcons";

export default function ActionButtons({
  children,
  editButtonOnClick,
  deleteButtonVisible = true,
  visibilityIcon = true,
  deleteButtonOnClick,
}) {
  return (
    <section className="flex items-center justify-center gap-5 dark:invert">
      {children}
      <button
        onClick={editButtonOnClick}
        className="transition-colors duration-300 rounded-xl p-1.5 hover:bg-[#969292a8]"
      >
        <img
          src={actionsIcons.editInfoIcon}
          alt=""
          className="dark:brightness-200"
        />
      </button>
      <button
        onClick={deleteButtonOnClick}
        className={`${deleteButtonVisible ? "" : "hidden"}
        transition-colors duration-300 rounded-xl p-1.5 hover:bg-[#969292a8]`}
      >
        <img
          src={
            visibilityIcon
              ? actionsIcons.visibility
              : actionsIcons.lockVisibility
          }
          alt=""
          className="dark:brightness-200"
        />
      </button>
    </section>
  );
}
