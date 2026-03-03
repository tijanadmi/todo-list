"use server";

import { revalidatePath } from "next/cache";
import { createActionSupabaseClient } from "@/lib/supabase/action";

export async function toggleTodoCompletion(todoId) {
  const supabase = await createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Niste prijavljeni");

  const today = new Date().toISOString().split("T")[0];

  // proveravamo da li već postoji completion za danas
  const { data: existing, error: fetchError } = await supabase
    .from("todo_completions")
    .select("id")
    .eq("todo_id", todoId)
    .eq("user_id", user.id)
    .eq("completion_date", today)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  if (existing) {
    const { error: deleteError } = await supabase
      .from("todo_completions")
      .delete()
      .eq("id", existing.id);

    if (deleteError) throw new Error(deleteError.message);
  } else {
    const { error: insertError } = await supabase
      .from("todo_completions")
      .insert({
        todo_id: todoId,
        user_id: user.id,
        completion_date: today,
      });

    if (insertError) throw new Error(insertError.message);
  }

  revalidatePath("/dashboard");
}
