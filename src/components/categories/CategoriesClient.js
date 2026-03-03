// app/(protected)/categories/CategoriesClient.js
"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import AddCategoryForm from "@/components/categories/AddCategoryForm";
import CategoryList from "@/components/categories/CategoryList";

export default function CategoriesClient({ categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Kategorije</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Dodaj kategoriju
        </button>
      </div>

      <CategoryList categories={categories} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Nova kategorija</h2>
        <AddCategoryForm
          onSuccess={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
}
