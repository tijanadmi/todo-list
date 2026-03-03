"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import EditTodoForm from "./EditTodoForm";
import Modal from "@/components/ui/Modal";
import { toggleTodo, deleteTodo } from "@/app/(protected)/todos/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TodoList({ todos = [], categories = [] }) {
  const router = useRouter();
  const [editingTodo, setEditingTodo] = useState(null);

  const handleToggle = async (todo) => {
    try {
      await toggleTodo(todo.id, todo.is_completed);
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Greška pri ažuriranju.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Da li ste sigurni da želite da obrišete zadatak?")) return;

    try {
      await deleteTodo(id);
      toast.success("Zadatak je uspešno obrisan.");
      router.refresh();
    } catch {
      toast.error("Greška pri brisanju.");
    }
  };

  if (!todos.length) {
    return <p className="text-gray-500 text-sm">Nema zadataka još uvek.</p>;
  }

  return (
    <>
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={setEditingTodo} // prosleđujemo funkciju za edit
          />
        ))}
      </div>

      {/* Modal za izmenu TODO */}
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
