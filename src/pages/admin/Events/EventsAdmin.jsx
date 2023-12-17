import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventById,
  getArtistWithEvents,
  getEvents,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function EventsAdmin() {
  const dispatch = useDispatch();
  const { eventsWithArtists } = useSelector((state) => state.data);

  const navigate = useNavigate();

  console.log(eventsWithArtists);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  return (
    <div className="flex h-full items-center flex-col p-2 overflow-y-auto">
      <div className="bg-white text-black rounded-lg p-1">
        <table className="">
          <thead className="bg-color-primary text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Hour</th>
              <th className="p-4">Finish Hour</th>
              <th className="p-4">Date</th>
              <th className="p-4">Location</th>
              <th className="p-4">Category</th>
              <th className="p-4">Artists</th>
              <th className="p-4">IsFree</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(eventsWithArtists).length > 0 ? (
              eventsWithArtists?.map((event, i) => (
                <tr
                  key={event.id}
                  className={`${i % 2 === 0 && "bg-gray-300"} `}
                >
                  <td>{event.eventName}</td>
                  <td>{event.eventHour}</td>
                  <td>{event.eventFinishHour}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.eventLocation}</td>
                  <td>{event.category?.name}</td>
                  <td>
                    <select
                      name=""
                      id=""
                      className="rounded-lg p-2 bg-gray-500 text-white"
                    >
                      {event.artists.map((artist) => (
                        <option key={artist.eventId} value={artist.eventId}>
                          {artist.artistName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{event.isFree ? "Free" : "Not Free"}</td>
                  <td>
                    <div className="flex gap-6 ml-6">
                      <button
                        className="text-zinc-300 bg-red-800 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200"
                        onClick={() => {
                          dispatch(deleteEventById(event.id));
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200"
                        onClick={() => {
                          navigate(`/admin/Event/${event.id}`, {
                            state: {
                              eventName: event.eventName,
                              eventHour: event.eventHour,
                              eventFinishHour: event.eventFinishHour,
                              eventDate: event.eventDate,
                              eventLocation: event.eventLocation,
                              categoryId: event.category.id,
                              isFree: event.isFree,
                            },
                          });
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div className="flex justify-center p-8">
                <HashLoader size={100} color="#404529" />
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div className="self-end mt-4">
        {Object.keys(eventsWithArtists).length > 0 && (
          <button
            className="bg-color-primary p-4 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            onClick={() => navigate("/admin/addEvent")}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default EventsAdmin;
