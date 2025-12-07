import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistWithEvents,
  getSoldTicketsData,
  getUsers,
} from "../redux/dataSlice";

function Statistics() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);

  const { soldTickets, eventsWithArtists } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getSoldTicketsData());
    dispatch(getArtistWithEvents());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <div className=" text-white relative flex justify-center content-between h-screen md:h-80">
        <div className="grid grid-cols-1  items-center md:grid-cols-3 md:min-w-fit minWidth">
          <div className="absolute inset-0 bg-statistics bg-contain "></div>
          <div className="absolute inset-0  bg-color-primary bg-opacity-70"></div>
          <div className="z-10 ">
            <h3
              className="text-6xl  after:bg-white after:block after:w-10 after:h-1
          after:mx-auto after:mt-8 after:mb-8"
            >
              {eventsWithArtists?.length}
            </h3>
            <h4 className="text-2xl uppercase">Events organized</h4>
          </div>

          <div className="absolute inset-0 bg-statistics bg-contain "></div>
          <div className="absolute inset-0  bg-color-primary bg-opacity-70"></div>
          <div className="z-10">
            <h3
              className="text-6xl after:bg-white after:block after:w-10 after:h-1 
          after:mx-auto after:mt-8 after: mb-8"
            >
              {users.length}
            </h3>
            <h4 className="text-2xl uppercase">Registered Users</h4>
          </div>

          <div className="absolute inset-0 bg-statistics bg-contain "></div>
          <div className="absolute inset-0  bg-color-primary bg-opacity-70"></div>
          <div className="z-10">
            <h3
              className="text-6xl after:bg-white after:block after:w-10 after:h-1 
          after:mx-auto after:mt-8 after: mb-8 "
            >
              {soldTickets?.soldCount ?? 0}
            </h3>
            <h4 className="text-2xl uppercase">Tickets Sold</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
