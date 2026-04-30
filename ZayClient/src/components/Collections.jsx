import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import LoadSpinner from "./LoadSpinner";
import ProductItem from "./ProductItem";
import { fetchProducts, setShowSearch } from "../features/productSlice";

const Collections = () => {
  const dispatch = useDispatch();
  const { products, loading, error, showSearch } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!products || !Array.isArray(products)) return;

    let filtered = products.slice();

    // Category filter
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Subcategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortType === "Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayProducts(filtered);
  }, [products, category, subCategory, searchQuery, sortType]);

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="flex flex-row gap-4 sm:gap-6 w-full justify-center items-center">
          {showSearch && (
            <input
              type="text"
              placeholder="Search products..."
              id="search-input"
              className="border rounded px-3 py-2 mb-6 w-full md:w-1/2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          {showSearch && (
            <button
              className="text-gray-600  mb-4 cursor-pointer font-medium text-2xl sm:text-2xl"
              onClick={() => dispatch(setShowSearch(false))}
            >
              X
            </button>
          )}
        </div>

        {loading && (
          <div className="relative w-full md:w-1/2 h-2 bg-gray-200 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-[loading_1.2s_linear_infinite]"></div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row px-16 py-12 gap-8">
        <div>
          <div className="min-w-60">
            <h3 className="font-semibold mb-6">FILTERS</h3>
            <div className="border p-4 mb-4">
              <h4 className="font-medium mb-2">CATEGORIES</h4>
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
            <div className="border p-4">
              <h4 className="font-medium mb-2">TYPE</h4>
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <label key={sub} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    value={sub}
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(sub)}
                  />
                  <span>
                    {sub === "Topwear"
                      ? "Top wear"
                      : sub === "Bottomwear"
                      ? "Bottom wear"
                      : "Winterwear"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[80%]">
          <div className="flex justify-between">
            <h2 className="text-sm sm:text-xl font-semibold">
              ALL COLLECTIONS
            </h2>
            <div className="flex items-center gap-4 sm:border px-3 py-1 rounded-md">
              <select
                className="outline-none text-sm sm:px-2"
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="Low to High">Sort by: Low to High</option>
                <option value="High to Low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <LoadSpinner />
          ) : (
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {displayProducts.length === 0 && (
                <p className="text-sm font-medium">No Products Found</p>
              )}
              {displayProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  pId={item.pId}
                  name={item.name}
                  price={item.price}
                  images={item.images}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collections;
