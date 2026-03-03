// import { getTodos, getCategories } from "@/lib/data-service";
// import AddTodoForm from "@/components/todos/AddTodoForm";
// import TodoList from "@/components/todos/TodoList";

// export default async function TodosPage() {
//   const todos = await getTodos();
//   const categories = await getCategories();

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">Moji zadaci</h1>

//       <AddTodoForm categories={categories} />
//       <TodoList todos={todos} />
//     </div>
//   );
// }

import { getTodos, getCategories } from "@/lib/data-service";
import TodosClient from "@/components/todos/TodosClient";

export default async function TodosPage() {
  const todos = await getTodos();
  const categories = await getCategories();

  return <TodosClient todos={todos} categories={categories} />;
}
