// app/api/auth/register/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function POST(req) {
  const formData = await req.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const fullName = formData.get("fullName");

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
        set(name, value, options) {
          cookies().set({ name, value, ...options });
        },
        remove(name) {
          cookies().delete(name);
        },
      },
    },
  );

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // opciono ažuriranje imena u profilu
  if (fullName && data.user) {
    await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", data.user.id);
  }

  return NextResponse.json({ success: true });
}
