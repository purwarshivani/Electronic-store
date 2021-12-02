import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import moment from "moment";
import { useSelector } from "react-redux";
export default function Product({ product, addToCart }) {
  const { id, name, image, price, inCart, stock, category, createDate } =
    product;

  const { cart } = useSelector((state) => state.ProdcutReducer);
  const checkCart = () => {
    const isThere = cart.some((el) => el.product.id === id);
    console.log("isthere", isThere);
    return isThere;
  };
  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div
          className="img-container p-5"
          // onClick={() => value.handleDetail(id)}
        >
          <Link to="/details">
            <img
              style={{
                width: "100%",
                height: "120px",
                objectFit: "contain",
              }}
              src={`https://electronic-ecommerce.herokuapp.com/${image}`}
              alt="product"
              className="card-img-top"
            />
          </Link>
          <h6
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              textDecorationLine: "underline",
            }}
          >
            {category[1]}
          </h6>
          <button
            className="cart-btn"
            // disabled={checkCart()}
            onClick={() => {
              if (!checkCart()) {
                addToCart(product);
              } else {
                alert("product is already in cart");
              }
            }}
          >
            {stock === 0 ? (
              <i className="fas fa-cart-plus" disabled>
                Out of stock
              </i>
            ) : (
              <i className="fas fa-cart-plus" />
            )}
          </button>
        </div>

        {/* card footer */}
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{name}</p>
          <p className="text-blue font-italic mb-0">
            <span className="mr-8"></span>
            {"Rs."}
            {price.toString().split(".")[0].length > 3
              ? price
                  .toString()
                  .substring(0, price.toString().split(".")[0].length - 3)
                  .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
                "," +
                price
                  .toString()
                  .substring(price.toString().split(".")[0].length - 3)
              : price.toString()}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">
            stock:
            {stock === 0 ? (
              <p style={{ fontSize: "12px", color: "red" }}>Out of Stock</p>
            ) : (
              stock
            )}
          </p>
          <p className="text-blue font-italic mb-0">
            <span className="mr-8"></span>
            {moment(createDate).format("DD-MM-YYYY")}
          </p>
        </div>
      </div>
    </ProductWrapper>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 0.5s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 0.5s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
    transition: all 0.5s linear;
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
