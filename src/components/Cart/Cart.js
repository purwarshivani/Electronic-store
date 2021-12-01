import React, { useEffect } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { ProductConsumer } from "../../context";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct, getCart } from "../pages/action";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.ProdcutReducer);
  useEffect(() => {
    dispatch(getCart());
  }, [getCart, dispatch]);
  return (
    <section>
      {console.log(cart, "show carts data  hererrerer")}
      {/* <ProductConsumer>
        {(value) => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <React.Fragment>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} history={this.props.history} />
              </React.Fragment>
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </ProductConsumer> */}
    </section>
  );
}
