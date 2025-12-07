import "./App.css";
import HeaderView from "./components/Header/HeaderView";
import React, { useState } from "react";
import SliderComp from "./components/slidercomp/SliderComp";
import TimelineComp from "./components/TimelineComp/TimelineComp";
import Categories from "./components/CategoriesComp/Categories";
import Statistics from "./components/Statistics";
import SearchComp from "./components/SearchComp/SearchComp";
import Footer from "./components/FooterComp/Footer";

function App() {
  const [word, setWord] = useState("");
  const [from, setFrom] = useState(""); // "YYYY-MM-DD"
  const [to, setTo] = useState("");
  const [place, setPlace] = useState("");

  return (
    <div className="App">
      <HeaderView
        word={word}
        setWord={setWord}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        place={place}
        setPlace={setPlace}
      />
      {!word && !to && !place ? (
        <>
          <SliderComp />
          <TimelineComp />
          <Categories />
          <Statistics />
          <Footer />
        </>
      ) : (
        <>
          <SearchComp word={word} from={from} to={to} place={place} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
