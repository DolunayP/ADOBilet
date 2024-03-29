import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/dataSlice";

import { HashLoader } from "react-spinners";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex justify-center h-full items-center flex-col min-w-[75%] overflow-x-auto">
      <div className="bg-white text-black rounded-lg p-1 overflow-y-auto mx-auto  min-w-[75%]">
        {Object.keys(users).length > 0 ? (
          <table className="w-[900px] flex flex-col  min-w-[75%] mx-auto">
            <thead className="bg-color-primary text-white">
              <tr>
                <th className="p-4 w-[300px]">Username</th>

                <th className="p-4 w-[300px]">Email</th>
                <th className="p-4 w-[300px]">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  className={`${i % 2 === 0 && "bg-gray-300"} `}
                >
                  <td className="p-4 w-[300px]">{user.username}</td>

                  <td className="p-4 w-[300px]">{user.email}</td>
                  <td className="p-4 w-[300px]">{user.authenticated_role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center p-8">
            <HashLoader size={100} color="#404529" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
