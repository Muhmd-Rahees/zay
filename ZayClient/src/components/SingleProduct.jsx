import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProuduct } from "../features/productSlice";
import LoadSpinner from "./LoadSpinner";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { addToCart } from "../features/cartSLice";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosConfig";
import { ToastContainer } from "react-toastify";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prodId } = useParams();
  const { singleProduct, loading, currency } = useSelector(
    (state) => state.products
  );
  const cart = useSelector((state) => state.cart);

  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");
  console.log("prodId :", prodId);

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select size");
      return;
    }
    dispatch(addToCart({ pId: prodId, size }));
  };

  console.log(size);
  useEffect(() => {
    console.log("Fetching product with prodId:", prodId);
    dispatch(fetchSingleProuduct(prodId));
  }, [prodId, dispatch]);

  useEffect(() => {
    if (cart.error === "UNAUTHORIZED") {
      toast.error("Please login to add items to your cart.");
      navigate("/signIn");
    }
  }, [cart.error, navigate]);

  useEffect(() => {
    if (
      singleProduct &&
      singleProduct.images &&
      singleProduct.images.length > 0
    ) {
      setImage(singleProduct.images[0]);
    }
  }, [singleProduct]);
  console.log(singleProduct);

  useEffect(() => {
    console.log("Single Product in state:", singleProduct);
  }, [singleProduct]);

  if (loading || !singleProduct) {
    return <LoadSpinner />;
  }
  return (
    <div className="p-6 border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto hide-scrollbar justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {singleProduct.images.map((item, index) => (
              <img
                src={item}
                alt=""
                key={index}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            {image ? (
              <img className="w-full h-auto" src={image} alt="" />
            ) : (
              <p>No Images</p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{singleProduct.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <FaStar className="text-yellow-500 w-3.5" />
            <FaStar className="text-yellow-500 w-3.5" />
            <FaStar className="text-yellow-500 w-3.5" />
            <FaStar className="text-yellow-500 w-3.5" />
            <FaRegStarHalfStroke className="text-yellow-500 w-3.5" />
            <p className="pl-2">(66)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {singleProduct.price}
          </p>
          <p>{singleProduct.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {singleProduct.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 cursor-pointer ${
                    item === size ? "border-green-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 cursor-pointer text-white px-8 py-3 text-sm active:bg-green-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
