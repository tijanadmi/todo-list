"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Ime i prezime je obavezno.");
      return;
    }

    if (!email.trim()) {
      toast.error("Email je obavezan.");
      return;
    }

    if (!password.trim()) {
      toast.error("Lozinka je obavezna.");
      return;
    }

    if (password.length < 6) {
      toast.error("Lozinka mora imati najmanje 6 karaktera.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Lozinke se ne poklapaju!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullName", fullName);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Greška pri registraciji.");
      }

      toast.success("Registracija uspešna! Proverite email za potvrdu.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Došlo je do greške.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-black font-semibold text-center mb-6">
          Registracija
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ime i prezime"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 px-3 py-2 rounded-md"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 px-3 py-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 px-3 py-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Potvrda lozinke"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 px-3 py-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Registruj se
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Već imate nalog?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Prijavite se
          </a>
        </p>
      </div>
    </div>
  );
}
