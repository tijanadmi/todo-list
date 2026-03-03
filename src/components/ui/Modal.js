"use client";

// import { useEffect } from "react";

// export default function Modal({ isOpen, onClose, children }) {
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal box */}
//       <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

"use client";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
        {/* Dugme za zatvaranje */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
          aria-label="Zatvori modal"
        >
          ✕
        </button>

        {children}

        {/* Alternativno dugme Odustani ispod forme */}
        {/* <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-400"
          >
            Odustani
          </button>
        </div> */}
      </div>
    </div>
  );
}
