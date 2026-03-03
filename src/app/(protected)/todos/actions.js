"use server";

import { createActionSupabaseClient } from "@/lib/supabase/action";

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

export async function updateTodo({ id, title, categoryId, priority }) {
  const supabase = await createActionSupabaseClient();

  const { data, error } = await supabase
    .from("todos") // naziv tabele
    .update({
      title,
      category_id: categoryId || null,
      priority,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update jednokratni reminder za dati todo
 */
export async function updateOneTimeReminder(todoId, datetime) {
  const supabase = await createActionSupabaseClient();

  // dohvatimo postojeći reminder za todo
  const { data: existing, error: fetchError } = await supabase
    .from("reminders")
    .select("*")
    .eq("todo_id", todoId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 = no rows found
    throw new Error(fetchError.message);
  }
  // console.log("Podaci o todoId su: ", todoId);
  // console.log("Podaci o reminderu su: ", existing);
  if (existing) {
    // update ako postoji
    const { error } = await supabase
      .from("reminders")
      .update({
        reminder_datetime: datetime,
        reminder_time: null,
        days_of_week: null,
      })
      .eq("id", existing.id);

    if (error) throw new Error(error.message);
  } else {
    // insert ako ne postoji
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
}

/**
 * Update ponavljajući reminder za dati todo
 */
export async function updateRecurringReminder(todoId, time, daysArray) {
  const supabase = await createActionSupabaseClient();

  const { data: existing, error: fetchError } = await supabase
    .from("reminders")
    .select("*")
    .eq("todo_id", todoId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error(fetchError.message);
  }

  if (existing) {
    const { error } = await supabase
      .from("reminders")
      .update({
        reminder_time: time,
        days_of_week: daysArray,
        reminder_datetime: null,
      })
      .eq("id", existing.id);

    if (error) throw new Error(error.message);
  } else {
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
}

/**
 * Briše reminder za dati todo
 */
export async function deleteReminder(todoId) {
  const supabase = await createActionSupabaseClient();

  const { error } = await supabase
    .from("reminders")
    .delete()
    .eq("todo_id", todoId);

  if (error) throw new Error(error.message);
}
