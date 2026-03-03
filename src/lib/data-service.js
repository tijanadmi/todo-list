import { createServerSupabaseClient } from "@/lib/supabase/server";

/* =========================
   PROFIL
========================= */

export async function getCurrentUserProfile() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw new Error("Profil nije mogao biti učitan");

  return data;
}

/* =========================
   CATEGORIES
========================= */

export async function getCategories() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) throw new Error("Kategorije nisu mogle biti učitane");

  return data || [];
}

/* =========================
   TODOS
========================= */

export async function getTodos() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // const { data, error } = await supabase
  //   .from("todos")
  //   .select(
  //     `
  //     *,
  //     categories (
  //       id,
  //       name,
  //       color
  //     ),
  //     reminders(*)  -- dobijamo sve, ali uzimamo samo prvi reminder u edit-u
  //   `,
  //   )
  //   .eq("user_id", user.id)
  //   .order("created_at", { ascending: false });

  const { data, error } = await supabase
    .from("todos")
    .select(
      `
    *,
    categories (
      id,
      name,
      color
    ),
    reminder:reminders(*)
  `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Zadaci nisu mogli biti učitani");

  // mapiramo da svaki todo ima samo jedan reminder ili null
  // const todosWithReminder = data.map((todo) => ({
  //   ...todo,
  //   reminder: todo.reminders?.[0] || null,
  // }));

  // return todosWithReminder;
  return data;
}

/* =========================
   REMINDERS
========================= */

export async function getRemindersForTodo(todoId) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("todo_id", todoId)
    .eq("is_active", true);

  if (error) throw new Error("Podsetnici nisu mogli biti učitani");

  return data || [];
}

export async function getTodosByCategory(categoryId) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .eq("category_id", categoryId);

  if (error) throw new Error("Zadaci nisu mogli biti učitani");

  return data || [];
}

/* =========================
   DASHBOARD
========================= */

export async function getTodaysTodos() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      grouped: { high: [], medium: [], low: [] },
      total: 0,
      completed: 0,
      activeReminders: 0,
    };

  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const todayDay = today.getDay();

  /* =========================
     1️⃣ Dohvati aktivne remindere
  ========================= */

  const { data: reminders, error } = await supabase
    .from("reminders")
    .select(
      `
      id,
      reminder_datetime,
      days_of_week,
      todos (
        id,
        title,
        description,
        priority,
        category_id
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("is_active", true);

  if (error) throw new Error(error.message);

  /* =========================
     2️⃣ Filtriraj današnje
  ========================= */

  const todaysTodosRaw = reminders
    .filter((reminder) => {
      // jednokratni
      if (reminder.reminder_datetime) {
        return reminder.reminder_datetime.split("T")[0] === todayDate;
      }

      // ponavljajući
      if (reminder.days_of_week && reminder.days_of_week.includes(todayDay)) {
        return true;
      }

      return false;
    })
    .map((reminder) => reminder.todos);

  const total = todaysTodosRaw.length;

  if (total === 0)
    return {
      grouped: { high: [], medium: [], low: [] },
      total: 0,
      completed: 0,
      activeReminders: 0,
    };

  /* =========================
     3️⃣ Dohvati completions za danas
  ========================= */

  const { data: completions } = await supabase
    .from("todo_completions")
    .select("todo_id")
    .eq("user_id", user.id)
    .eq("completion_date", todayDate);

  const completedIds = new Set(completions?.map((c) => c.todo_id) || []);

  /* =========================
     4️⃣ Spoji is_completed dinamički
  ========================= */

  const todaysTodos = todaysTodosRaw.map((todo) => ({
    ...todo,
    is_completed: completedIds.has(todo.id),
  }));

  const completed = todaysTodos.filter((t) => t.is_completed).length;

  const activeReminders = total;

  /* =========================
     5️⃣ Sortiranje (completed na kraj)
  ========================= */

  const sortCompletedLast = (arr) =>
    arr.sort((a, b) => {
      if (a.is_completed === b.is_completed) return 0;
      return a.is_completed ? 1 : -1;
    });

  const high = sortCompletedLast(
    todaysTodos.filter((t) => t.priority === "high"),
  );

  const medium = sortCompletedLast(
    todaysTodos.filter((t) => t.priority === "medium"),
  );

  const low = sortCompletedLast(
    todaysTodos.filter((t) => t.priority === "low"),
  );

  return {
    grouped: { high, medium, low },
    total,
    completed,
    activeReminders,
  };
}

export async function getTodaysTodos1() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      todos: [],
      total: 0,
      completed: 0,
      activeReminders: 0,
    };

  const today = new Date();
  const todayDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const todayDay = today.getDay(); // 0-6 (nedelja=0)

  const { data, error } = await supabase
    .from("reminders")
    .select(
      `
      id,
      reminder_datetime,
      reminder_time,
      days_of_week,
      is_active,
      todos (
        id,
        title,
        description,
        priority,
        is_completed,
        category_id
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("is_active", true);

  if (error) {
    throw new Error("Greška pri učitavanju današnjih zadataka");
  }

  const todaysTodos = data
    .filter((reminder) => {
      // 🔹 jednokratni
      if (reminder.reminder_datetime) {
        return reminder.reminder_datetime.split("T")[0] === todayDate;
      }

      // 🔹 ponavljajući
      if (reminder.days_of_week && reminder.days_of_week.includes(todayDay)) {
        return true;
      }

      return false;
    })
    .map((reminder) => reminder.todos);

  const total = todaysTodos.length;
  const completed = todaysTodos.filter((t) => t.is_completed).length;
  const activeReminders = total; // pošto je 1 reminder po todo

  // sortiranje: active prvo, completed na kraj
  const sortCompletedLast = (arr) =>
    arr.sort((a, b) => {
      if (a.is_completed === b.is_completed) return 0;
      return a.is_completed ? 1 : -1;
    });

  const high = sortCompletedLast(
    todaysTodos.filter((t) => t.priority === "high"),
  );

  const medium = sortCompletedLast(
    todaysTodos.filter((t) => t.priority === "medium"),
  );

  const low = sortCompletedLast(
    todaysTodos.filter((t) => t.priority === "low"),
  );

  return {
    grouped: {
      high,
      medium,
      low,
    },
    total: total,
    completed,
    activeReminders,
  };
}
