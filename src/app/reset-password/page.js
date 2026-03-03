"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

import toast from "react-hot-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email je obavezan.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Proverite vaš email za link za reset lozinke.");
    } catch (err) {
      toast.error(err.message || "Došlo je do greške.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-black text-center mb-6">
          Reset lozinke
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-900 font-medium">
              Email adresa
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
          >
            Pošalji link
          </button>
        </form>
      </div>
    </div>
  );
}
