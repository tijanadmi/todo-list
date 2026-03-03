// // src/components/todos/TodoItem.js
// "use client";

// import { HiPencil, HiTrash } from "react-icons/hi2";
// import { deleteTodo, toggleTodo } from "@/app/(protected)/todos/actions";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function TodoItem({ todo, onEdit }) {
//   const router = useRouter();

//   const handleDelete = async () => {
//     if (!confirm("Da li ste sigurni da želite da obrišete zadatak?")) return;

//     try {
//       await deleteTodo(todo.id);
//       toast.success("Zadatak je uspešno obrisan.");
//       router.refresh();
//     } catch (error) {
//       toast.error(error.message || "Došlo je do greške.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border">
//       <div className="flex items-center gap-3">
//         <input
//           type="checkbox"
//           checked={todo.is_completed} // koristi is_completed iz baze
//           onChange={async () => {
//             try {
//               await toggleTodo(todo.id, todo.is_completed);
//               router.refresh();
//             } catch (err) {
//               toast.error(err.message || "Greška pri ažuriranju zadatka.");
//             }
//           }}
//           className="w-4 h-4"
//         />
//         <div>
//           <p
//             className={`font-medium ${todo.completed ? "line-through text-gray-400" : ""}`}
//           >
//             {todo.title}
//           </p>
//           {todo.due_date && (
//             <p className="text-xs text-gray-500">
//               ⏰ {new Date(todo.due_date).toLocaleString()}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* <button onClick={() => setEditingTodo(todo)}>
//         <HiPencil />
//       </button> */}

//       <div className="flex gap-3 text-lg">
//         <button
//           onClick={() => onEdit(todo)}
//           className="p-2 rounded hover:bg-gray-100 transition text-blue-600 hover:text-blue-800"
//           title="Izmeni"
//         >
//           <HiPencil />
//         </button>

//         <button
//           onClick={handleDelete}
//           className="p-2 rounded hover:bg-gray-100 transition text-red-600 hover:text-red-800"
//           title="Obriši"
//         >
//           <HiTrash />
//         </button>
//       </div>
//     </div>
//   );
// }

// src/components/todos/TodoItem.js
"use client";

import { HiPencil, HiTrash } from "react-icons/hi2";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={() => onToggle(todo)}
          className="w-4 h-4"
        />

        <div>
          <p
            className={`font-medium ${
              todo.is_completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </p>

          {todo.due_date && (
            <p className="text-xs text-gray-500">
              ⏰ {new Date(todo.due_date).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 text-lg">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 rounded hover:bg-gray-100 transition text-blue-600 hover:text-blue-800"
          title="Izmeni"
        >
          <HiPencil />
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 rounded hover:bg-gray-100 transition text-red-600 hover:text-red-800"
          title="Obriši"
        >
          <HiTrash />
        </button>
      </div>
    </div>
  );
}
