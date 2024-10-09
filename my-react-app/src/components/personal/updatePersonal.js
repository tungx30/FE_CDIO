import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as service from "../../Services/personalServices";
import * as Yup from "yup";
import "./createPersonal.css";
export function UpdatePersonal() {
  let { id } = useParams();
  const [personal, setPersonal] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getFindById();
  }, [id]);
  const getFindById = async () => {
    try {
      const response = await service.findByIdPersonal(id);
      const temp = response.data;
      setPersonal(temp);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await service.updatePersonal(id, values);
      navigate("/sidebar/listPersonal");
    } catch (error) {
      console.error(error);
    }
  };

  if (!personal) {
    return null;
  }

  const initPersonal = {
    firstName: personal.firstName,
    lastName: personal.lastName,
    address: personal.address,
    email: personal.email,
    phoneNumber: personal.phoneNumber,
    point: personal.point,
  };
  return (
    <div className="container-cus">
      <h1 className="header-container" style={{ textAlign: "center" }}>
        Update Personal
      </h1>
      <Formik
        initialValues={initPersonal}
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
                maxlength="100"
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
                maxlength="100"
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
                minlength="3"
                maxlength="100"
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
                maxlength="100"
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
                maxlength="100"
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
                max="10000"
              />
            </div>
          </div>
          <div className="form-row" style={{ marginLeft: "220px" }}>
            <button type="submitPer">Update</button>
            <Link style={{ marginRight: "38px" }} to="/sidebar/ListPersonal">
              <button style={{backgroundColor: "red"}} type="submitPer">Back to List</button>
            </Link>
          </div>
          
        </Form>
      </Formik>
    </div>
  );
}
