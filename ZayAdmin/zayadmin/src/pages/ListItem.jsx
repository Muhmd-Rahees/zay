import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";
import { currency } from "../App";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";

const ListItem = () => {
  const [list, setList] = useState([]);
  const [deletePopUp, SetDeletePopUp] = useState(false);
  const [selectProdId, setSelectProdId] = useState(null);
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    categoryOfMonth: false,
    featuredProducts: false,
    sizes: [],
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const fetchList = async () => {
    try {
      const response = await axiosInstance.get("/admin/listProduct");
      if (response.data.success) {
        setList(response.data.product);
      } else {
        toast.error(response.data.message);
      }
      console.log(list);
      console.log(response.product);
    } catch (error) {
      console.log("show_error : ", error);
      toast.error(error.message);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await axiosInstance.delete(
        `/admin/deleteProduct/${selectProdId}`
      );

      if (response.data.success) {
        toast.success("Product deleted successfully");
        SetDeletePopUp(false);
        setSelectProdId(null);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  const openUpdatePopUp = (product) => {
    setUpdateForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      categoryOfMonth: product.categoryOfMonth,
      featuredProducts: product.featuredProducts,
      sizes: product.sizes,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
    setSelectProdId(product.pId);
    setUpdatePopUp(true);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateForm((prev) => ({ ...prev, [key]: file }));
    }
  };

  const handleSizeToggler = (size) => {
    setUpdateForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(updateForm).forEach(([key, value]) => {
        if (key === "sizes") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosInstance.put(
        `/admin/updateProduct/${selectProdId}`,
        formData
      );
      if (response.data.success) {
        toast.success("Product update successfully");
        setUpdatePopUp(false);
        fetchList();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="flex flex-col py-2 px-3 justify-center gap-2">
        <h1 className="text-center font-medium mb-2">All Products</h1>
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Catgory</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-dashed border-gray-300 text-sm"
            key={index}
          >
            <img className="w-12" src={item.images[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex justify-end items-end  gap-4 sm:flex sm:justify-center sm:items-center sm:gap-3">
              <MdOutlineModeEdit
                onClick={() => openUpdatePopUp(item)}
                className="cursor-pointer text-gray-600 hover:text-green-600"
                size={18}
              />
              <span className="text-gray-300">|</span>
              <AiOutlineDelete
                onClick={() => {
                  setSelectProdId(item.pId);
                  SetDeletePopUp(true);
                }}
                className="cursor-pointer text-gray-600 hover:text-red-600"
                size={18}
              />
            </div>
          </div>
        ))}

        {/* delete product pop up */}
        {deletePopUp && (
          <>
            <div className="bg-[#19203869] w-screen h-screen fixed inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 mt-4 w-[350px] max-w-[90%] rounded-md shadow-md text-center animate-fadeIn z-[50]">
                <p>You are about to delete a product</p>
                <div className="mx-auto flex flex-row items-center justify-center gap-8 py-8">
                  <button
                    className="w-28 h-12 rounded-md border border-violet-600 bg-violet-700 font-sans text-sm font-semibold leading-4 tracking-tight text-white text-center cursor-pointer hover:bg-violet-800 active:scale-95 transition"
                    onClick={deleteProduct}
                  >
                    YES
                  </button>
                  <button
                    className="w-28 h-12 rounded-md border border-red-600 bg-red-700 font-sans text-sm font-semibold leading-4 tracking-tight text-white text-center cursor-pointer hover:bg-red-800 active:scale-95 transition"
                    onClick={() => SetDeletePopUp(false)}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* update product pop up */}

        {updatePopUp && (
          <>
            <div className="bg-[#19203869] w-screen h-screen fixed inset-0 z-50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 mt-4 w-[350px] max-w-[95%] md:max-w-[600px] rounded-md shadow-md animate-fadeIn overflow-y-auto max-h-[90vh]">
                <form
                  onSubmit={handleUpdateSubmit}
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-lg font-semibold text-center">
                    Update Product
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    {["image1", "image2", "image3", "image4"].map(
                      (item, index) => (
                        <label key={index} className="relative cursor-pointer">
                          {updateForm[item] ? (
                            <img
                              src={URL.createObjectURL(updateForm[item])}
                              alt={item}
                              className="w-full h-32 object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-32 flex items-center justify-center border rounded hover:bg-gray-100">
                              <IoCloudUploadOutline
                                size={32}
                                className="text-gray-400"
                              />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => handleImageChange(e, item)}
                          />
                        </label>
                      )
                    )}
                  </div>

                  <input
                    type="text"
                    name="name"
                    value={updateForm.name}
                    placeholder="Product Name"
                    onChange={handleUpdateInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <textarea
                    name="description"
                    value={updateForm.description}
                    placeholder="Description"
                    onChange={handleUpdateInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={updateForm.price}
                    placeholder="Price"
                    onChange={handleUpdateInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <select
                    name="category"
                    value={updateForm.category}
                    onChange={handleUpdateInputChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>

                  <select
                    name="subCategory"
                    value={updateForm.subCategory}
                    onChange={handleUpdateInputChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <div
                        key={size}
                        onClick={() => handleSizeToggler(size)}
                        className={`px-3 py-1 rounded cursor-pointer ${
                          updateForm.sizes.includes(size)
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {size}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="categoryOfMonth"
                        checked={updateForm.categoryOfMonth}
                        onChange={handleUpdateInputChange}
                      />
                      Category of Month
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="featuredProducts"
                        checked={updateForm.featuredProducts}
                        onChange={handleUpdateInputChange}
                      />
                      Featured Product
                    </label>
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-2 rounded text-white font-semibold ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 active:scale-95 transition"
                      }`}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpdatePopUp(false)}
                      className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 active:scale-95 transition text-white font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListItem;
