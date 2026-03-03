// components/layout/Sidebar.js

// import Link from "next/link";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white border-r p-6 hidden md:block">
//       <h2 className="text-xl font-bold mb-8">ToDo App</h2>

//       <nav className="space-y-3">
//         <Link href="/dashboard" className="block hover:text-indigo-600">
//           Današnje aktivnosti
//         </Link>
//         <Link href="/todos" className="block hover:text-indigo-600">
//           Zadaci
//         </Link>
//         <Link href="/categories" className="block hover:text-indigo-600">
//           Kategorije
//         </Link>
//       </nav>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ mobile = false, onNavigate }) {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block px-3 py-2 rounded-lg transition-colors ${
      pathname === path
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "hover:bg-gray-100"
    }`;

  return (
    <aside
      className={
        mobile
          ? "w-64 bg-white h-full p-6"
          : "w-64 bg-white border-r p-6 hidden md:block"
      }
    >
      <h2 className="text-xl font-bold mb-8">ToDo App</h2>

      <nav className="space-y-2">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className={linkClass("/dashboard")}
        >
          Današnje aktivnosti
        </Link>

        <Link
          href="/todos"
          onClick={onNavigate}
          className={linkClass("/todos")}
        >
          Zadaci
        </Link>

        <Link
          href="/categories"
          onClick={onNavigate}
          className={linkClass("/categories")}
        >
          Kategorije
        </Link>
      </nav>
    </aside>
  );
}
