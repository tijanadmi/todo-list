// src/components/categories/CategoryList.js

// "use client";

// export default function CategoryList({ categories = [] }) {
//   if (!categories.length) {
//     return <p className="text-gray-500">Nema kategorija.</p>;
//   }

//   return (
//     <div className="space-y-2">
//       {categories.map((cat) => (
//         <div key={cat.id} className="p-3 border rounded flex justify-between">
//           <span>{cat.name}</span>
//           <span
//             className="w-4 h-4 rounded-full"
//             style={{ backgroundColor: cat.color }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import Modal from "@/components/ui/Modal";
import EditCategoryForm from "@/components/categories/EditCategoryForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateCategory,
  deleteCategory,
} from "@/app/(protected)/categories/actions";

import { HiPencil, HiTrash } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function CategoryList({ categories = [] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("#6366F1");
  const [editingCategory, setEditingCategory] = useState(null);

  // const handleEdit = (cat) => {
  //   setEditingId(cat.id);
  //   setEditName(cat.name);
  //   setEditColor(cat.color);
  // };

  const handleUpdate = async (id) => {
    await updateCategory(id, editName, editColor);
    setEditingId(null);
    router.refresh();
  };

  const handleDelete = async (id) => {
    if (!confirm("Da li ste sigurni da želite da obrišete kategoriju?")) return;

    try {
      await deleteCategory(id);

      toast.success("Kategorija je uspešno obrisana.");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Došlo je do greške.");
    }
  };

  if (!categories.length) {
    return <p className="text-gray-500">Nema kategorija.</p>;
  }

  return (
    <>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            {editingId === cat.id ? (
              <div className="flex gap-2 w-full">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />

                <input
                  type="color"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  className="w-10 h-10"
                />

                <button
                  onClick={() => handleUpdate(cat.id)}
                  className="bg-green-600 text-white px-3 rounded"
                >
                  Sačuvaj
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.name}</span>
                </div>

                {/* <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="text-blue-600 text-sm"
                  >
                    Izmeni
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 text-sm"
                  >
                    Obriši
                  </button>
                </div> */}

                <div className="flex gap-3 text-lg">
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="p-2 rounded hover:bg-gray-100 transition text-blue-600 hover:text-blue-800"
                    title="Izmeni"
                  >
                    <HiPencil />
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 rounded hover:bg-gray-100 transition text-red-600 hover:text-red-800"
                    title="Obriši"
                  >
                    <HiTrash />
                  </button>
                </div>
                {/* <Modal
                isOpen={!!editingCategory}
                onClose={() => setEditingCategory(null)}
              >
                <h2 className="text-lg font-semibold mb-4">
                  Izmena kategorije
                </h2>

                {editingCategory && (
                  <EditCategoryForm
                    category={editingCategory}
                    onSuccess={() => setEditingCategory(null)}
                    onCancel={() => setEditingCategory(null)}
                  />
                )}
              </Modal> */}
              </>
            )}
          </div>
        ))}
      </div>
      {/* 🔥 Modal je sada VAN map() */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
      >
        <h2 className="text-lg font-semibold mb-4">Izmena kategorije</h2>

        {editingCategory && (
          <EditCategoryForm
            category={editingCategory}
            onSuccess={() => setEditingCategory(null)}
            onCancel={() => setEditingCategory(null)}
          />
        )}
      </Modal>
    </>
  );
}
