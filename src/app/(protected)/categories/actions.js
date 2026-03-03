"use server";

import { createActionSupabaseClient } from "@/lib/supabase/action";

export async function createCategory(name, color = "#6366F1") {
  const supabase = await createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Niste prijavljeni");

  const { error } = await supabase.from("categories").insert({
    user_id: user.id,
    name,
    color,
  });

  if (error) throw new Error(error.message);
}

export async function updateCategory(id, name, color) {
  const supabase = await createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Niste prijavljeni");

  const { error } = await supabase
    .from("categories")
    .update({ name, color })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

export async function deleteCategory(id) {
  const supabase = await createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Niste prijavljeni");

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}
