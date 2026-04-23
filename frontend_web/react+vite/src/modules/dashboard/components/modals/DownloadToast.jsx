export default function DownloadToast({ showDownloadToast, onClose }) {
  if (showDownloadToast === true) {
    setTimeout(() => {
      onClose();
    }, 3500);
  }

  return (
    <section
      className="fixed inset-0 z-10 flex items-start justify-center gap-5 pr-5 pb-5 pt-5 animate-toastIn
    dark:text-white pointer-events-auto"
    >
      <div
        className="relative border bg-green-200 rounded-full shadow-md shadow-green-300 py-1.5 px-3 animate-toastIn
      dark:bg-black dark:border-[#7e77773b]"
      >
        <span className="font-medium text-green-600 text-sm">
          Descarga exitosa
        </span>
      </div>
    </section>
  );
}
