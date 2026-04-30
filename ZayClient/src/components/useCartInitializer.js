// src/hooks/useCartInitializer.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cartSLice";

const useCartInitializer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);
};

export default useCartInitializer;
