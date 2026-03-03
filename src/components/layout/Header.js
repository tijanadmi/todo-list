// components/layout/Header.js
"use client";

import LogoutButton from "./LogoutButton";

import MobileSidebar from "./MobileSidebar";

export default function Header({ user }) {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <p className="text-sm text-gray-600">Dobrodošao, {user.email}</p>
      </div>

      <LogoutButton className="text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium" />
    </header>
  );
}
