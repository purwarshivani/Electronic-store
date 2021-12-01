import * as source from "./source";

export function getAllProduct() {
  return {
    type: "GET_ALL_PRODUCT",
    payload: source.getAllProduct(),
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
