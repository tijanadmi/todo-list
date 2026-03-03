"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import EditTodoForm from "./EditTodoForm";
import CategoryCard from "./CategoryCard";
import { /*toggleTodo, */ deleteTodo } from "@/app/(protected)/todos/actions";

export default function TodoBoard({ todos = [], categories = [] }) {
  const router = useRouter();
  const [editingTodo, setEditingTodo] = useState(null);

  const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2,
  };

  //   const handleToggle = async (todo) => {
  //     try {
  //       await toggleTodo(todo.id, todo.is_completed);
  //       router.refresh();
  //     } catch (err) {
  //       toast.error(err.message || "Greška pri ažuriranju.");
  //     }
  //   };

  const handleDelete = async (id) => {
    if (!confirm("Da li ste sigurni da želite da obrišete zadatak?")) return;

    try {
      await deleteTodo(id);
      toast.success("Zadatak je obrisan.");
      router.refresh();
    } catch {
      toast.error("Greška pri brisanju.");
    }
  };

  const grouped = categories.map((category) => {
    const categoryTodos = todos
      .filter((t) => t.category_id === category.id)
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return {
      ...category,
      todos: categoryTodos,
    };
  });

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {grouped.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            todos={category.todos}
            // onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={setEditingTodo}
          />
        ))}
      </div>

      <Modal isOpen={!!editingTodo} onClose={() => setEditingTodo(null)}>
        <h2 className="text-lg font-semibold mb-4">Izmena zadatka</h2>

        {editingTodo && (
          <EditTodoForm
            todo={editingTodo}
            categories={categories}
            onSuccess={() => setEditingTodo(null)}
            onCancel={() => setEditingTodo(null)}
          />
        )}
      </Modal>
    </>
  );
}
