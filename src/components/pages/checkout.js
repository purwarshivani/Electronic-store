import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
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

export default function checkout() {
  return (
    <ProductWrapper className="col-12 mx-auto col-md-12 col-lg-3 my-3 application-form label">
      <div className="container-fluid bg-dark">
        <div class="card bg-dark text-black">
          <div class="card-img-overlay">
            <div class="card text-black bg-light mb-3">
              <div class="card-header">Shipping Card</div>
              <div class="card-body">
                <Formik
                  initialValues={{
                    name: "",
                    billing: "",
                    delivery: "",
                    phoneNumber: "",
                  }}
                  validationSchema={Schema}
                  onSubmit={(values) => {
                    // same shape as initial values
                    console.log(values);
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

                      <button type="submit">Submit</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div`
  .application-form label {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 80%;
    padding-bottom: 1.5rem;
  }
  .application-form input,
  select {
    margin-left: 1rem;
  }
`;
