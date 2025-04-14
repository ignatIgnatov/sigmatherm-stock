import React from "react";
import { data, syncData } from "../../utils/temp";
import Navbar from "../nav/Navbar";

const Syncs = () => {
  if (!syncData || syncData.length === 0) {
    return <p>Няма данни за показване.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-row justify-evenly items-center">
        <div className="overflow-x-auto m-4 rounded-md border border-gray-300 w-1/2">
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
                {syncData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-2 py-1 border-t text-sm border-b border-gray-300 whitespace-nowrap">
                      {item.store}
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
