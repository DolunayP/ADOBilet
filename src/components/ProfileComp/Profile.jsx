// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  fetchMyTickets,
  saveProfile,
} from "../../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import supabase from "../../backend/supabase";
import HeaderMenu from "../Header/HeaderMenu";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth kontrolü tamamlandı mı?
  const [authChecked, setAuthChecked] = useState(false);

  // Sekme durumu
  const [tab, setTab] = useState("info"); // 'info' | 'tickets' | 'settings'

  // Profil düzenleme formu
  const { user, profile, tickets, loading, saving } = useSelector(
    (s) => s.profile
  );
  const [username, setUsername] = useState("");

  // 1) İlk açılışta auth’u kesinleştir: user yoksa login’e, varsa devam
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!mounted) return;

      if (error) {
        console.error("auth getUser error:", error);
        setAuthChecked(true);
        return;
      }

      if (!data?.user) {
        navigate("/login", { replace: true });
        return;
      }

      setAuthChecked(true);
    })();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  // 2) Auth doğrulandıktan sonra profil + bilet verilerini getir
  useEffect(() => {
    if (!authChecked) return;
    dispatch(fetchProfile());
    dispatch(fetchMyTickets());
  }, [authChecked, dispatch]);

  // 3) Profil formu ilk değerleri
  useEffect(() => {
    setUsername(profile?.username || "");
  }, [profile]);

  const onSave = async (e) => {
    e.preventDefault();
    await dispatch(saveProfile({ username }));
  };

  // Auth kontrolü bitmeden hiçbir şey render etme (erken yönlendirmeyi önler)
  if (!authChecked) {
    return null; // istersen burada skeleton/spinner gösterebilirsin
  }
  const initials = (profile?.username || user?.email || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <button
        className="rounded-lg px-5 py-3 bg-black text-white text-lg font-bold absolute top-2 left-2 z-50"
        onClick={() => navigate("/")}
      >
        Geri Dön
      </button>{" "}
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-5 md:gap-6">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/25 backdrop-blur flex items-center justify-center text-2xl md:text-3xl font-semibold">
            {initials}
          </div>
          <div className="flex-1 text-xl">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              My Profile
            </h1>
            <p className="text-white/80 mt-1">
              {profile?.email || user?.email || "-"}
            </p>
            <p className="text-white/70 mt-1">
              Member since:{" "}
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        {/* Username form */}
        <form
          onSubmit={onSave}
          className="mt-6 grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-3"
        >
          <label className="text-md font-medium md:self-center">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="w-full rounded-xl border-0 px-4 py-2.5 bg-white/10 placeholder-white/60 text-white ring-1 ring-white/20 focus:ring-2 focus:ring-white/50 outline-none"
          />
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-xl bg-white text-indigo-700 font-semibold px-5 py-2.5 hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
      {/* Tickets */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-semibold">My Tickets</h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-500">Loading...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && (!tickets || tickets.length === 0) && (
          <div className="rounded-2xl border border-dashed border-zinc-200 p-10 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center">
              <span className="text-2xl">🎟️</span>
            </div>
            <h3 className="text-lg font-medium">No tickets yet</h3>
            <p className="text-zinc-500 mt-1">
              Buy a ticket and it will appear here.
            </p>
          </div>
        )}

        {/* Ticket list */}
        {!loading && tickets?.length > 0 && (
          <ul className="grid md:grid-cols-2 gap-4 md:gap-6">
            {tickets.map((t) => {
              const ev = t.events || t.events_id || t.event;
              const cat =
                t.ticketCategories || t.ticketcategories || t.category;
              const seatName = t.seatName || t.seats?.seatName || "-";
              const when = t.purchasedAt
                ? new Date(t.purchasedAt).toLocaleString()
                : "-";

              return (
                <li
                  key={t.id}
                  className="rounded-2xl border text-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-5 shadow-md hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-3 text-white">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold">
                        {ev?.eventName || "-"}
                      </h3>
                      <p className="text-md mt-0.5">
                        {ev?.eventDate || "-"} • {ev?.eventHour || "-"} •{" "}
                        {ev?.eventLocation || "-"}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1">
                      {cat?.categoryName || "—"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-white">
                    <span className="inline-flex items-center rounded-full border px-3 py-1">
                      Seat: <b className="ml-1">{seatName}</b>
                    </span>
                    {typeof cat?.price !== "undefined" && (
                      <span className="inline-flex items-center rounded-full border px-3 py-1">
                        Price: <b className="ml-1">{cat?.price}₺</b>
                      </span>
                    )}
                    <span className="ml-auto text-md text-white">
                      Purchased: {when}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
