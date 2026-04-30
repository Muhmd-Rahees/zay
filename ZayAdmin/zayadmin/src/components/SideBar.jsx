import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdSpaceDashboard } from "react-icons/md";


const SideBar = () => {
  return (
    <div className="border-r-1 min-h-screen w-[18%]">
      <div className="flex pl-[20%] text-[15px] pt-5 flex-col gap-4">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l "
          to="/"
        >
          <MdSpaceDashboard  className="w-5 h-5" />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l "
          to="/add"
        >
          <IoIosAddCircleOutline className="w-5 h-5" />
          <p className="hidden md:block">Add Item</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l "
          to="/list"
        >
          <FaRegListAlt className="w-5 h-5" />
          <p className="hidden md:block">List Item</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l "
          to="/orders"
        >
          <TiTick className="w-5 h-5" />
          <p className="hidden md:block">Order Item</p>
        </NavLink>
        {/* <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l "
          to="/add"
        >
          <IoIosAddCircleOutline className="w-5 h-5" />
          <p className="hidden md:block">Add Item</p>
        </NavLink> */}
      </div>
    </div>
  );
};

export default SideBar;
