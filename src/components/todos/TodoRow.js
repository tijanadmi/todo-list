"use client";

import {
  HiPencil,
  HiTrash,
  HiExclamationTriangle,
  HiOutlineExclamationTriangle,
  HiMinusCircle,
  HiBell,
  HiClock,
} from "react-icons/hi2";

export default function TodoRow({ todo, onDelete, onEdit }) {
  const getPriorityIcon = () => {
    switch (todo.priority) {
      case "high":
        return <HiExclamationTriangle className="text-red-500" />;
      case "medium":
        return <HiOutlineExclamationTriangle className="text-amber-500" />;
      case "low":
        return <HiMinusCircle className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getReminderIcon = () => {
    if (!todo.reminder) return null;

    if (todo.reminder.reminder_datetime)
      return <HiBell className="text-indigo-500" />;

    if (todo.reminder.reminder_time)
      return <HiClock className="text-indigo-400" />;

    return null;
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl border hover:bg-gray-100 transition">
      <div className="flex items-center gap-2">
        {getPriorityIcon()}

        <span className="text-sm">{todo.title}</span>

        {getReminderIcon()}
      </div>

      <div className="flex gap-2 text-base">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-600 hover:text-blue-800"
        >
          <HiPencil />
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-600 hover:text-red-800"
        >
          <HiTrash />
        </button>
      </div>
    </div>
  );
}
