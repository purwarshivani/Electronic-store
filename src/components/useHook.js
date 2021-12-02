import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const useHook = (init) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { visible } = useSelector((state) => state.ProdcutReducer);
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      dispatch({ type: "CART_DROPDOWN_VISIBLE" });
    }
  };
  useEffect(() => {
    if (visible) {
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    }
  }, [ref, visible]);
  
  return { ref };
};
export default useHook;