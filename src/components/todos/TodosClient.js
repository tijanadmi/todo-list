"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import AddTodoForm from "@/components/todos/AddTodoForm";
// import TodoList from "@/components/todos/TodoList";
import TodoBoard from "@/components/todos/TodoBoard";

export default function TodosClient({ todos, categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">ToDo lista</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Dodaj zadatak
        </button>
      </div>

      {/* <TodoList todos={todos} categories={categories} /> */}
      <TodoBoard todos={todos} categories={categories} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Novi zadatak</h2>

        <AddTodoForm
          categories={categories}
          onSuccess={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
}
