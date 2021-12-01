const initialState = {
  products: [],
  cart: [],

  fetchState: 0,
  cartState: 0,

  error: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCT_PENDING":
      return { ...state, fetchState: 1 };
    case "GET_ALL_PRODUCT_FULFILLED":
      return { ...state, fetchState: 2, products: action.payload.data };
    case "GET_ALL_PRODUCT_REJECTED":
      return { ...state, fetchState: 3 };

    // case "GET_ITEM_OF_CART_PENDING":
    //   return { ...state, cartState: 1 };
    // case "GET_ITEM_OF_CART_FULFILLED":
    //   return { ...state, cartState: 2, cart: action.payload.data };
    // case "GET_ITEM_OF_CART_REJECTED":
    //   return { ...state, cartState: 3 };
    case "ADD_TO_CART":
      const data = action.payload;

      let products = state.products;
      console.log("products", products);
      let dataArray = [];
      products.data.product.forEach((el) => {
        if (el.id === data.id) {
          const data = { ...el, stock: el.stock - 1 };
          console.log("Daata", data);
          dataArray.push(data);
        } else {
          dataArray.push(el);
        }
      });
      console.log(dataArray);
      return {
        ...state,
        products: { ...products, data: { product: dataArray } },
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
