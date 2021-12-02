import React from "react";
import logo from "../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, removeCartProduct, seCartData } from "./pages/action";
import reactPaypalExpressCheckout from "react-paypal-express-checkout";
import { Link } from "react-router-dom";
const CartDailog = () => {
  const { cart } = useSelector((state) => state.ProdcutReducer);

  const dispatch = useDispatch();
  const addCartItem = (data) => {
    if (data.product.stock > 0) {
      dispatch(
        updateCart({
          product: {
            ...data.product,
            stock: data.product.stock - 1,
          },
          quantity: data.quantity + 1,
        })
      );
    } else {
      alert("Product is out of stock");
    }
  };
  const subCartItem = (data) => {
    if (data.quantity > 1) {
      dispatch(
        updateCart({
          product: { ...data.product, stock: data.product.stock + 1 },
          quantity: data.quantity - 1,
        })
      );
    } else {
      alert("Product Quantity cannot be zero");
    }
  };
  const deleteHander = (data) => {
    dispatch(
      removeCartProduct({
        product: { ...data.product, stock: data.product.stock + data.quantity },
      })
    );
  };

  const checkout = () => {
    dispatch(seCartData());
  };
  let cy;
  let currency;
  return (
    <div className="container p-3">
      <h4>My Cart</h4>
      {cart.length > 0 &&
        cart.map((el) => {
          cy = el.product.price.split("$")[1] * 120.46;
          currency = cy.toFixed(0);
          return (
            <div className="row" key={el.product.id}>
              <div className="col-4">
                <img src={el.product.image} alt="" className="cart__image" />
              </div>
              <div className="col-5">
                <div className="row">
                  <h5>{el.product.name}</h5>

                  <h6>
                    RS.
                    {currency.toString().split(".")[0].length > 3
                      ? currency
                          .toString()
                          .substring(
                            0,
                            currency.toString().split(".")[0].length - 3
                          )
                          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
                        "," +
                        currency
                          .toString()
                          .substring(
                            currency.toString().split(".")[0].length - 3
                          )
                      : currency.toString()}
                  </h6>
                  <div className="row">
                    <div className="col-4">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => addCartItem(el)}
                      >
                        Add
                      </button>
                    </div>
                    <div className="col-4">
                      <h4 style={{ textAlign: "center" }}>{el.quantity}</h4>
                    </div>
                    <div className="col-4">
                      <button
                        type="button"
                        class="btn btn-warning"
                        onClick={() => subCartItem(el)}
                      >
                        Sub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="row">
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteHander(el)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      {cart.length === 0 ? (
        "Please Place some Orders"
      ) : (
        <Link to="/checkout">
          <div className="row">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => checkout()}
            >
              Checkout
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CartDailog;
