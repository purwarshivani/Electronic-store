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

  const [filterdata, setFilter] = useState(null);
  const [searching, setSearching] = useState({});
  const dispatch = useDispatch();
  const { products, fetchState } = useSelector((state) => state.ProdcutReducer);
  useEffect(() => {
    dispatch(getAllProduct());
  }, [getAllProduct]);

  useEffect(() => {
    if (fetchState === 2) {
      products.data.product = products.data.product.map((data) => {
        let cy = data.price.split("$")[1] * 120.46;
        let currency = cy.toFixed(0);
        data.price = currency;
        return data;
      });
      const result = products.data.product;
      console.log(result, "arey ");
      setFilter(result);
    } else {
    }
  }, [products]);

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

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let name = event.target.name;
    let sear = { ...searching };
    sear[name] = value;

    let result = products.data.product;
    if (sear.name) {
      result = result.filter((data) => {
        return data.name.toLowerCase().includes(sear.name);
      });
    }
    if (sear.category) {
      result = result.filter((data) => {
        return data.category.includes(sear.category);
      });
    }
    if (sear.Maxprice) {
      result = result.filter((data) => {
        return data.price <= sear.Maxprice;
      });
    }
    if (sear.Minprice) {
      result = result.filter((data) => {
        return data.price >= sear.Minprice;
      });
    }
    setSearching(sear);
    setFilter(result);
  };

  console.log(filterdata, "show filterdata data");
  return (
    <>
      <div>
        <React.Fragment>
          <div className="py-5">
            <div className="container">
              <Title className="our" title="products" />

              <div className="row">
                <div className="col-1">
                  <label className="font-italic">Search....</label>
                </div>

                <div className="col-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder={"Name"}
                    name={"name"}
                    onChange={(event) => handleSearch(event)}
                  />
                </div>

                <div className="col-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="category"
                    onChange={(event) => handleSearch(event)}
                  >
                    <option value="">Category</option>
                    <option value="laptop">Laptop</option>
                    <option value="mobile">Mobile</option>
                    <option value="highest">Highest</option>
                  </select>
                </div>

                <div className="col-2">
                  <input
                    className="form-control"
                    type="number"
                    placeholder={"Min Price"}
                    name={"Minprice"}
                    onChange={(event) => handleSearch(event)}
                  />
                </div>

                <div className="col-2">
                  <input
                    className="form-control"
                    type="number"
                    placeholder={"Max Price"}
                    name={"Maxprice"}
                    onChange={(event) => handleSearch(event)}
                  />
                </div>
              </div>
              {filterdata && (
                <div className="row">
                  {filterdata.length > 0 &&
                    filterdata.map((pro, i) => {
                      console.log(pro, "show insid");
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
