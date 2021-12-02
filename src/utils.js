import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { get, pickBy } from "lodash";

const getArr = (obj, ltr) => get(obj, ltr) || [];

const getCartItem = () => {
  const storedCart = localStorage.getItem("Cart Data");
  if (!storedCart) return null;

  return JSON.parse(storedCart);
};

const cleanObject = (object) =>
  pickBy(
    object,
    (value, key) => !(value === undefined || value === "" || value === null)
  );

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

// This component can be extracted to a separate file later in the development process

class ProtectedComponents extends Component {
  render() {
    // If the user is not already logged in redirect him to the /login
    // For now I'm using getAccessToken() to check if the user is authenticated or not.
    return this.props.children;
  }
}

export { getArr, PrivateRoute, ProtectedComponents, cleanObject, getCartItem };
