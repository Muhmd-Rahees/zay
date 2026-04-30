import React from "react";
import product_1 from "../assets/Product-1.jpg";
import gallery_1 from "../assets/gallery-1.jpg";
import gallery_2 from "../assets/gallery-2.jpg";
import gallery_3 from "../assets/gallery-3.jpg";

const Shop = () => {
  return (
    <section className="bg-white flex md:flex-row justify-center px-16 py-5 mt-12">
      <div className="flex space-x-4 w-full md:w-1/2 items-center">
        <div className="flex flex-col gap-4">

          {[gallery_1, gallery_2, gallery_3].map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt=""
                className="w-[200px] h-[189px] object-cover"
              />
            </div>
          ))}
        </div>
        <div>
          <img
            src={product_1}
            alt=""
            className="h-[600px] w-[600px] object-cover"
          />
        </div>
      </div>
      <div className="w-[50%]">
        <p>Men Round Neck Pure Cottin T-shirt</p>
      </div>
    </section>
  );
};

export default Shop;
