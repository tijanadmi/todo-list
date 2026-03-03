// app/(protected)/dashboard/page.js

// import StatsCard from "@/components/dashboard/StatsCard";

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatsCard title="Ukupno zadataka" value="12" />
//         <StatsCard title="Završeni" value="8" />
//         <StatsCard title="Aktivni podsetnici" value="3" />
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-lg font-medium mb-4">Današnji zadaci</h2>
//         <p className="text-gray-500">Ovde će ići lista zadataka za danas.</p>
//       </div>
//     </div>
//   );
// }

import { getTodaysTodos } from "@/lib/data-service";
import { toggleTodoCompletion } from "@/app/(protected)/dashboard/actions";
import StatsCard from "@/components/dashboard/StatsCard";
import TodoItem from "@/components/dashboard/TodoItem";

// export default async function DashboardPage() {
//   const { todos, total, completed, activeReminders } = await getTodaysTodos();

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatsCard title="Ukupno zadataka" value={total} />
//         <StatsCard title="Završeni" value={completed} />
//         <StatsCard title="Aktivni podsetnici" value={activeReminders} />
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-lg font-medium mb-4">Današnji zadaci</h2>

//         {todos.length === 0 && (
//           <p className="text-gray-500">Nema zadataka za danas 🎉</p>
//         )}

//         <ul className="space-y-3">
//           {todos.map((todo) => (
//             <TodoItem
//               key={todo.id}
//               todo={todo}
//               toggleAction={toggleTodoCompletion}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

export default async function DashboardPage() {
  const { grouped, total, completed, activeReminders } = await getTodaysTodos();

  const Section = ({ title, todos }) => {
    if (!todos.length) return null;

    return (
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleAction={toggleTodoCompletion}
            />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Današnje aktivnosti</h1>

      <div className="grid grid-cols-3 gap-3 md:gap-6">
        <StatsCard title="Ukupno danas" value={total} />
        <StatsCard title="Završeni" value={completed} />
        <StatsCard title="Aktivni podsetnici" value={activeReminders} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <Section title="🔴 Hitno danas" todos={grouped.high} />
        <Section title="🟡 Planirano" todos={grouped.medium} />
        <Section title="🟢 Ako stigneš" todos={grouped.low} />

        {total === 0 && (
          <p className="text-gray-500 text-center">Nema zadataka za danas 🎉</p>
        )}
      </div>
    </div>
  );
}
