import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import reducers from "./reducers";
import middleware from "./middleware";
import Routes from "./routes";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

reportWebVitals();

const store = createStore(reducers, middleware);
toast.configure({
  // style: {
  //   marginLeft:"0"
  // },
  autoClose: 5000,
  newestOnTop: true,
  hideProgressBar: true,
  closeButton: false,
  bodyClassName: "toastBody",
  position: "top-right",
});
const provider = (
  <Provider store={store}>
    <Routes />
  </Provider>
);
ReactDOM.render(provider, document.getElementById("root"));

serviceWorkerRegistration.register();
