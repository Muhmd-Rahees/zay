import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <section className="bg-gray-700 py-10 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6 gap-8">
        <div className="flex flex-col">
          <h1 className="text-green-600 text-3xl font-light">Zay Shop</h1>
          <hr className="border-gray-500 mb-4 mt-4 w-[400px] font-extralight" />
          <div className="flex items-center space-x-2 mb-2">
            <IoLocationSharp className="mb-2 text-xl" />
            <p className="text-lg font-extralight mb-2">
              123 Consectetur at ligula 10660
            </p>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <FaPhone className="mb-2 text-xl" />
            <p className="text-lg font-extralight mb-2">010-020-0340</p>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <IoMdMail className="mb-2 text-xl" />
            <p className="text-lg font-extralight mb-2">info@company.com</p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-light">Products</h1>
          <hr className="border-gray-500 mb-4 mt-4 w-[400px] font-extralight" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-extralight mb-2">Luxury</p>
            <p className="text-lg font-extralight mb-2">Sport Wear</p>
            <p className="text-lg font-extralight mb-2">Men's Shoes</p>
            <p className="text-lg font-extralight mb-2">Women's Shoes</p>
            <p className="text-lg font-extralight mb-2">Popular Dress</p>
            <p className="text-lg font-extralight mb-2">Gym Accessories</p>
            <p className="text-lg font-extralight mb-2">Sport Shoes</p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-light">Further Info</h1>{" "}
          <hr className="border-gray-500 mb-4 mt-4 w-[400px] font-extralight" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-extralight mb-2">Home</p>
            <p className="text-lg font-extralight mb-2">About Us</p>
            <p className="text-lg font-extralight mb-2">Shop Locations</p>
            <p className="text-lg font-extralight mb-2">FAQs</p>
            <p className="text-lg font-extralight mb-2">Contact</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
