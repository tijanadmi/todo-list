// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createCategory } from "@/app/(protected)/categories/actions";
// // ili gde ti se ta funkcija nalazi

// export default function AddCategoryForm({ onSuccess }) {
//   const [name, setName] = useState("");
//   const [color, setColor] = useState("#6366F1");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) return;

//     try {
//       await createCategory(name, color);
//       setName("");
//       setColor("#6366F1");
//       if (onSuccess) onSuccess();
//       router.refresh();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Naziv kategorije"
//         className="border px-3 py-2 rounded w-full"
//       />

//       <input
//         type="color"
//         value={color}
//         onChange={(e) => setColor(e.target.value)}
//         className="w-full h-10 rounded border p-0"
//         // className="w-10 h-10 p-0 border rounded"
//       />

//       <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
//         Dodaj
//       </button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/app/(protected)/categories/actions";

import toast from "react-hot-toast";

export default function AddCategoryForm({ onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366F1");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory(name, color);
      setName("");
      setColor("#6366F1");
      if (onSuccess) onSuccess();
      toast.success("Kategorija je uspešno kreirana.");

      router.refresh();
    } catch (err) {
      toast.error(err.message || "Došlo je do greške.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Naziv kategorije"
        className="border px-3 py-2 rounded w-full"
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-10 rounded border p-0"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          Dodaj
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-400"
        >
          Odustani
        </button>
      </div>
    </form>
  );
}
