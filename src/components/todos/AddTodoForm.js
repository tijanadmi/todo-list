// src/components/todos/AddTodoForm.js

"use client";

import { useState } from "react";
import {
  createTodo,
  createOneTimeReminder,
  createRecurringReminder,
} from "@/app/(protected)/todos/actions";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const days = [
  { label: "Pon", value: 1 },
  { label: "Uto", value: 2 },
  { label: "Sre", value: 3 },
  { label: "Čet", value: 4 },
  { label: "Pet", value: 5 },
  { label: "Sub", value: 6 },
  { label: "Ned", value: 0 },
];

export default function AddTodoForm({ categories = [], onSuccess, onCancel }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState("medium");

  const [reminderType, setReminderType] = useState("none");
  const [singleDateTime, setSingleDateTime] = useState("");
  const [repeatTime, setRepeatTime] = useState("");
  const [repeatDays, setRepeatDays] = useState([]);

  const toggleDay = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      // 1️⃣ Kreiraj todo
      const newTodo = await createTodo({
        title,
        categoryId,
        priority,
      });

      // 2️⃣ Reminder logika
      if (reminderType === "single" && singleDateTime) {
        await createOneTimeReminder(newTodo.id, singleDateTime);
      }

      if (reminderType === "repeat" && repeatTime && repeatDays.length > 0) {
        await createRecurringReminder(newTodo.id, repeatTime, repeatDays);
      }

      toast.success("Zadatak uspešno kreiran ✨");

      // reset
      setTitle("");
      setCategoryId("");
      setPriority("medium");
      setReminderType("none");
      setSingleDateTime("");
      setRepeatTime("");
      setRepeatDays([]);

      if (onSuccess) onSuccess();

      router.refresh();
    } catch (err) {
      toast.error(err.message || "Greška prilikom kreiranja zadatka.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Naziv */}
      <input
        type="text"
        placeholder="Naziv zadatka"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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

      {/* Jednokratni reminder */}
      {reminderType === "single" && (
        <input
          type="datetime-local"
          value={singleDateTime}
          onChange={(e) => setSingleDateTime(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      )}

      {/* Ponavljajući reminder */}
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
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          Dodaj
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
