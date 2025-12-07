import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../../redux/dataSlice";
import EventsComp from "../EventsComp/EventsComp";

const SearchComp = ({ word, from, to, place }) => {
  const { eventsWithArtists } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [searchedEvents, setSearchedEvents] = useState([]);

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  useEffect(() => {
    if (!eventsWithArtists) {
      setSearchedEvents([]);
      return;
    }

    // "DD.MM.YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" destekli parser
    const parseEventDate = (s) => {
      if (!s) return null;
      if (s.includes(".")) {
        const [d, m, y] = s.split(".");
        return new Date(+y, +m - 1, +d, 12, 0, 0, 0);
      }
      if (s.includes("-")) {
        const [y, m, d] = s.split("-");
        return new Date(+y, +m - 1, +d, 12, 0, 0, 0);
      }
      if (s.includes("/")) {
        const [d, m, y] = s.split("/");
        return new Date(+y, +m - 1, +d, 12, 0, 0, 0);
      }
      return null;
    };

    const normalize = (str) =>
      (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const fromDate = from ? new Date(from) : null; // "YYYY-MM-DD" -> 00:00
    const toDate = to ? new Date(to) : null; // "YYYY-MM-DD" -> 00:00

    const results = eventsWithArtists.filter((ev) => {
      const nameOk = word
        ? normalize(ev.eventName).includes(normalize(word))
        : true;
      const placeOk = place
        ? normalize(ev.eventLocation).includes(normalize(place))
        : true;

      // tarih aralığı
      const dt = parseEventDate(ev.eventDate);
      if (!dt) return nameOk && placeOk; // tarihi yoksa sadece kelime/yer filtresine bak

      if (fromDate) {
        const start = new Date(fromDate);
        start.setHours(0, 0, 0, 0);
        if (dt < start) return false;
      }
      if (toDate) {
        const end = new Date(toDate);
        end.setHours(23, 59, 59, 999);
        if (dt > end) return false;
      }

      return nameOk && placeOk;
    });

    setSearchedEvents(results);
  }, [word, from, to, place, eventsWithArtists]);

  return <EventsComp events={searchedEvents} />;
};

export default SearchComp;
