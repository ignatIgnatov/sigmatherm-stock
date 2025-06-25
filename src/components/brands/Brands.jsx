import React, { useEffect, useState } from "react";
import Navbar from "../nav/Navbar";
import { Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchAllBrands } from "../../store/brands/brandSlice";

const Brands = () => {
  const dispatch = useDispatch();
  const { brands, status } = useSelector((state) => state.brands);
  const [brandsData, setBrandsData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllBrands());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (brands && brands.length > 0) {
      setBrandsData(brands);
    }
  }, [dispatch, brands]);

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

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  } else if (!brands || brands.length === 0)
    return (
      <>
        <Navbar />
        <div className="w-screen h-screen flex justify-center items-center">
          <p>Няма данни за показване.</p>
        </div>
      </>
    );

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
                        value={editRow?.name}
                        onChange={(e) => handleChange(e, "brand")}
                        className="w-full border p-1"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow?.priceMargin}
                        onChange={(e) =>
                          handleChange(e, "standartPriceSurcharge")
                        }
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item?.priceMargin || "---"} %` || "---"
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow?.campaignDiscount || 0}
                        onChange={(e) => handleChange(e, "campaignDiscount")}
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item?.campaignDiscount || "---"} %`
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow?.blackFridayDiscount || 0}
                        onChange={(e) => handleChange(e, "blackFridayDiscount")}
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item.blackFridayDiscount || "---"} %`
                    )}
                  </td>
                  <td className="px-2 py-1 text-center border-t border-b border-gray-300">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editRow?.springCampaignDiscount || 0}
                        onChange={(e) =>
                          handleChange(e, "springCampaignDiscount")
                        }
                        className="w-full border p-1 text-center"
                      />
                    ) : (
                      `${item.springCampaignDiscount || "---"} %`
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
