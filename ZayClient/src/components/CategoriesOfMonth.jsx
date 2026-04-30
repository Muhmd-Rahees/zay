import React, { useEffect, useState } from "react";
import watchImg from "../assets/watch.jpg";
import shoeImg from "../assets/shoes.jpg";
import glassImg from "../assets/accessories.jpg";
import { fetchProducts } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

// const categories = [
//   {
//     title: "watches",
//     image: watchImg,
//   },
//   {
//     title: "shoes",
//     image: shoeImg,
//   },
//   { title: "accessories", image: glassImg },
// ];

const CategoriesOfMonth = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/product/list-product");

        if (response.data?.success && Array.isArray(response.data.product)) {
          // Only keep categoryOfMonth: true
          const filtered = response.data.product.filter(
            (item) => item.categoryOfMonth === true
          );

          setCategories(filtered.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 text-center bg-white">
      <h1 className="text-4xl font-light text-gray-800 mt-12">
        Categories of The Month
      </h1>
      <p className="text-gray-600 mt-4 mb-12 max-w-2xl mx-auto px-4">
        Discover our handpicked collection of this month's most popular and
        trending categories—curated to inspire your lifestyle and elevate your
        space.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-4">
        {categories.length === 0 ? (
          <p className="text-gray-400">No featured categories this month.</p>
        ) : (
          categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4"
            >
              <img
                src={category.images[0]}
                alt={category.name}
                className="w-52 h-52 object-cover rounded-full shadow-md border-2 border-green-500"
              />
              <h5 className="text-lg font-semibold mt-4">{category.name}</h5>
              <button
                onClick={() => navigate(`/single-product/${category.pId}`)}
                className="bg-green-500 text-white py-2 px-5 mt-2 rounded hover:bg-green-600 cursor-pointer transition"
              >
                Go Shop
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CategoriesOfMonth;
