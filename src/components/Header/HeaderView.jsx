import HeaderForm from "./HeaderForm";
import HeaderMenu from "./HeaderMenu";
import HeaderTitle from "./HeaderTitle";

function HeaderView({
  word,
  setWord,
  from,
  setFrom,
  to,
  setTo,
  place,
  setPlace,
}) {
  return (
    <div className="bg-color-primary">
      <HeaderMenu />
      <HeaderTitle />
      <HeaderForm
        word={word}
        setWord={setWord}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        place={place}
        setPlace={setPlace}
      />
    </div>
  );
}

export default HeaderView;
