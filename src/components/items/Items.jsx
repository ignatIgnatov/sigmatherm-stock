import React, { useEffect, useState } from "react";
import { stores } from "../../utils/temp";
import { Pencil, Trash } from "lucide-react";
import Navbar from "../nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/products/productSlice";

const Items = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [status, dispatch]);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setEditMode(false);
    setEditedItem({ ...item });
  };

  const closeModal = () => {
    setSelectedItem(null);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e, key) => {
    setEditedItem({ ...editedItem, [key]: e.target.value });
  };

  const handlePriceChange = (e, store) => {
    setEditedItem({
      ...editedItem,
      prices: {
        ...editedItem.prices,
        [store]: e.target.value,
      },
    });
  };

  const handleSave = () => {
    setSelectedItem(editedItem);
    setEditMode(false);
    setSelectedItem(null);
  };

  const handleArchiveClick = () => {
    setSelectedItem(editedItem);
    setShowConfirmModal(true);
  };

  const confirmArchive = () => {
    setShowConfirmModal(false);
    setSelectedItem(null);
  };

  const cancelArchive = () => {
    setShowConfirmModal(false);
    setSelectedItem(null);
  };

  const handleRefreshAllStocks = () => {};

  if (!items || items.length === 0)
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
      <div className="overflow-x-auto m-4 rounded-md border border-gray-300">
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
          <table className="min-w-full border-collapse rounded-md">
            <thead>
              <tr className="bg-gray-300 sticky top-0 z-10">
                <th className="p-2 text-center font-semibold border-b border-gray-300">
                  ID
                </th>
                <th className="p-2 text-left font-semibold border-b border-gray-300">
                  Продукт
                </th>
                <th className="p-2 text-left font-semibold border-b border-gray-300">
                  Доставчик
                </th>
                <th className="p-2 text-center font-semibold border-b border-gray-300">
                  Базова цена
                </th>
                <th className="p-2 text-left font-semibold border-b border-gray-300">
                  Наличност
                </th>
                <th
                  colSpan={stores.length}
                  className="p-2 text-center font-semibold border-b border-gray-300"
                >
                  Цена
                </th>
              </tr>
              <tr className="bg-gray-100 sticky top-1 z-10">
                <th colSpan={4}></th>
                <th>
                  <div className="border border-gray-200 rounded-md shadow-lg font-semibold hover:bg-gray-200 hover:shadow-xl">
                    <button onClick={handleRefreshAllStocks}>Обнови</button>
                  </div>
                </th>
                {stores.map((store, index) => (
                  <th
                    key={index}
                    className="px-3 py-2 text-center text-sm font-semibold border-b border-gray-300"
                  >
                    {store}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item?.id}
                  className="hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="px-2 py-1 border-t text-sm border-b border-gray-300">
                    {item?.id}
                  </td>
                  <td className="px-2 py-1 border-t text-sm border-b border-gray-300 max-w-[500px] truncate">
                    {item?.name}
                  </td>
                  <td className="px-2 py-1 text-center border-t text-sm border-b border-gray-300">
                    {item?.supplier?.name}
                  </td>
                  <td className="px-2 py-1 text-center border-t text-sm border-b border-gray-300">
                    {item?.price?.basePrice || "---"}
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300">
                    {item?.stock} бр.
                  </td>
                  {/* {stores.map((store) => (
                    <td
                      key={store}
                      className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap"
                    >
                      {item.prices[store] ? item.prices[store] : "-----"}
                    </td>
                  ))} */}
                  {/* Физически магазин */}
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {"-----"}
                  </td>
                  {/* eMag Bg */}
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.emagBgSalePrice).toFixed(2) || "-----"}
                  </td>
                  {/* eMag Ro */}
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.emagRoSalePrice).toFixed(2) || "-----"}
                  </td>
                  {/* eMag Hun */}
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.emagHuSalePrice).toFixed(2) || "-----"}
                  </td>
                  {/* scroutz.gr */}
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.skroutzSalePrice).toFixed(2) ||
                      "-----"}
                  </td>
                  {/* bol.com */}
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.bolSalePrice).toFixed(2) || "-----"}
                  </td>
                  {/* magento */}
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.magentoSalePrice).toFixed(2) ||
                      "-----"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative flex flex-col gap-4">
            <div className="border-b border-gray-400 h-5 w-full">
              {!editMode && (
                <div>
                  <button
                    onClick={handleEditClick}
                    className="absolute top-4 left-4 text-gray-500 hover:text-black text-lg"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={handleArchiveClick}
                    className="absolute top-4 left-12 text-gray-500 hover:text-black text-lg"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              )}

              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col justify-evenly items-start gap-2">
              <label>
                <span className="font-semibold">ID:</span>{" "}
                <span>{selectedItem?.id}</span>
              </label>

              <label className="w-full">
                <span className="font-semibold">Продукт:</span>{" "}
                {editMode ? (
                  <input
                    type="text"
                    value={editedItem.name}
                    onChange={(e) => handleChange(e, "name")}
                    className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded px-3 py-2 w-full outline-none"
                  />
                ) : (
                  <span>{selectedItem?.name}</span>
                )}
              </label>

              <label className="w-full">
                <span className="font-semibold">Доставчик:</span>{" "}
                {editMode ? (
                  <input
                    type="text"
                    value={editedItem?.supplier?.name}
                    onChange={(e) => handleChange(e, "supplier")}
                    className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded px-3 py-2 w-full outline-none"
                  />
                ) : (
                  <span>{selectedItem?.supplier?.name}</span>
                )}
              </label>

              <div className="flex flex-row justify-between items-center w-full gap-8">
                <label className="w-full">
                  <span className="font-semibold">Базова цена:</span>{" "}
                  {editMode ? (
                    <input
                      type="number"
                      value={editedItem?.basePrice}
                      onChange={(e) => handleChange(e, "basePrice")}
                      className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded px-3 py-2 w-full outline-none"
                    />
                  ) : (
                    <span>{selectedItem?.basePrice || "---"}</span>
                  )}
                </label>

                <label className="w-full">
                  <span className="font-semibold">Наличност:</span>{" "}
                  {editMode ? (
                    <input
                      type="number"
                      value={editedItem?.availability}
                      onChange={(e) => handleChange(e, "totalStock")}
                      className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded px-3 py-2 w-full outline-none"
                    />
                  ) : (
                    <span>{selectedItem?.availability} бр.</span>
                  )}
                </label>
              </div>

              {!editMode && (
                <div className="w-full flex flex-row justify-end items-center px-6">
                  <div className="p-1 px-6 border border-gray-300 rounded-lg shadow-md font-semibold hover:bg-gray-300">
                    <button onClick={handleRefreshAllStocks}>
                      Обнови наличност
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 w-full">
                <h3 className="font-semibold">Цени:</h3>
                <ul
                  className={
                    editMode
                      ? "flex flex-row flex-wrap justify-between gap-6 items-center w-full"
                      : "ml-4 flex flex-col gap-2"
                  }
                >
                  {stores.map((store) => (
                    <li key={store}>
                      {store}:{" "}
                      {editMode ? (
                        <input
                          type="number"
                          // value={editedItem.prices[store] || "-----"}
                          value={"-----"}
                          onChange={(e) => handlePriceChange(e, store)}
                          className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded p-1 w-24 outline-none"
                        />
                      ) : (
                        // <span>{selectedItem.prices[store] || "-----"}</span>
                        <span>{"-----"}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Запази
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <p className="text-lg font-medium mb-4">
              Искаш ли да архивираш този продукт?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelArchive}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Отказ
              </button>
              <button
                onClick={confirmArchive}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Архивирай
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Items;
