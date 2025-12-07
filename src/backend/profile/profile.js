// src/api/profile.js
import supabase from "../supabase";

// 3.1 – Aktif kullanıcı (Auth + public.users profili)
export async function getCurrentUserWithProfile() {
  const { data: authData, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;
  const user = authData?.user ?? null;
  if (!user) return { user: null, profile: null };

  const { data: prof, error: profErr } = await supabase
    .from("users")
    .select("id,email,username,authenticated_role,created_at")
    .eq("id", user.id)
    .single();

  if (profErr) throw profErr;
  return { user, profile: prof };
}

// 3.2 – Kullanıcının satın aldığı biletler (event + seat + category)
// src/api/profile.js (veya kullandığın yerde)
export async function getMyTickets() {
  const { data: authData } = await supabase.auth.getUser();
  const uid = authData?.user?.id;
  if (!uid) return [];

  const { data, error } = await supabase
    .from("ticketPricing")
    .select(
      'id,"purchasedAt","seatName",' + // seatName'ı da seçeceğiz (aşağıda ekliyoruz)
        'events!inner("eventName","eventDate","eventHour","eventLocation"),' +
        'ticketCategories!inner("categoryName",price)'
    )
    .eq("userId", uid)
    .eq("isSold", true)
    .order("purchasedAt", { ascending: false });

  if (error) throw error;
  return data;
}

// 3.3 – Profil bilgisi güncelleme (username gibi)
export async function updateProfile({ username }) {
  const { data: authData } = await supabase.auth.getUser();
  const uid = authData?.user?.id;
  if (!uid) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("users")
    .update({ username })
    .eq("id", uid);

  if (error) throw error;
  return true;
}
