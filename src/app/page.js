import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Početna / ToDo Lista",
};

export default async function HomePage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  redirect(`/dashboard/`);
}
