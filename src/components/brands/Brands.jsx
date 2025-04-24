import React, { useState } from "react";
import Navbar from "../nav/Navbar";
import { brands as initialBrands } from "../../utils/temp";
import { Check, X } from "lucide-react";

const Brands = () => {
  const [brandsData, setBrandsData] = useState(initialBrands);
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState(null);

  const handleRowClick = (index) => {
    setEditIndex(index);
    setEditRow({ ...brandsData[index] });
  };

  const handleChange = (e, field) => {
    setEditRow((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    const updated = [...brandsData];
    updated[editIndex] = editRow;
    setBrandsData(updated);
    setEditIndex(null);
    setEditRow(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditRow(null);
  };

  return (
    <div>
      <Navbar />
      <div className="overflow-x-auto m-4 rounded-md border border-gray-300">
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
          <table className="min-w-full border-collapse rounded-md">
            <thead>
              <tr className="bg-gray-300 sticky top-0 z-10">
                <th className="p-2 text-left font-semibold border-b border-gray-300">
                  Бранд
                </th>
                <th className="p-2 text-center font-semibold border-b border-gray-300">
                  Надценка за стандартна цена
                </th>
                <th className="p-2 text-center font-semibold border-b border-gray-300">
                  Отстъпка при кампания
                </th>
                <th className="p-2 text-center font-semibold border-b border-gray-300">
                  Отстъпка за Черен петък
                </th>
                <th className="p-2 text-center font-semibold border-b border-gray-300">
                  Отстъпка за Пролетна кампания
                </th>
                {editIndex !== null && (
                  <th className="p-2 text-center font-semibold border-b border-gray-300">
                    Действия
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {brandsData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <td className="px-2 py-1 border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        value={editRow.brand}
                        onChange={(e) => handleChange(e, "brand")}
                        className="w-full border p-1"
                      />
                    ) : (
                      item.brand
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow.standartPriceSurcharge}
                        onChange={(e) =>
                          handleChange(e, "standartPriceSurcharge")
                        }
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item.standartPriceSurcharge} %`
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow.campaignDiscount}
                        onChange={(e) => handleChange(e, "campaignDiscount")}
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item.campaignDiscount} %`
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow.blackFridayDiscount}
                        onChange={(e) => handleChange(e, "blackFridayDiscount")}
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item.blackFridayDiscount} %`
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow.springCampaignDiscount}
                        onChange={(e) =>
                          handleChange(e, "springCampaignDiscount")
                        }
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item.springCampaignDiscount} %`
                    )}
                  </td>
                  {editIndex === index && (
                    <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave();
                          }}
                          className="text-green-500 hover:text-green-800"
                          title="Запази"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancel();
                          }}
                          className="text-red-500 hover:text-red-800"
                          title="Отказ"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Brands;
