import React, { useEffect, useState } from "react";
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

  const width = window.innerWidth;

  return (
    <div className="relative h-full w-full mb-2 ">
      <h2 className="text-[52px] text-white bg-gradient-to-b from-[#173633] to-[#07a696] rounded-b-full shadow-xl py-12 mb-6 z-40 relative">
        Yaklaşan Popüler Etkinlikler
      </h2>

      {eventsWithArtists?.length > 0 ? (
        <>
          <img
            className="absolute top-0 left-0 h-full w-full"
            src={bg}
            alt=""
          />
          <Swiper
            slidesPerView={width <= 540 ? 1 : width <= 768 ? 2 : 4}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper !py-[40px]"
          >
            {eventsWithArtists.map((events, i) => {
              return (
                <SwiperSlide key={i}>
                  <SliderCard events={events} key={i} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : (
        <div className="flex justify-center">
          <HashLoader size={120} color="#32847a" />
        </div>
      )}
    </div>
  );
};

export default SliderComp;
