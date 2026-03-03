"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Lozinka je obavezna.");
      return;
    }

    if (password.length < 6) {
      toast.error("Lozinka mora imati najmanje 6 karaktera.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Lozinke se ne poklapaju.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // 🔐 ODMAH IZLOGUJ KORISNIKA
      // await supabase.auth.signOut();

      // 🔐 POZOVI SERVER LOGOUT (briše SSR cookie)
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      toast.success("Lozinka je uspešno promenjena. Prijavite se ponovo.");

      setTimeout(() => {
        router.push("/"); // login stranica
      }, 1000);
    } catch (err) {
      toast.error(err.message || "Došlo je do greške.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Promeni lozinku
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nova lozinka"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 px-3 py-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Potvrda lozinke"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 px-3 py-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
          >
            Sačuvaj
          </button>
        </form>
      </div>
    </div>
  );
}
