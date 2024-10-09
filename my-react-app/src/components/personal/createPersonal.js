import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as service from "../../Services/personalServices";
import "./createPersonal.css";
export function CreatePersonal() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      await service.doPersonal(values);
      navigate("/sidebar/ListPersonal");
      console.log(values);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Has exist");
      } else {
        console.error(11111, error);
      }
    }
  };

  return (
    <div className="container-cus">
      <h1 className="header-container" style={{ textAlign: "center" }}>
        Add Personal
      </h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          point: "",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="custom-form">
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label
                className="infor"
                htmlFor="firstName"
                style={{ marginBottom: "5px" }}
              >
                First Name :
              </label>
              <Field
                type="textPer"
                id="firstName"
                name="firstName"
                required
                minlength="3"
                maxlength="10"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label
                className="infor"
                htmlFor="lastName"
                style={{ marginBottom: "5px" }}
              >
                Last Name :
              </label>
              <Field
                type="textPer"
                id="lastName"
                name="lastName"
                required
                minlength="3"
                maxlength="10"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label
                className="infor"
                htmlFor="email"
                style={{ marginBottom: "5px" }}
              >
                Email :
              </label>
              <Field
                type="textPer"
                id="email"
                name="email"
                required
                minlength="7"
                maxlength="15"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label
                className="infor"
                htmlFor="phoneNumber"
                style={{ marginBottom: "5px" }}
              >
                Phone Number :
              </label>
              <Field
                type="textPer"
                id="phoneNumber"
                name="phoneNumber"
                required
                minlength="3"
                maxlength="10"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label
                className="infor"
                htmlFor="address"
                style={{ marginBottom: "5px" }}
              >
                Address :
              </label>
              <Field
                type="textPer"
                id="address"
                name="address"
                required
                minlength="3"
                maxlength="50"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label
                className="infor"
                htmlFor="point"
                style={{ marginBottom: "5px" }}
              >
                Point :
              </label>
              <Field
                type="numberPer"
                id="point"
                name="point"
                required
                min="1"
                max="1000"
              />
            </div>
          </div>
          <div className="form-row" style={{ marginLeft: "220px" }}>
            <button type="submitPer">Add New</button>
            <Link style={{ marginRight: "38px" }} to="/sidebar/ListPersonal">
              <button style={{backgroundColor: "red"}} type="submitPer">Back to List</button>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
