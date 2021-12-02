import { request } from "../../request";

export const getAllProdu = () => {
  return request.get("v1/product");
};
