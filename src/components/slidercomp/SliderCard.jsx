import React from "react";
import { useNavigate } from "react-router-dom";

const SliderCard = ({ events }) => {
  const { artists } = events;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  const getDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      <div
        style={{ boxShadow: "3px 11px 15px 0px rgba(0,0,0,0.5)" }}
        className="group px-0 relative transition-{flex} duration-500 ease cursor-pointer h-[300px] md:h-[360px] rounded-md overflow-hidden -skew-x-[6deg] transform transition-transform hover:scale-105"
      >
        <img
          className="w-full h-full object-cover"
          src={artists[0]?.artistPhoto}
          alt=""
        />
        <div className="w-[98%] opacity-100 translate-y-0 text-white transition-all duration-700 bg-[#32847a] rounded-md p-4 absolute bottom-1 left-1 me-1">
          <h2 className="font-extrabold uppercase text-lg">
            {events.eventName}
          </h2>
          <p className="text-sm">{events.eventDesc}</p>
          <button
            onClick={() => {
              getDetails(events.id);
              handleScrollToTop();
            }}
            className="shadow-xl mt-4 me-4 py-3 px-8 text-lg font-bold bg-black text-white hover:scale-95 hover:text-[#6cebdc] transition-all duration-500"
          >
            See Details
          </button>
        </div>
      </div>
    </>
  );
};

export default SliderCard;
