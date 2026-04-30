// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAuthAdminStatus } from "../feature/authSlice";
// import LoadSpinner from "./LoadSpinner";
// import { useNavigate } from "react-router-dom";

// const ProtectedAdminRoutes = ({children}) => {
//   const { loading, error, admin } = useSelector((state) => state.adminAuth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(checkAuthAdminStatus);
//   }, [dispatch]);

//   if (loading) {
//     return <LoadSpinner />;
//   }

//   if (error || !admin) {
//     navigate("/admin/login");
//     return null;
//   }
//   return children
// };

// export default ProtectedAdminRoutes;
