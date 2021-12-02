import React from "react";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { getCartItem } from "../../utils";

import { shipping } from "./action";
import { Alert } from "bootstrap";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Full Name is Required"),
  billing: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Billing Address is Required"),
  delivery: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Delivery Addres is required"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export default function Checkout() {
  const dispatch = useDispatch();
  let history = useHistory();
  const data = getCartItem();
  let t = 0;

  const SubmitShiiping = (values) => {
    dispatch(shipping());
    alert(`Thankyou ${values.name}`);
  };
  return (
    <div className="container" style={{ marginTop: "2%" }}>
      <div className="row">
        <div className="col-sm-8 bg-white">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((pr, i) => {
                const subtotal = pr.product.price * pr.quantity;
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <img
                        src={pr.product.image}
                        style={{ height: "72px" }}
                        alt=""
                        className="cart__image"
                      />
                    </td>
                    <td>{pr.product.name}</td>
                    <td>{pr.quantity}</td>
                    <td>
                      {pr.product.price} {subtotal}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th scope="row">3</th>
                <td colspan="2">TOTAL AMOUNT</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-4 bg-warning">
          <p>Shipping Form </p>
          <Formik
            initialValues={{
              name: "",
              billing: "",
              delivery: "",
              phoneNumber: "",
            }}
            validationSchema={Schema}
            onSubmit={(values) => {
              SubmitShiiping(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <label>FullName</label>
                <Field name="name" />
                {errors.name && touched.name ? (
                  <div style={{ color: "red" }}>{errors.name}</div>
                ) : null}
                <br />
                <label>Billing Address</label>
                <Field name="billing" />
                {errors.billing && touched.billing ? (
                  <div style={{ color: "red" }}>{errors.billing}</div>
                ) : null}
                <br />
                <label>Delivery Address</label>
                <Field name="delivery" type="delivery" />
                {errors.delivery && touched.delivery ? (
                  <div style={{ color: "red" }}>{errors.delivery}</div>
                ) : null}

                <br />
                <label>Current Date</label>
                <Field
                  name="dat"
                  value={new Date().toLocaleString() + ""}
                  type="dat"
                />
                <label>phoneNumber</label>
                <Field name="phoneNumber" type="phoneNumber" />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                ) : null}

                <button type="submit" onClick={() => history.goBack()}>
                  Confirm
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
