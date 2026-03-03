"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger dugme */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-gray-700 text-xl"
      >
        ☰
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          open
            ? "bg-black/40 backdrop-blur-sm opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide panel */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar mobile onNavigate={() => setOpen(false)} />
      </div>
    </>
  );
}
