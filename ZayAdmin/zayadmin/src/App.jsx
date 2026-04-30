import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminLayout from "./layout/AdminLayout";
import Home from "./components/Home";
import AddItem from "./pages/AddItem";
import ListItem from "./pages/ListItem";
import Order from "./pages/Order";
import { ToastContainer, toast } from "react-toastify";

export const currency = "$";

const App = () => {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/list" element={<ListItem />} />
          <Route path="/orders" element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
