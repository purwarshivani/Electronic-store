import { request } from "../../request";

export const getAllProduct = () => {
  return request.get("v1/product");
};
