import React, { useEffect } from "react";
import Navbar from "../nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchAllSyncronizations } from "../../store/syncs/syncSlice";

const Syncs = () => {
  const dispatch = useDispatch();
  const { syncs, status } = useSelector((state) => state.syncs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllSyncronizations());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  } else if (!syncs || syncs.length === 0)
    return (
      <>
        <Navbar />
        <div className="w-screen h-screen flex justify-center items-center">
          <p>Няма данни за показване.</p>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-row justify-evenly items-center">
        <div className="overflow-x-auto m-4 rounded-md border border-gray-300 w-2/3">
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
            <table className="min-w-full border-collapse rounded-md">
              <thead>
                <tr className="bg-gray-300 sticky top-0 z-10">
                  <th className="p-2 text-left font-semibold border-b border-gray-300">
                    ID
                  </th>
                  <th className="p-2 text-left font-semibold border-b border-gray-300">
                    Дата на четене
                  </th>
                  <th className="p-2 text-left font-semibold border-b border-gray-300">
                    Дата на писане
                  </th>
                  <th className="p-2 text-left font-semibold border-b border-gray-300">
                    Магазин
                  </th>
                </tr>
              </thead>
              <tbody>
                {syncs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item?.readDate}
                    </td>
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item?.writeDate}
                    </td>
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item?.platform}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Syncs;
