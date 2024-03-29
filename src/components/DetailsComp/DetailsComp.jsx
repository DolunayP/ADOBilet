import React, { useEffect, useState } from "react";
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  getEventSingle,
  getPhotosByEvent,
  getUserSession,
} from "../../redux/dataSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import DetailsSlider from "./DetailsSlider";
import { useNavigate } from "react-router-dom";
import MapsComp from "./MapsComp";

const DetailsComp = ({ id, path }) => {
  const { event, eventPhotos, user } = useSelector((state) => state.data);
  const navigate = useNavigate();

  let artists = [];

  if (event.event) {
    artists = [...event.event.artists];
  }

  const artistImg = artists.map((artist) => artist.artistPhoto);
  const href = window.location.href;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventSingle(id));
    dispatch(getPhotosByEvent(id));
    dispatch(getUserSession());
  }, [dispatch, href, id]);

  const handleFacebookShare = () => {
    // Facebook paylaşım URL'si
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleInstagramShare = () => {
    // Instagram paylaşım URL
    const instagramShareUrl = `https://www.instagram.com/share?url=${window.location.href}`;
    window.open(instagramShareUrl, "_blank");
  };
  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/share?url=${window.location.href}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      "Etkinlik: " + window.location.href
    )}`;
    window.open(whatsappShareUrl, "_blank");
  };

  const isLoggedIn = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="xl:flex-row flex flex-col md:flex-col justify-between items-center px-[0%] md:px-[8%] gap-6 h-full">
        <div className="flex items-center md:flex-row flex-col">
          <div className=" md:flex-[0.5] flex-[0.5]">
            <img
              className="rounded-lg shadow-2xl w-[320px] h-auto mx-auto"
              src={artistImg[0]}
              alt=""
            />
          </div>
          {event.event && (
            <div className="flex flex-col md:items-stretch items-center p-4 md:p-0 justify-between md:flex-[0.5] h-full pl-4 ">
              <h2 className="text-xl text-left mb-2">
                Event:{" "}
                <span className="font-bold uppercase">
                  {" "}
                  {event.event.eventName}
                </span>
              </h2>
              <h2 className="text-xl text-left mb-2">
                Event Starting Time:
                <span className="font-bold"> {event.event.eventHour}</span>
              </h2>
              <h2 className="text-xl text-left mb-2">
                Event Ending Time:
                <span className="font-bold">
                  {" "}
                  {event.event.eventFinishHour}
                </span>
              </h2>
              <h2 className="text-xl text-left mb-2">
                Event Date:
                <span className="font-bold"> {event.event.eventDate}</span>
              </h2>
              <p className="text-justify text-lg"> {event.event.eventDesc}</p>
              {!path && (
                <button
                  className="bg-[#2fa799] shadow-xl px-6 py-3 text-white border text-lg font-bold rounded-md mt-6 md:mx-0 mb-4 md:mb-0 hover:scale-95 transition-all duration-500"
                  onClick={() => {
                    isLoggedIn()
                      ? navigate(`/event/tickets/${event.event.id}`)
                      : navigate(`/login`);
                  }}
                >
                  Buy a Ticket
                </button>
              )}
            </div>
          )}
        </div>

        <div className="text-2xl md:flex-[0.33]">
          <MapsComp location={event?.event?.eventLocation} />
        </div>
      </div>

      <div className="flex px-[8%] justify-center items-center md:mt-10 mt-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper w-full md:w-[920px]"
        >
          {eventPhotos?.map((photo, i) => {
            return (
              <SwiperSlide key={i}>
                <DetailsSlider key={i} photo={photo} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="text-center flex flex-col items-center justify-center mt-6 mb-10">
        <h2 className="font-bold text-3xl my-3 md:my-6 ">
          Share This Event on Social Media Platforms
        </h2>
        <div className="flex md:flex-row flex-wrap flex-col gap-3 md:gap-8 text-base font-semibold">
          <button
            className="flex flex-col justify-center items-center"
            onClick={handleFacebookShare}
          >
            <FaFacebook size={38} />
            <div>Facebook'ta Paylaş</div>
          </button>
          <button
            className="flex flex-col justify-center items-center"
            onClick={handleInstagramShare}
          >
            <FaInstagram size={38} />
            <div>Instagram'da Paylaş</div>
          </button>
          <button
            className="flex flex-col justify-center items-center"
            onClick={handleTwitterShare}
          >
            <FaTwitter size={38} />
            <div>Twitter'da Paylaş</div>
          </button>
          <button
            className="flex flex-col justify-center items-center"
            onClick={handleWhatsAppShare}
          >
            <FaWhatsapp size={38} />
            <div>WhatsApp'ta Paylaş</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailsComp;
