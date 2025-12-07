import supabase from "../supabase";

/**
 * Belirli etkinliğin fotoğrafları
 */
export async function getEventPhotos(eventId) {
  try {
    const { data, error } = await supabase
      .from("eventPhotos")
      .select("*")
      .eq("eventId", eventId);

    if (error) {
      console.error(error);
      throw new Error("eventPhotos could not be loaded");
    }
    return data || [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Tüm eventleri, kategorilerini ve sanatçılarını döner.
 * Çıktı: [
 *   {
 *     id, "eventName", "eventHour", "eventFinishHour", "eventDate", "eventDesc",
 *     "isFree", "eventLocation", "categoryId",
 *     category: { id, name, image },
 *     artists: [{ id, "artistName", "artistPhoto" }, ...]
 *   },
 *   ...
 * ]
 */
export async function getEventsWithArtist() {
  try {
    // 1) event_artists (ilişki tablosu)
    const { data: eventArtists, error: eaErr } = await supabase
      .from("event_artists")
      .select('"eventId","artistId"');

    if (eaErr) {
      console.error("Event artists error:", eaErr);
      throw new Error("Event artists could not be loaded");
    }
    if (!eventArtists || eventArtists.length === 0) {
      return []; // ilişki yoksa boş liste
    }

    // 2) benzersiz eventId ve artistId listeleri
    const eventIds = Array.from(
      new Set(eventArtists.map((ea) => ea.eventId).filter(Boolean))
    );
    const artistIds = Array.from(
      new Set(eventArtists.map((ea) => ea.artistId).filter(Boolean))
    );

    // 3) event’leri topluca çek
    const { data: eventsData, error: eventsErr } = await supabase
      .from("events")
      .select(
        'id,"eventName","eventHour","eventFinishHour","eventDate","eventDesc","isFree","eventLocation","categoryId"'
      )
      .in("id", eventIds);

    if (eventsErr) {
      console.error("Event error:", eventsErr);
      throw new Error("Event could not be loaded");
    }
    const eventsById = new Map((eventsData || []).map((e) => [e.id, e]));

    // 4) kategorileri topluca çek
    const categoryIds = Array.from(
      new Set((eventsData || []).map((e) => e.categoryId).filter(Boolean))
    );

    let categoriesById = new Map();
    if (categoryIds.length > 0) {
      const { data: categoriesData, error: catErr } = await supabase
        .from("categories")
        .select("id,name,image")
        .in("id", categoryIds);

      if (catErr) {
        console.error("Category error:", catErr);
        throw new Error("Category could not be loaded");
      }
      categoriesById = new Map((categoriesData || []).map((c) => [c.id, c]));
    }

    // 5) sanatçıları topluca çek
    let artistsById = new Map();
    if (artistIds.length > 0) {
      const { data: artistsData, error: artErr } = await supabase
        .from("artists")
        .select('id,"artistName","artistPhoto"')
        .in("id", artistIds);

      if (artErr) {
        console.error("Artists error:", artErr);
        throw new Error("Artists could not be loaded");
      }
      artistsById = new Map((artistsData || []).map((a) => [a.id, a]));
    }

    // 6) eventId → artist listesi grupla
    const artistsByEvent = new Map();
    for (const { eventId, artistId } of eventArtists) {
      if (!eventId || !artistId) continue;
      const arr = artistsByEvent.get(eventId) || [];
      const artist = artistsById.get(artistId);
      if (artist) arr.push(artist);
      artistsByEvent.set(eventId, arr);
    }

    // 7) final çıktı: event’e category ve artists tak
    const result = [];
    for (const id of eventIds) {
      const ev = eventsById.get(id);
      if (!ev) continue;
      const category = ev.categoryId ? categoriesById.get(ev.categoryId) : null;
      const artists = artistsByEvent.get(id) || [];
      result.push({
        ...ev,
        category,
        artists,
      });
    }

    return result;
  } catch (error) {
    console.error("Error fetching events with artists and categories:", error);
    throw new Error("Events with artists and categories could not be loaded");
  }
}

/**
 * Tek bir etkinlik + kategorisi + sanatçıları
 * Çıktı: {
 *   event: {
 *     id, "eventName", ...,
 *     category: { id, name, image },
 *     artists: [{ id, "artistName","artistPhoto" }, ...]
 *   }
 * }
 */
export async function getEvent(eventId) {
  try {
    // event
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select(
        'id,"eventName","eventHour","eventFinishHour","eventDate","eventDesc","eventLocation","categoryId"'
      )
      .eq("id", eventId)
      .single();

    if (eventError) {
      console.error("Event error:", eventError);
      throw new Error("Event could not be loaded");
    }
    if (!eventData) {
      return { event: null };
    }

    // category
    let categoryData = null;
    if (eventData.categoryId) {
      const { data: cData, error: categoryError } = await supabase
        .from("categories")
        .select("id,name,image")
        .eq("id", eventData.categoryId)
        .single();

      if (categoryError) {
        console.error("Category error:", categoryError);
        throw new Error("Category could not be loaded");
      }
      categoryData = cData || null;
    }

    // artist id'leri
    const { data: artistIds, error: artistIdsError } = await supabase
      .from("event_artists")
      .select('"artistId"')
      .eq("eventId", eventId);

    if (artistIdsError) {
      console.error("Artist IDs error:", artistIdsError);
      throw new Error("Artist IDs could not be loaded");
    }
    const artistIdsArray = (artistIds || [])
      .map((a) => a.artistId)
      .filter(Boolean);

    // sanatçılar
    let artistsData = [];
    if (artistIdsArray.length > 0) {
      const { data: aData, error: artistsError } = await supabase
        .from("artists")
        .select('id,"artistName","artistPhoto"')
        .in("id", artistIdsArray);

      if (artistsError) {
        console.error("Artists error:", artistsError);
        throw new Error("Artists could not be loaded");
      }
      artistsData = aData || [];
    }

    const eventWithArtistsAndCategory = {
      event: {
        ...eventData,
        category: categoryData,
        artists: artistsData,
      },
    };

    return eventWithArtistsAndCategory;
  } catch (error) {
    console.error("Error fetching event with artists and category:", error);
    throw new Error("Event with artists and category could not be loaded");
  }
}
