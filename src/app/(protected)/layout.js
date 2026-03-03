// app/(protected)/layout.js

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default async function ProtectedLayout({ children }) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

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

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase"; // tvoj client
// import Sidebar from "@/components/layout/Sidebar";
// import Header from "@/components/layout/Header";

// export default function ProtectedLayout({ children }) {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data: { user }, error }) => {
//       if (error || !user) {
//         router.push("/login");
//       } else {
//         setUser(user);
//         setLoading(false);
//       }
//     });
//   }, [router]);

//   if (loading) return <div className="p-6">Učitavanje...</div>;

//   return (
//     <div className="min-h-screen flex bg-gray-50 text-gray-800">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header user={user} />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }
