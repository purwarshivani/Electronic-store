import * as source from "./source";

export function getAllProduct() {
  return {
    type: "GET_ALL_PRODUCT",
    payload: source.getAllProdu(),
  };
}

export function getCart(req) {
  console.log(req, "from Cart");
  return {
    type: "GET_ITEM_OF_CART",
    payload: req,
  };
}

export const addToCarts = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};
export const setCartVisible = (data) => {
  return {
    type: "CART_DROPDOWN_VISIBLE",
  };
};

export const updateCart = (data) => {
  return {
    type: "CART_UPDATE",
    payload: data,
  };
};

export const removeCartProduct = (data) => {
  return {
    type: "REMOVE_CART_PRODUCT",
    payload: data,
  };
};

export function seCartData() {
  return {
    type: "SET_CART_CHECKOUT",
  };
}

export function shipping() {
  return {
    type: "SET_SHIIPNG_CHECKOUT",
  };
}
