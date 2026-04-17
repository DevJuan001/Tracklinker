export default function ConfirmCancelButtons({
  disabled = false,
  itemsPosition = "center",
  flexDirection,
  confirmImage,
  confirmImageDisplay = false,
  confirmText = "Confirmar",
  confirmBgColor = "black",
  confirmButtonOnClick,
  cancelText = "Cancelar",
  cancelButtonWidth,
  cancelButtonOnClick,
  confirmBtnRef,
}) {
  return (
    <section
      className={`flex ${flexDirection} items-center self-${itemsPosition} pt-5 gap-2`}
    >
      <button
        ref={confirmBtnRef}
        onClick={confirmButtonOnClick}
        className={`h-11 flex items-center px-6 py-2.5 gap-2 font-medium text-sm bg-${confirmBgColor} text-white  rounded-2xl transition duration-300
            hover:text-gray-300
            dark:bg-white dark:text-black dark:hover:text-gray-800`}
      >
        <img
          src={confirmImage}
          alt=""
          className={`w-5 h-5 invert dark:invert-0 ${confirmImageDisplay ? "block" : "hidden"}`}
        />
        <span>{confirmText}</span>
      </button>
      <button
        disabled={disabled}
        onClick={cancelButtonOnClick}
        className={`${cancelButtonWidth} h-11 px-5 py-2.5 rounded-2xl text-sm transition duration-300 border border-gray-200 
            hover:bg-gray-200
            dark:text-white dark:hover:bg-[#101012] dark:border-gray-900`}
      >
        <span>{cancelText}</span>
      </button>
    </section>
  );
}
