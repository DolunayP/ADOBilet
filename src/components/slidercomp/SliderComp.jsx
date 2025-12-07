import React, { useEffect } from "react";
import SliderCard from "./SliderCard";
import bg from "../../assets/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../../redux/dataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { HashLoader } from "react-spinners";

const SliderComp = () => {
  const { eventsWithArtists } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  return (
    <div className="relative h-full w-full mb-2">
      <h2 className="text-[52px] text-white bg-gradient-to-b from-[#ff6b6b] via-[#ff9f43] to-[#ffe66d] rounded-b-full shadow-xl py-12 mb-6 z-40 relative">
        Upcoming Events{" "}
      </h2>
      {eventsWithArtists?.length > 0 ? (
        <Swiper
          // Eski slidesPerView hesaplamasını kaldırdık, yerine breakpoints kullandık
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            540: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 5, spaceBetween: 20 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper !py-[40px]"
          // Aşağıdakiler resize/değişimlerde yeniden hesaplamayı garanti eder
          observer={true}
          observeParents={true}
          resizeObserver={true}
          watchOverflow={true}
        >
          {eventsWithArtists.map((ev) => (
            <SwiperSlide key={ev.id ?? ev.eventName}>
              <SliderCard events={ev} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center">
          <HashLoader size={120} color="#32847a" />
        </div>
      )}
    </div>
  );
};

export default SliderComp;
