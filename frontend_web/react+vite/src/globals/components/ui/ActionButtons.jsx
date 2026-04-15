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
      <button onClick={editButtonOnClick}>
        <img
          src={actionsIcons.editInfoIcon}
          alt=""
          className="dark:brightness-200 hover:scale-125"
        />
      </button>
      <button
        onClick={deleteButtonOnClick}
        className={`${deleteButtonVisible ? "" : "hidden"}`}
      >
        <img
          src={
            visibilityIcon
              ? actionsIcons.visibility
              : actionsIcons.lockVisibility
          }
          alt=""
          className="dark:brightness-200 hover:scale-125"
        />
      </button>
    </section>
  );
}
