import React, { useEffect, useState } from "react";
import { stores } from "../../utils/temp";
import { Pencil, Trash } from "lucide-react";
import Navbar from "../nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/products/productSlice";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import PageSizeDropdown from "../components/PageSizeDropdown";
import SearchComponent from "../components/SearchComponent";

const Items = () => {
  const dispatch = useDispatch();
  const { pagination, status } = useSelector((state) => state.products);
  const items = pagination.content || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [pageable, setPageable] = useState({
    page: 0,
    size: 10,
    sort: "id,asc",
    search: debouncedSearchTerm.trim(),
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    supplier: "",
    basePrice: "",
    stock: "",
    microInvestPrice: "",
    emagBgSalePrice: "",
    emagRoSalePrice: "",
    emagHuSalePrice: "",
    skroutzSalePrice: "",
    bolSalePrice: "",
    magentoSalePrice: "",
  });

  useEffect(() => {
    dispatch(fetchAllProducts(pageable));
  }, [dispatch, pageable]);

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setPageable((prev) => ({
      ...prev,
      page: 0,
      search: debouncedSearchTerm.trim(),
    }));
  }, [debouncedSearchTerm]);

  const handlePageChange = (newPage) => {
    setPageable((prev) => ({ ...prev, page: newPage }));
  };

  const handleSizeChange = (e) => {
    setPageable((prev) => ({ ...prev, size: Number(e.target.value), page: 0 }));
  };

  const handleSortChange = (field) => {
    const [currentField, currentDir] = pageable.sort.split(",");
    const newDir =
      currentField === field && currentDir === "asc" ? "desc" : "asc";
    setPageable((prev) => ({ ...prev, sort: `${field},${newDir}`, page: 0 }));
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value?.trim()) error = "Името е задължително";
        else if (value.length > 100)
          error = "Името трябва да е под 100 символа";
        break;
      case "supplier":
        if (!value?.trim()) error = "Доставчикът е задължителен";
        break;
      case "basePrice":
      case "microInvestPrice":
      case "emagBgSalePrice":
      case "emagRoSalePrice":
      case "emagHuSalePrice":
      case "skroutzSalePrice":
      case "bolSalePrice":
      case "magentoSalePrice":
        if (value === "" || value === null || value === undefined) return "";
        if (isNaN(value) || value < 0) error = "Трябва да е положително число";
        else if (value > 100000) error = "Цената трябва да е под 100 000";
        break;
      case "stock":
        if (isNaN(value) || value < 0)
          error = "Наличността трябва да е положително число";
        else if (!Number.isInteger(Number(value)))
          error = "Трябва да е цяло число";
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", editedItem.name),
      supplier: validateField("supplier", editedItem.supplier?.name),
      basePrice: validateField("basePrice", editedItem.price?.basePrice),
      stock: validateField("stock", editedItem.stock),
      microInvestPrice: validateField(
        "microInvestPrice",
        editedItem.price?.microInvestPrice
      ),
      emagBgSalePrice: validateField(
        "emagBgSalePrice",
        editedItem.price?.emagBgSalePrice
      ),
      emagRoSalePrice: validateField(
        "emagRoSalePrice",
        editedItem.price?.emagRoSalePrice
      ),
      emagHuSalePrice: validateField(
        "emagHuSalePrice",
        editedItem.price?.emagHuSalePrice
      ),
      skroutzSalePrice: validateField(
        "skroutzSalePrice",
        editedItem.price?.skroutzSalePrice
      ),
      bolSalePrice: validateField(
        "bolSalePrice",
        editedItem.price?.bolSalePrice
      ),
      magentoSalePrice: validateField(
        "magentoSalePrice",
        editedItem.price?.magentoSalePrice
      ),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setEditMode(false);
    setEditedItem({ ...item });
    setErrors({
      name: "",
      supplier: "",
      basePrice: "",
      stock: "",
      microInvestPrice: "",
      emagBgSalePrice: "",
      emagRoSalePrice: "",
      emagHuSalePrice: "",
      skroutzSalePrice: "",
      bolSalePrice: "",
      magentoSalePrice: "",
    });
  };

  const closeModal = () => {
    setSelectedItem(null);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e, key) => {
    const value = e.target.value;
    let updatedItem = { ...editedItem };

    if (key === "basePrice" || key === "totalStock") {
      updatedItem = {
        ...updatedItem,
        price: {
          ...updatedItem.price,
          [key]: value,
        },
      };
    } else if (key === "supplier") {
      updatedItem = {
        ...updatedItem,
        supplier: {
          ...updatedItem.supplier,
          name: value,
        },
      };
    } else {
      updatedItem = {
        ...updatedItem,
        [key]: value,
      };
    }

    setEditedItem(updatedItem);

    // Validate the changed field
    if (key === "supplier") {
      setErrors({
        ...errors,
        supplier: validateField("supplier", value),
      });
    } else {
      setErrors({
        ...errors,
        [key]: validateField(key, value),
      });
    }
  };

  const handlePriceChange = (e, store) => {
    const value = e.target.value;
    const priceKey = {
      microinvest: "microInvestPrice",
      "eMag BG": "emagBgSalePrice",
      "eMag RO": "emagRoSalePrice",
      "eMag HUN": "emagHuSalePrice",
      "scroutz.gr": "skroutzSalePrice",
      "bol.com": "bolSalePrice",
      magento: "magentoSalePrice",
    }[store];

    const updatedItem = {
      ...editedItem,
      price: {
        ...editedItem.price,
        [priceKey]: value,
      },
    };

    setEditedItem(updatedItem);

    // Validate price field
    setErrors({
      ...errors,
      [priceKey]: validateField(priceKey, value),
    });
  };

  const handleNumericChange = (e, field) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      handleChange(e, field);
    }
  };

  const handlePositiveNumberChange = (e, field) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    handleChange({ target: { value } }, field);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      // Here you would typically dispatch an update action
      // await dispatch(updateProduct(editedItem));

      // For now, just update the local state
      setSelectedItem(editedItem);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchiveClick = () => {
    setShowConfirmModal(true);
  };

  const confirmArchive = () => {
    // Dispatch archive action here
    setShowConfirmModal(false);
    setSelectedItem(null);
  };

  const cancelArchive = () => {
    setShowConfirmModal(false);
  };

  const handleRefreshAllStocks = () => {
    // Implement stock refresh
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
  } else if (!items || items.length === 0)
    return (
      <>
        <Navbar />
        <div className="m-4 flex justify-between items-center">
          <PageSizeDropdown value={pageable.size} onChange={handleSizeChange} />

          <Pagination
            currentPage={pageable.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />

          <SearchComponent onSearchChange={setSearchTerm} />
        </div>
        <div className="w-screen h-screen flex justify-center items-center">
          <p>Няма данни за показване.</p>
        </div>
      </>
    );

  return (
    <>
      <Navbar />

      <div className="m-4 flex justify-between items-center">
        <PageSizeDropdown value={pageable.size} onChange={handleSizeChange} />

        <Pagination
          currentPage={pageable.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />

        <SearchComponent onSearchChange={setSearchTerm} />
      </div>

      <div className="overflow-x-auto m-4 rounded-md border border-gray-300">
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
          <table className="min-w-full border-collapse rounded-md">
            <thead>
              <tr className="bg-gray-300 sticky top-0 z-10">
                <th onClick={() => handleSortChange("id")}>
                  ID{" "}
                  {pageable.sort.startsWith("id,") && (
                    <span>{pageable.sort.endsWith("asc") ? "↑" : "↓"}</span>
                  )}
                </th>
                <th onClick={() => handleSortChange("name")}>
                  Име{" "}
                  {pageable.sort.startsWith("name,") && (
                    <span>{pageable.sort.endsWith("asc") ? "↑" : "↓"}</span>
                  )}
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
                    {item?.supplier?.name || "---"}
                  </td>
                  <td className="px-2 py-1 text-center border-t text-sm border-b border-gray-300">
                    {item?.price?.basePrice || "---"}
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300">
                    {item?.stock} бр.
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.microInvestPrice).toFixed(2) ||
                      "-----"}
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.emagBgSalePrice).toFixed(2) || "-----"}
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.emagRoSalePrice).toFixed(2) || "-----"}
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.emagHuSalePrice).toFixed(2) || "-----"}
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.skroutzSalePrice).toFixed(2) ||
                      "-----"}
                  </td>
                  <td className="px-2 py-1 text-center text-sm border-t border-b border-gray-300 whitespace-nowrap">
                    {Number(item?.price?.bolSalePrice).toFixed(2) || "-----"}
                  </td>
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
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative flex flex-col gap-4">
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
                  <div>
                    <input
                      type="text"
                      value={editedItem.name}
                      onChange={(e) => handleChange(e, "name")}
                      className={`border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } focus:border-gray-400 focus:ring-0 rounded p-1 w-full outline-none`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                ) : (
                  <span>{selectedItem?.name}</span>
                )}
              </label>

              <label className="w-full">
                <span className="font-semibold">Доставчик:</span>{" "}
                {editMode ? (
                  <div>
                    <input
                      type="text"
                      value={editedItem?.supplier?.name || ""}
                      onChange={(e) => handleChange(e, "supplier")}
                      className={`border ${
                        errors.supplier ? "border-red-500" : "border-gray-300"
                      } focus:border-gray-400 focus:ring-0 rounded p-1 w-full outline-none`}
                    />
                    {errors.supplier && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.supplier}
                      </p>
                    )}
                  </div>
                ) : (
                  <span>{selectedItem?.supplier?.name || "---"}</span>
                )}
              </label>

              <div className="flex flex-row justify-between items-center w-full gap-8">
                <label className="w-full">
                  <span className="font-semibold">Базова цена:</span>{" "}
                  {editMode ? (
                    <div>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editedItem?.price?.basePrice || ""}
                        onChange={(e) => handleNumericChange(e, "basePrice")}
                        className={`border ${
                          errors.basePrice
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:border-gray-400 focus:ring-0 rounded p-1 w-full outline-none`}
                      />
                      {errors.basePrice && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.basePrice}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span>{selectedItem?.price?.basePrice || "---"}</span>
                  )}
                </label>

                <label className="w-full">
                  <span className="font-semibold">Наличност:</span>{" "}
                  {editMode ? (
                    <div>
                      <input
                        type="number"
                        min="0"
                        value={editedItem?.stock || ""}
                        onChange={(e) => handlePositiveNumberChange(e, "stock")}
                        className={`border ${
                          errors.stock ? "border-red-500" : "border-gray-300"
                        } focus:border-gray-400 focus:ring-0 rounded p-1 w-full outline-none`}
                      />
                      {errors.stock && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span>{selectedItem?.stock} бр.</span>
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
                      ? "flex flex-row flex-wrap justify-between gap-2 items-center w-full"
                      : "flex flex-row flex-wrap gap-2 items-center justify-evenly w-full"
                  }
                >
                  {stores.map((store) => {
                    const priceKey = {
                      microinvest: "microInvestPrice",
                      "eMag BG": "emagBgSalePrice",
                      "eMag RO": "emagRoSalePrice",
                      "eMag HUN": "emagHuSalePrice",
                      "scroutz.gr": "skroutzSalePrice",
                      "bol.com": "bolSalePrice",
                      magento: "magentoSalePrice",
                    }[store];

                    return (
                      <li
                        key={store}
                        className={
                          editMode
                            ? "w-[45%]"
                            : "border border-gray-300 shadow-md rounded-lg px-2 py-1"
                        }
                      >
                        {store}:{" "}
                        {editMode ? (
                          <div>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={
                                editedItem?.price?.[priceKey] !== undefined &&
                                editedItem?.price?.[priceKey] !== null
                                  ? editedItem?.price?.[priceKey]
                                  : ""
                              }
                              onChange={(e) => handlePriceChange(e, store)}
                              className={`border ${
                                errors[priceKey]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:border-gray-400 focus:ring-0 rounded px-1 w-24 outline-none`}
                            />
                            {errors[priceKey] && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors[priceKey]}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span>
                            {store === "microinvest"
                              ? Number(
                                  selectedItem?.price?.microInvestPrice
                                ).toFixed(2)
                              : store === "eMag BG"
                              ? Number(
                                  selectedItem?.price?.emagBgSalePrice
                                ).toFixed(2)
                              : store === "eMag RO"
                              ? Number(
                                  selectedItem?.price?.emagRoSalePrice
                                ).toFixed(2)
                              : store === "eMag HUN"
                              ? Number(
                                  selectedItem?.price?.emagHuSalePrice
                                ).toFixed(2)
                              : store === "scroutz.gr"
                              ? Number(
                                  selectedItem?.price?.skroutzSalePrice
                                ).toFixed(2)
                              : store === "bol.com"
                              ? Number(
                                  selectedItem?.price?.bolSalePrice
                                ).toFixed(2)
                              : store === "magento"
                              ? Number(
                                  selectedItem?.price?.magentoSalePrice
                                ).toFixed(2)
                              : ""}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  disabled={isSaving}
                >
                  Отказ
                </button>
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 text-white rounded ${
                    Object.values(errors).some((e) => e) || isSaving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                  disabled={isSaving || Object.values(errors).some((e) => e)}
                >
                  {isSaving ? "Запазване..." : "Запази"}
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
              Искаш ли да изтриеш този продукт?
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
                Изтрий
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Items;
