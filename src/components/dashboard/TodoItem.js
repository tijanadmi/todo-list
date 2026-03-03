"use client";

import { useTransition } from "react";

const priorityBorder = {
  high: "border-l-4 border-red-500",
  medium: "border-l-4 border-yellow-500",
  low: "border-l-4 border-green-500",
};

export default function TodoItem({ todo, toggleAction }) {
  const [isPending, startTransition] = useTransition();
  const handleToggle = () => {
    startTransition(() => {
      toggleAction(todo.id);
    });
  };

  return (
    // <li className="flex items-center gap-3 border-b pb-2">
    <li
      className={`flex items-center gap-3 p-2 ${priorityBorder[todo.priority]}`}
    >
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={handleToggle}
        disabled={isPending}
      />

      <span className={todo.is_completed ? "line-through text-gray-400" : ""}>
        {todo.title}
      </span>
    </li>
  );
}
