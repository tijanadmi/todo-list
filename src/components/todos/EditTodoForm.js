// src/components/todos/EditTodoForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateTodo,
  deleteReminder,
  createOneTimeReminder,
  createRecurringReminder,
} from "@/app/(protected)/todos/actions";
import toast from "react-hot-toast";

const days = [
  { label: "Pon", value: 1 },
  { label: "Uto", value: 2 },
  { label: "Sre", value: 3 },
  { label: "Čet", value: 4 },
  { label: "Pet", value: 5 },
  { label: "Sub", value: 6 },
  { label: "Ned", value: 0 },
];

export default function EditTodoForm({
  todo,
  categories,
  onSuccess,
  onCancel,
}) {
  const router = useRouter();

  console.log("TDO u EditFormi je: ", todo);

  const [title, setTitle] = useState(todo.title);
  const [categoryId, setCategoryId] = useState(todo.category_id || "");
  const [priority, setPriority] = useState(todo.priority || "medium");

  // Reminder
  const [reminderType, setReminderType] = useState(
    todo.reminder?.reminder_datetime
      ? "single"
      : todo.reminder?.reminder_time
        ? "repeat"
        : "none",
  );

  const [singleDateTime, setSingleDateTime] = useState(
    todo.reminder?.reminder_datetime
      ? new Date(todo.reminder.reminder_datetime).toISOString().slice(0, 16)
      : "",
  );

  const [repeatTime, setRepeatTime] = useState(
    todo.reminder?.reminder_time || "",
  );
  const [repeatDays, setRepeatDays] = useState(
    todo.reminder?.days_of_week || [],
  );

  const toggleDay = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      // 1️⃣ Update todo osnovnih polja
      await updateTodo({
        id: todo.id,
        title,
        categoryId,
        priority,
      });

      // 2️⃣ Reminder logika — uvek prvo obriši postojeći
      if (todo.reminder) {
        await deleteReminder(todo.id);
      }

      // 3️⃣ Ako treba novi, insertuj
      if (reminderType === "single") {
        await createOneTimeReminder(todo.id, singleDateTime);
      }

      if (reminderType === "repeat") {
        await createRecurringReminder(todo.id, repeatTime, repeatDays);
      }

      toast.success("Zadatak uspešno izmenjen ✨");
      if (onSuccess) onSuccess();
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Greška prilikom izmene.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Naziv */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Naziv zadatka"
        className="border px-3 py-2 rounded w-full"
      />

      {/* Kategorija */}
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">Bez kategorije</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Prioritet */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="low">Nizak prioritet</option>
        <option value="medium">Srednji prioritet</option>
        <option value="high">Visok prioritet</option>
      </select>

      {/* Reminder tip */}
      <select
        value={reminderType}
        onChange={(e) => setReminderType(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="none">Bez podsetnika</option>
        <option value="single">Jednokratni</option>
        <option value="repeat">Ponavljajući</option>
      </select>

      {/* Jednokratni */}
      {reminderType === "single" && (
        <input
          type="datetime-local"
          value={singleDateTime}
          onChange={(e) => setSingleDateTime(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      )}

      {/* Ponavljajući */}
      {reminderType === "repeat" && (
        <div className="space-y-3">
          <input
            type="time"
            value={repeatTime}
            onChange={(e) => setRepeatTime(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />

          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                type="button"
                key={day.value}
                onClick={() => toggleDay(day.value)}
                className={`px-3 py-1 rounded border ${
                  repeatDays.includes(day.value)
                    ? "bg-indigo-600 text-white"
                    : "bg-white"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      )}

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
          className="bg-gray-300 px-4 py-2 rounded w-full"
        >
          Odustani
        </button>
      </div>
    </form>
  );
}
