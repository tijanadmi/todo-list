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

export async function deleteCategory(categoryId) {
  const supabase = await createActionSupabaseClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) throw new Error(error.message);
}

export async function createTodo({
  title,
  description,
  categoryId,
  priority = "medium",
}) {
  const supabase = await createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Niste prijavljeni");

  const { data, error } = await supabase
    .from("todos")
    .insert({
      user_id: user.id,
      title,
      description,
      category_id: categoryId || null,
      priority,
    })
    .select()
    .single(); // 👈 VAŽNO

  if (error) throw new Error(error.message);

  return data; // 👈 vraća ceo todo (sa id)
}

export async function toggleTodo(todoId, currentState) {
  const supabase = await createActionSupabaseClient();

  const { error } = await supabase
    .from("todos")
    .update({ is_completed: !currentState })
    .eq("id", todoId);

  if (error) throw new Error(error.message);
}

export async function deleteTodo(todoId) {
  const supabase = await createActionSupabaseClient();

  const { error } = await supabase.from("todos").delete().eq("id", todoId);

  if (error) throw new Error(error.message);
}

export async function createOneTimeReminder(todoId, datetime) {
  const supabase = await createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Niste prijavljeni");

  const { error } = await supabase.from("reminders").insert({
    todo_id: todoId,
    user_id: user.id,
    reminder_datetime: datetime,
  });

  if (error) throw new Error(error.message);
}

export async function createRecurringReminder(todoId, time, daysArray) {
  const supabase = await createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Niste prijavljeni");

  const { error } = await supabase.from("reminders").insert({
    todo_id: todoId,
    user_id: user.id,
    reminder_time: time,
    days_of_week: daysArray,
  });

  if (error) throw new Error(error.message);
}
