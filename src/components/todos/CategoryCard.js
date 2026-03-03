"use client";

import TodoRow from "./TodoRow";

export default function CategoryCard({
  category,
  todos,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: category.color }}>
          {category.name}
        </h2>

        <span className="text-xs text-gray-400">{todos.length}</span>
      </div>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-xs text-gray-400">Nema zadataka</p>
        ) : (
          todos.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}
