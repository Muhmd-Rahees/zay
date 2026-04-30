import { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import Collections from "./components/Collections";
import UserLayout from "./layout/UserLayout";
import Shop from "./components/Shop";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import PlaceOrder from "./components/PlaceOrder";
import Orders from "./components/Orders";
import ProfilePage from "./components/ProfilePage";
import Verify from "./components/Verify";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/single-product/:prodId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/placeOrder" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
