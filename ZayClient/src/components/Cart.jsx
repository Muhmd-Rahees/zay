import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { fetchCart, updateCart } from "../features/cartSLice";
import CartTotal from "./CartTotal";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, currency } = useSelector((state) => state.products);
  const { items, loading, shippingCharge } = useSelector((state) => state.cart);
  const [updating, setUpdating] = useState(false);

  // const subTotal = Array.isArray(items)
  //   ? items.reduce((sum, item) => {
  //       const product = products.find((p) => p.pId === item.product.pId);
  //       if (!product) return sum;
  //       return sum + product.price * item.quantity;
  //     }, 0)
  //   : 0;

  // const total = subTotal + (shippingCharge || 0);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  console.log("🛒 Cart items from Redux:", items);
  console.log("📦 Products from Redux:", products);

  const handleQuantityChange = async (pId, size, quantity) => {
    try {
      await dispatch(updateCart({ pId, size, quantity }));
      // dispatch(fetchCart()); // force refetch to update UI
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-lg">
        Loading your cart...
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] text-gray-500">
        <img
          src={assets.empty_cart_icon}
          alt="Empty Cart"
          className="w-24 mb-4 opacity-70"
        />
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14 max-w-3xl mx-auto px-4 sm:px-0">
      <div className="text-2xl mb-6 font-semibold text-center">YOUR CART</div>

      <div className="space-y-4">
        {Array.isArray(items) &&
          items.map((item, index) => {
            const productData = products.find(
              (product) => product.pId === item.product.pId
            );

            if (!productData) {
              console.warn("Product not found for cart item:", item);
              return null;
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <img
                    src={productData.images[0]}
                    alt={productData.name}
                    className="w-16 sm:w-20 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1 sm:mt-2">
                      <p className="text-gray-800 font-medium">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 border sm:px-3 sm:py-1 bg-slate-50 text-xs sm:text-sm">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        handleQuantityChange(
                          item.product.pId,
                          item.size,
                          item.quantity - 1
                        );
                      }
                    }}
                    className="px-2 py-1 bg-gray-200 rounded text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => {
                      handleQuantityChange(
                        item.product.pId,
                        item.size,
                        item.quantity + 1
                      );
                    }}
                    className="px-2 py-1 bg-gray-200 rounded text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <img
                  src={assets.bin_icon}
                  alt="Delete"
                  className="w-4 sm:w-5 cursor-pointer"
                  onClick={() =>
                    handleQuantityChange(item.product.pId, item.size, 0)
                  }
                />
              </div>
            );
          })}
      </div>

      {/* <div className="w-full max-w-xs ml-auto pt-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-right">CART TOTAL</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Sub Total</span>
            <span className="font-medium">
              {currency}
              {subTotal}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Shipping Charge</span>
            <span className="font-medium">
              {currency}
              {shippingCharge}
            </span>
          </div>
          <div className="flex justify-between border-t pt-3 text-sm">
            <span className="text-gray-900 font-semibold">Total</span>
            <span className="font-semibold">
              {currency}
              {total}
            </span>
          </div>
        </div>
      </div> */}


      <CartTotal />

      <div className="flex justify-end my-12">
        <div className="w-full sm:w-[450px]">
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeOrder")}
              className="bg-green-600 hover:bg-blue-800 cursor-pointer transition text-white text-sm sm:text-base px-6 py-3 rounded-md"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
