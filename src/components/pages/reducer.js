const initialState = {
  products: [],
  cart: [],

  fetchState: 0,
  cartState: 0,
  visible: false,
  error: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCT_PENDING":
      return { ...state, fetchState: 1 };
    case "GET_ALL_PRODUCT_FULFILLED":
      const dataList = {
        ...state,
        fetchState: 2,
        products: action.payload.data,
      };
      return dataList;
    case "GET_ALL_PRODUCT_REJECTED":
      return { ...state, fetchState: 3 };

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

      return {
        ...state,
        products: { ...products, data: { product: dataArray } },
        cart: [
          ...state.cart,
          { product: { ...data, stock: data.stock - 1 }, quantity: 1 },
        ],
      };
    case "CART_DROPDOWN_VISIBLE":
      return {
        ...state,
        visible: !state.visible,
      };
    case "CART_UPDATE":
      const updateProduct = action.payload;
      let allProducts = state.products;
      const productI = allProducts.data.product.findIndex(
        (el) => el.id === updateProduct.product.id
      );
      if (productI > -1) {
        allProducts.data.product[productI] = updateProduct.product;
      }
      let cartItems = state.cart;
      const i = cartItems.findIndex(
        (el) => el.product.id === updateProduct.product.id
      );
      if (i > -1) {
        cartItems[i] = updateProduct;
      }
      return {
        ...state,
        products: allProducts,
        cart: cartItems,
      };
    case "REMOVE_CART_PRODUCT":
      const deleteProduct = action.payload;
      let allProduct = state.products;
      const productIndex = allProduct.data.product.findIndex(
        (el) => el.id === deleteProduct.product.id
      );
      if (productIndex > -1) {
        allProduct.data.product[productIndex] = deleteProduct.product;
      }
      let cartItem = state.cart;
      const index = cartItem.findIndex(
        (el) => el.product.id === deleteProduct.product.id
      );
      if (index > -1) {
        cartItem.splice(index, 1);
      }
      return {
        ...state,
        products: allProduct,
        cart: cartItem,
      };

    case "SET_CART_CHECKOUT":
      const cartList = state.cart;
      localStorage.setItem("Cart Data", JSON.stringify(cartList));
      return { ...state, cart: cartList };

    case "SET_SHIIPNG_CHECKOUT":
      const shippingProduct = action.payload;
      let Product = state.products;
      window.localStorage.removeItem("Cart Data");

      let cartItemEmptyt = [];
      return {
        ...state,
        products: Product,
        cart: cartItemEmptyt,
      };

    default:
      return state;
  }
};

export default reducer;
