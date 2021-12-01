import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/pages/MainPage";
import { createBrowserHistory } from "history";
import Navbar from "./components/Navbar";

import Checkout from "./components/pages/checkout";

const history = createBrowserHistory();

const Routes = ({ dispatch }) => {
  useEffect(() => {}, [dispatch]);

  return (
    <BrowserRouter history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={(props) => <MainPage />} />
        <Route exact path="/checkout" component={(props) => <Checkout />} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(() => ({}))(Routes);
