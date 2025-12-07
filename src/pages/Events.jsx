import React, { useEffect, useState } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import FilterCategories from "../components/FilterCategories/FilterCategories";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useParams } from "react-router-dom";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderMenu from "../components/Header/HeaderMenu";
import Footer from "../components/FooterComp/Footer";
import { HashLoader } from "react-spinners";

const Events = () => {
  const { eventsWithArtists } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { categoryName } = useParams();

  // Kategoriye göre filtrelenen liste (varsayılan: tüm etkinlikler)
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Tarih aralığı inputları (YYYY-MM-DD)
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Sayfa başlığı için bugün
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  // "DD.MM.YYYY" veya "YYYY-MM-DD" stringini Date objesine çevir
  const parseEventDate = (dateString) => {
    if (!dateString) return null;
    if (dateString.includes(".")) {
      // "DD.MM.YYYY"
      const [day, month, year] = dateString.split(".");
      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        12,
        0,
        0,
        0
      );
    }
    if (dateString.includes("-")) {
      // "YYYY-MM-DD"
      const [year, month, day] = dateString.split("-");
      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        12,
        0,
        0,
        0
      );
    }
    // en-GB "DD/MM/YYYY" gelirse:
    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/");
      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        12,
        0,
        0,
        0
      );
    }
    return null;
  };

  // Mevcut kodun kullandığı yardımcılar (bozmayalım)
  const convertToDate = (dateString) => {
    const dt = parseEventDate(dateString);
    return dt ? dt.toLocaleDateString("en-GB") : "";
  };

  const compareDates = (date1, date2) => {
    // "DD/MM/YYYY" kıyaslıyor
    const [day1, month1, year1] = date1.split("/");
    const [day2, month2, year2] = date2.split("/");

    if (year1 < year2) return false;
    if (year1 > year2) return true;
    if (month1 < month2) return false;
    if (month1 > month2) return true;
    if (day1 < day2) return false;
    if (day1 > day2) return true;
    return true;
  };

  // İlk yüklemede veriyi çek ve varsayılan listeyi ayarla
  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  useEffect(() => {
    if (eventsWithArtists?.length) {
      setFilteredEvents(eventsWithArtists);
    } else {
      setFilteredEvents([]);
    }
  }, [eventsWithArtists]);

  // Kategori seçimi
  const handleCategorySelect = (category) => {
    if (!eventsWithArtists) return;

    if (category === "") {
      setFilteredEvents(eventsWithArtists);
    } else {
      const filtered = eventsWithArtists.filter(
        (event) => event.category?.name === category
      );
      setFilteredEvents(filtered);
    }
  };

  // Tarih aralığı uygula (UI butonu)
  const applyDateRange = () => {
    // Sadece state değiştiriyoruz; asıl filtreleme aşağıda checkedData hesaplanırken yapılacak
    // Burada ekstra iş yok; butona basıldığında re-render tetiklenir.
  };

  const clearDateRange = () => {
    setFrom("");
    setTo("");
  };

  // 1) Önce "gelecek/bugünden itibaren" filtresi (mevcut koda sadık)
  const upcomingBase = (filteredEvents || []).filter((event) => {
    const filtered = convertToDate(event.eventDate);
    if (!filtered) return false;
    return compareDates(filtered, formattedDate);
  });

  // 2) Ardından kullanıcı seçtiyse tarih aralığı uygula
  const fromDate = from ? new Date(from) : null; // 00:00
  const toDate = to ? new Date(to) : null; // 00:00 (gün sonu yapmak istersen saate +1 gün + -1ms)
  const checkedData = upcomingBase.filter((event) => {
    const evDateObj = parseEventDate(event.eventDate);
    if (!evDateObj) return false;

    // from kontrolü
    if (fromDate) {
      const start = new Date(fromDate);
      start.setHours(0, 0, 0, 0);
      if (evDateObj < start) return false;
    }
    // to kontrolü
    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      if (evDateObj > end) return false;
    }
    return true;
  });

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>

      {eventsWithArtists?.length > 0 ? (
        <>
          <div className="text-[52px] text-white bg-gradient-to-b from-[#173633] to-[#07a696] rounded-b-full shadow-xl py-12 mb-6">
            Upcoming Events{" "}
          </div>

          {/* Tarih Aralığı Toolbar */}
          <div className="max-w-6xl mx-auto px-4 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-4">
              <div>
                <label className="block text-sm text-zinc-600 mb-1">From</label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">To</label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2 me-8">
                <button
                  onClick={clearDateRange}
                  className="inline-flex items-center rounded-lg border border-zinc-300 px-4 py-2 hover:bg-zinc-100"
                >
                  Temizle
                </button>
              </div>
              <FilterCategories
                events={eventsWithArtists}
                clickedCategory={categoryName}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>

          {/* Kategori filtreleri */}

          {/* Liste */}
          {checkedData.length > 0 ? (
            <EventsComp events={checkedData} categoryName={categoryName} />
          ) : (
            <div className="text-2xl p-6">There is no upcoming events!</div>
          )}
        </>
      ) : eventsWithArtists?.length === 0 ? (
        <div className="flex justify-center p-8">
          <HashLoader size={100} color="#404529" />
        </div>
      ) : (
        <div className="p-10 mb-1 text-lg">There are no incoming events.</div>
      )}
      <Footer />
    </>
  );
};

export default Events;
