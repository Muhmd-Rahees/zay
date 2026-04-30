import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";

const AddItem = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    image1: false,
    image2: false,
    image3: false,
    image4: false,
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    categoryOfMonth: false,
    featuredProducts: false,
    sizes: [],
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, [key]: file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeToggler = (itemSize) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(itemSize)
        ? prev.sizes.filter((item) => item !== itemSize)
        : [...prev.sizes, itemSize],
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "sizes") {
          formData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          value.forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, value);
        }
      });
      console.log("formData___", [...formData]);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosInstance.post("/admin/addProduct", formData);
      console.log("response_api-------", response);
      setForm({
        image1: false,
        image2: false,
        image3: false,
        image4: false,
        name: "",
        description: "",
        price: "",
        category: "Men",
        subCategory: "Topwear",
        categoryOfMonth: false,
        featuredProducts: false,
        sizes: [],
      });
      toast.success("Product added successfully!");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to add products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-10 sm:py-10">
      {/* <form className="flex flex-col w-full items-start gap-3"> */}
      <form
        onSubmit={handelSubmit}
        className="flex flex-col w-full max-w-3xl gap-5"
      >
        <div>
          <p className="mb-2 font-medium text-center sm:text-left">
            Upload Image
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 justify-center sm:justify-start">
            {["image1", "image2", "image3", "image4"].map((index, key) => (
              <label htmlFor={index} key={key}>
                {form[index] ? (
                  <img
                    src={URL.createObjectURL(form[index])}
                    alt={key}
                    className="w-32 h-32 sm:w-20 sm:h-20 object-cover border cursor-pointer hover:opacity-80 transition"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-20 sm:h-20 flex items-center justify-center border cursor-pointer hover:bg-slate-100 transition">
                    <IoCloudUploadOutline className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                <input
                  type="file"
                  id={index}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index, key)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            className="w-full max-w-[500px] px-3 py-2"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            type="text"
            placeholder="Content here"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select
              className="w-full px-3 py-3"
              name="category"
              value={form.category}
              onChange={handleInputChange}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Sub category</p>
            <select
              className="w-full px-3 py-3"
              name="subCategory"
              value={form.subCategory}
              onChange={handleInputChange}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product price</p>
            <input
              className="w-full px-3 py-2.5 sm:w-[120px]"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              type="Number"
              placeholder="10"
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Product sizes</p>
          <div className="flex gap-3">
            <div onClick={() => handleSizeToggler("S")}>
              <p
                className={`${
                  form.sizes.includes("S") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div onClick={() => handleSizeToggler("M")}>
              <p
                className={`${
                  form.sizes.includes("M") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
            <div onClick={() => handleSizeToggler("L")}>
              <p
                className={`${
                  form.sizes.includes("L") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
            <div onClick={() => handleSizeToggler("XL")}>
              <p
                className={`${
                  form.sizes.includes("XL") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
            <div onClick={() => handleSizeToggler("XXL")}>
              <p
                className={`${
                  form.sizes.includes("XXL") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-4 gap-3">
          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              name="categoryOfMonth"
              checked={form.categoryOfMonth}
              onChange={handleInputChange}
              id="categoriesOfMonth"
            />
            <label className="cursor-pointer" htmlFor="categoriesOfMonth">
              Categories of month
            </label>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              name="featuredProducts"
              checked={form.featuredProducts}
              id="featuredProduct"
              onChange={handleInputChange}
            />
            <label className="cursor-pointer" htmlFor="featuredProduct">
              Featured product
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-28 py-3 mt-4 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : " bg-green-700 hover:bg-green-900 cursor-pointer text-white"
          }`}
        >
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
