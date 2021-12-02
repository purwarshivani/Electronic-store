import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { useSelector, useDispatch } from "react-redux";

import { addToCarts } from "./pages/action";
import useHook from "./useHook";
import CartDailog from "./CartDailog";
const NavWrapper = styled.nav`
  background: var(--mainBlue);

  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

export default function Navbar() {
  const dispatch = useDispatch();
  const { ref } = useHook(false);
  const { visible } = useSelector((state) => state.ProdcutReducer);
  return (
    <NavWrapper
      className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <Link to="/">
        <img src={logo} alt="store" className="navbar-brand" />
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5">
          <Link to="/" className="nav-link">
            products
          </Link>
        </li>
      </ul>
      <div className="navbar__cart">
        <ButtonContainer ref={ref}>
          <span className="mr-2">
            <i className="fas fa-cart-plus" />
          </span>
          My Cart
        </ButtonContainer>
        <div className={visible ? "cart cart__show" : "cart"}>
          <CartDailog />
        </div>
      </div>
    </NavWrapper>
  );
}
