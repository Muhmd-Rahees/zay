// import React, { useState } from "react";
// import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
// import { IoIosContact } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { setShowSearch } from "../features/productSlice";
// const Navbar = () => {
//   const { user } = useSelector((states) => states.auth); // check the store to understand where it comes from, here we distructured the user only , coz the state contain all that is final
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [menuOpen, setMenuOpen] = useState(false);

//   const { items } = useSelector((state) => state.cart);
//   const cartCount = items
//     ? Object.values(items).reduce((acc, sizesObj) => {
//         const totalPerProduct = Object.values(sizesObj).reduce((sum, qty) => {
//           if (typeof qty === "number") return sum + qty;
//           if (typeof qty === "object" && qty !== null && "quantity" in qty) {
//             return sum + qty.quantity;
//           }
//           return sum;
//         }, 0);
//         return acc + totalPerProduct;
//       }, 0)
//     : 0;

//   console.log(user, "******************");

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   console.log(JSON.stringify(items, null, 2));

//   return (
//     <nav className="bg-white/95 backdrop:-blur sticky top-0 z-50 transition-all duration-300 shadow-sm">
//       <div className="container mx-auto flex items-center justify-between py-6 px-4 md:px-12">
//         <Link to="/">
//           <div className="text-4xl font-semibold text-green-600 cursor-pointer">
//             Zay
//           </div>
//         </Link>
//         <div
//           className="md:hidden text-2xl text-gray-800 cursor-pointer"
//           onClick={toggleMenu}
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </div>

//         <ul className=" hidden md:flex space-x-14 text-xl text-gray-800 font-light">
//           <NavLink to={"/"}>
//             <p className="hover:text-green-600">Home</p>
//           </NavLink>
//           <NavLink to={"/about"}>
//             <p className="hover:text-green-600">About</p>
//           </NavLink>
//           <NavLink to={"/collections"}>
//             <p className="hover:text-green-600">Shop</p>
//           </NavLink>

//           <div className="bg-green-600 text-white rounded-md px-2">
//             <span>
//               {/* Contact */}
//               {user?.username}
//             </span>{" "}
//           </div>
//         </ul>

//         <div className="hidden md:flex space-x-6 items-center text-gray-800">
//           <span>
//             <FaSearch
//               className="text-xl cursor-pointer"
//               onClick={() => {
//                 dispatch(setShowSearch(true));
//                 if (window.location.pathname !== "/collections") {
//                   navigate("/collections");
//                 }
//               }}
//             />
//           </span>
//           <span
//             className="relative cursor-pointer"
//             onClick={() => navigate("/cart")}
//           >
//             <FaShoppingCart className="text-xl" />
//             <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-[10px] min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
//               {cartCount}
//             </span>
//           </span>
//           <span>
//             <IoIosContact className="text-xl cursor-pointer" />
//           </span>
//         </div>
//       </div>
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-md px-4 py-4">
//           <ul className="space-y-4 text-gray-800 text-lg">
//             <NavLink to={"/"} onClick={toggleMenu}>
//               <a href="#" className="block hover:text-green-600">
//                 Home
//               </a>
//             </NavLink>
//             <NavLink to={"/about"} onClick={toggleMenu}>
//               <a href="#" className="block hover:text-green-600">
//                 About
//               </a>
//             </NavLink>
//             <NavLink to={"collections"} onClick={toggleMenu}>
//               <a href="#" className="block hover:text-green-600">
//                 Shop
//               </a>
//             </NavLink>
//             <NavLink to={"/contact"} onClick={toggleMenu}>
//               <a href="#" className="block hover:text-green-600">
//                 Contact
//               </a>
//             </NavLink>
//           </ul>
//           <div className="flex space-x-4 mt-4">
//             <FaSearch className="text-xl" />
//             <span
//               className="relative cursor-pointer"
//               onClick={() => {
//                 navigate("/cart");
//                 toggleMenu();
//               }}
//             >
//               <FaShoppingCart className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </span>
//             <IoIosContact className="text-xl" />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { setShowSearch } from "../features/productSlice";

const Navbar = () => {
  const { user } = useSelector((states) => states.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/signUp");
    }
  };

  const cartCount = items
    ? Object.values(items).reduce((acc, sizesObj) => {
        const totalPerProduct = Object.values(sizesObj).reduce((sum, qty) => {
          if (typeof qty === "number") return sum + qty;
          if (typeof qty === "object" && qty !== null && "quantity" in qty) {
            return sum + qty.quantity;
          }
          return sum;
        }, 0);
        return acc + totalPerProduct;
      }, 0)
    : 0;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchClick = () => {
    dispatch(setShowSearch(true));
    if (location.pathname !== "/collections") {
      navigate("/collections");
    }
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop:-blur sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-6 px-4 md:px-12">
        <Link to="/">
          <div className="text-4xl font-semibold text-green-600 cursor-pointer">
            Zay
          </div>
        </Link>

        <div
          className="md:hidden text-2xl text-gray-800 cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className="hidden md:flex space-x-14 text-xl text-gray-800 font-light">
          <NavLink to={"/"}>
            <p className="hover:text-green-600">Home</p>
          </NavLink>
          <NavLink to={"/about"}>
            <p className="hover:text-green-600">About</p>
          </NavLink>
          <NavLink to={"/collections"}>
            <p className="hover:text-green-600">Shop</p>
          </NavLink>

          <div className="bg-green-600 text-white rounded-md px-2">
            <span>{user?.username}</span>
          </div>
        </ul>

        <div className="hidden md:flex space-x-6 items-center text-gray-800">
          <FaSearch
            className="text-xl cursor-pointer"
            onClick={handleSearchClick}
          />

          <span
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-[10px] min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
              {cartCount}
            </span>
          </span>

          <IoIosContact
            onClick={handleProfileClick}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4">
          <ul className="space-y-4 text-gray-800 text-lg">
            <NavLink to={"/"} onClick={toggleMenu}>
              <span className="block hover:text-green-600">Home</span>
            </NavLink>
            <NavLink to={"/about"} onClick={toggleMenu}>
              <span className="block hover:text-green-600">About</span>
            </NavLink>
            <NavLink to={"/collections"} onClick={toggleMenu}>
              <span className="block hover:text-green-600">Shop</span>
            </NavLink>
            {/* <NavLink to={"/contact"} onClick={toggleMenu}>
              <span className="block hover:text-green-600">Contact</span>
            </NavLink> */}
          </ul>
          <div className="flex space-x-4 mt-4">
            <FaSearch className="text-xl" onClick={handleSearchClick} />
            <span
              className="relative cursor-pointer"
              onClick={() => {
                navigate("/cart");
                toggleMenu();
              }}
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
            <IoIosContact onClick={handleProfileClick} className="text-xl" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
