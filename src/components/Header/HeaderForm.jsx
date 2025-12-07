import { useState } from "react";

function HeaderForm({
  word,
  setWord,
  from,
  setFrom,
  to,
  setTo,
  place,
  setPlace,
}) {
  const handleChangePlaceName = (e) => setPlace(e.target.value);
  const handleChangeWord = (e) => setWord(e.target.value);
  const handleChangeFrom = (e) => setFrom(e.target.value); // "YYYY-MM-DD"
  const handleChangeTo = (e) => setTo(e.target.value);

  const clear = () => {
    setFrom("");
    setTo("");
  };

  return (
    <div className="text-xs flex flex-col sm:flex-row gap-3 sm:flex-wrap md:flex-nowrap items-center justify-center pb-4 font-semibold sm:mt-10">
      {/* Event adı */}
      <input
        className="w-5/6 lg:w-2/6 md:w-5/6 mb-2 text-lg bg-color-secondary rounded-md px-3 pt-2 pb-3 placeholder:text-gray-300 focus:outline-none text-gray-100"
        onChange={handleChangeWord}
        value={word}
        type="text"
        placeholder="Type an event name..."
      />

      {/* Başlangıç tarihi */}
      <input
        placeholder="from"
        type="date"
        value={from}
        onChange={handleChangeFrom}
        className="md:mb-2 mb-2 w-5/6 lg:w-1/6 md:w-1/2 min-w-[220px] text-lg bg-color-secondary pt-2 pb-3 rounded-md px-3 placeholder:text-gray-300 focus:outline-none text-gray-100"
      />

      {/* Bitiş tarihi */}
      <input
        placeholder="to"
        type="date"
        value={to}
        onChange={handleChangeTo}
        className="md:mb-2 mb-2 w-5/6 lg:w-1/6 md:w-1/2 min-w-[220px] text-lg bg-color-secondary pt-2 pb-3 rounded-md px-3 placeholder:text-gray-300 focus:outline-none text-gray-100"
      />

      {/* Mekan */}
      <input
        className="w-5/6 mb-2 lg:w-1/6 md:w-1/2 min-w-[220px] text-lg bg-color-secondary pt-2 pb-3 rounded-md px-3 placeholder:text-gray-300 focus:outline-none text-gray-100"
        onChange={handleChangePlaceName}
        value={place}
        type="text"
        placeholder="Type a place..."
      />
    </div>
  );
}

export default HeaderForm;
