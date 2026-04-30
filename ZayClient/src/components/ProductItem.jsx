import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ pId, name, price, images }) => {
  const navigate = useNavigate();
  const currency = useSelector((state) => state.products.currency);
  return (
    <div
      onClick={() => navigate(`/single-product/${pId}`)}
      className="block group:"
    >
      <div className="border rounded-lg overflow-hidden shadow-sm  transition-transform hover:scale-105 bg-white">
        {/* <img src={images?.[0]} alt={name} className="w-full h-48 object-cover" /> */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
          <img
            src={images?.[0] || "/placeholder.png"}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-2">
          <p className="text-sm font-medium truncate">{name}</p>
          <p className="text-sm font-semibold text-gray-700">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
