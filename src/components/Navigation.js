"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Navigation({ onLinkClick, user = null }) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  // const router = useRouter();
  const adminRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setIsAdminOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Početna" },
    { href: "/about", label: "O meni" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      {/* Desktop meni */}
      <nav className="hidden md:flex gap-6 text-lg items-center">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}

        {!user ? (
          <Link href="/login" className="font-semibold text-pink-600">
            Prijavi se
          </Link>
        ) : (
          <div ref={adminRef} className="relative">
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="font-semibold text-pink-600"
            >
              Admin ▾
            </button>
            {isAdminOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 py-2 z-50">
                <Link
                  href="/my_posts"
                  className="block px-4 py-2 hover:bg-pink-100"
                  onClick={(e) => {
                    setIsAdminOpen(false);
                    onLinkClick?.(e);
                  }}
                >
                  Postovi
                </Link>
                <Link
                  href="/my_posts/form/new"
                  className="block px-4 py-2 hover:bg-pink-100"
                  onClick={(e) => {
                    setIsAdminOpen(false);
                    onLinkClick?.(e);
                  }}
                >
                  Novi Post
                </Link>
                <LogoutButton
                  className="block w-full text-left px-4 py-2 hover:bg-pink-100"
                  onClick={(e) => {
                    setIsAdminOpen(false);
                    onLinkClick?.(e);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobilni meni */}
      <div className="md:hidden bg-white shadow-md px-4 py-2 flex flex-col items-start gap-2">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="py-2" onClick={onLinkClick}>
            {label}
          </Link>
        ))}

        {!user ? (
          <Link href="/login" className="py-2" onClick={onLinkClick}>
            Login
          </Link>
        ) : (
          <>
            <Link href="/my_posts" className="py-2" onClick={onLinkClick}>
              Postovi
            </Link>
            <Link
              href="/my_posts/form/new"
              className="py-2"
              onClick={onLinkClick}
            >
              Novi Post
            </Link>
            <LogoutButton
              className="py-2 text-left w-full"
              onClick={onLinkClick}
            />
          </>
        )}
      </div>
    </>
  );
}
