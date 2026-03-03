"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className = "", onClick }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        console.error("Greška pri odjavi");
        return;
      }

      onClick?.();
      router.push("/login");
    } catch (err) {
      console.error("Logout greška:", err);
    } finally {
      setLoading(false);
      onClick?.();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 ${className}`}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
          <span>Odjava...</span>
        </>
      ) : (
        "Odjavi se"
      )}
    </button>
  );
}
