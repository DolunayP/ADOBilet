// src/api/tickets.js
import supabase from "../supabase";

/**
 * Etkinlikte satışa açık bilet kalemleri (kategori + event başlığı ile)
 */
export async function getEventTickets() {
  try {
    const { data, error } = await supabase.from("ticketPricing").select(
      // camelCase kolonlar için tırnaklı select kullanıyoruz
      'id,ticketCategories(id,"categoryName",price),events(id,"eventName")'
    );

    if (error) {
      console.error(error);
      throw new Error("Tickets could not be loaded");
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Toplam satılan bilet sayacı
 */
export async function getSoldTickets() {
  try {
    const { data, error } = await supabase
      .from("soldTickets")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      throw new Error("soldTickets could not be loaded");
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Satın alma akışı
 * 1) seats: availability=false, status='SOLD', ticketId=null
 * 2) ticketPricing: isSold=true, userId, purchasedAt
 * 3) soldTickets.soldCount++
 */
export async function buyTicket(eventId, seatId, ticketId) {
  try {
    // 0) aktif kullanıcı
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr) {
      console.error(authErr);
      throw new Error("Auth error");
    }
    const userId = authData?.user?.id ?? null;

    // 1) seatName'i, koltuğu null'lamadan ÖNCE al
    const { data: seatRow, error: seatFetchErr } = await supabase
      .from("seats")
      .select('"seatName"')
      .eq("id", seatId)
      .single();
    if (seatFetchErr) {
      console.error(seatFetchErr);
      throw new Error("Seat could not be fetched");
    }
    const seatName = seatRow?.seatName ?? null;

    // 2) koltuğu SOLD yap ve ticketId'yi boşalt
    const updateSeat = await supabase
      .from("seats")
      .update({ availability: false, ticketId: null, status: "SOLD" })
      .eq("eventId", eventId)
      .eq("id", seatId);
    if (updateSeat.error) {
      console.error(updateSeat.error);
      throw new Error("Seat availability could not be updated");
    }

    // 3) ticketPricing'i güncelle (satıldı + kullanıcı + zaman + seatName)
    const { error: updatedTicketPricingError } = await supabase
      .from("ticketPricing")
      .update({
        isSold: true,
        userId,
        purchasedAt: new Date().toISOString(),
        seatName, // <- Profil'de My Tickets için gerekli
      })
      .eq("id", ticketId);
    if (updatedTicketPricingError) {
      console.log(updatedTicketPricingError);
      throw new Error("Ticket pricing could not be updated");
    }

    // 4) soldTickets sayacı
    const { data: soldCountData, error: soldCountError } = await supabase
      .from("soldTickets")
      .select("soldCount")
      .single();
    if (soldCountError) {
      console.error(soldCountError);
      throw new Error("Sold count could not be fetched");
    }

    const updatedSoldCount = (soldCountData?.soldCount ?? 0) + 1;

    const { error: updateError } = await supabase
      .from("soldTickets")
      .update({ soldCount: updatedSoldCount })
      .eq("id", 1)
      .single();
    if (updateError) {
      console.error(updateError);
      throw new Error("Sold count could not be updated");
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while buying the ticket");
  }
}
