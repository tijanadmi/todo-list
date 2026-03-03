// app/(protected)/layout.js

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default async function ProtectedLayout({ children }) {
  const supabase = createServerSupabaseClient();

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
