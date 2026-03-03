"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Greška pri prijavi.");
      }

      toast.success("Uspešno ste se prijavili!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Neuspešna prijava");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-black font-semibold text-center mb-6">
          Prijava
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900"
          />

          <input
            type="password"
            placeholder="Lozinka"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900"
          />

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
          >
            Prijavi se
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm">
            Nemate nalog?{" "}
            <a
              href="/register"
              className="text-blue-700 hover:underline font-medium"
            >
              Registrujte se
            </a>
          </p>

          <p className="text-sm">
            <a href="/reset-password" className="text-blue-700 hover:underline">
              Zaboravili ste lozinku?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
