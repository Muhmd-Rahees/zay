import React from "react";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const { products, currency } = useSelector((state) => state.products);
  const { items, loading, shippingCharge } = useSelector((state) => state.cart);

  const subTotal = Array.isArray(items)
    ? items.reduce((sum, item) => {
        const product = products.find((p) => p.pId === item.product.pId);
        if (!product) return sum;
        return sum + product.price * item.quantity;
      }, 0)
    : 0;

  const total = subTotal + (shippingCharge || 0);
  return (
    <div>
      {" "}
      <div className="w-full max-w-xs ml-auto pt-6 rounded-lg">
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
      </div>
    </div>
  );
};

export default CartTotal;
