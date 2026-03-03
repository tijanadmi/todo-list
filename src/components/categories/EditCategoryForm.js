"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/app/(protected)/categories/actions";

export default function EditCategoryForm({ category, onSuccess, onCancel }) {
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCategory(category.id, name, color);
    if (onSuccess) onSuccess();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
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
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Sačuvaj izmene
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
