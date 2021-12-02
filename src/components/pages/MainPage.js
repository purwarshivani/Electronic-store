import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct, addToCarts, setCartVisible } from "./action";
import Title from "../Title";
// import { ProductConsumer } from "../../context";
import Product from "./Product";
// import Cart from "../Cart/Cart";

function Motor() {
  const [detailProduct, setDetailProduct] = useState({});
  const [prod, setProd] = useState([]);

  const [filterdata, setFilter] = useState([]);
  // const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { products, fetchState, cart } = useSelector(
    (state) => state.ProdcutReducer
  );
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const getItem = (id) => {
    const product = products.data.product.find((item) => item.id === id);
    return product;
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetailProduct(() => {
      return { detailProduct: product };
    });
  };

  const addToCart = (product) => {
    dispatch(addToCarts(product));
    dispatch(setCartVisible());
  };

  console.log(cart, "show cart data");
  return (
    <>
      <div>
        <React.Fragment>
          <div className="py-5">
            <div className="container">
              <Title className="our" title="products" />

              {fetchState === 2 && (
                <div className="row">
                  {console.log(products, "show")}

                  {products.data.product.map((pro, i) => {
                    return (
                      <Product
                        key={pro.id}
                        product={pro}
                        addToCart={addToCart}
                        handleDetail={handleDetail}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      </div>
    </>
  );
}

export default Motor;
