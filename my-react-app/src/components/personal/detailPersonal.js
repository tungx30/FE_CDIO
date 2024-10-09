import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as service from "../../Services/personalServices";
import "./createPersonal.css";
import { color } from "@mui/system";
export function DetailPersonal() {
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
  const handleSubmit = async () => {
    try {
      navigate("/sidebar/ListPersonal");
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
    email: personal.email,
    phoneNumber: personal.phoneNumber,
    address: personal.address,
    point: personal.point,
  };
  return (
    <div className="container-cus">
      <h1 className="header-container" style={{ textAlign: "center" }}>
        Detail Personal
      </h1>
      <Formik initialValues={initPersonal} onSubmit={handleSubmit}>
        <Form className="custom-form">
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label className="infor" htmlFor="firstName" style={{ marginBottom: "5px" }}>
                First Name :
              </label>
              <Field
                type="textPer"
                id="firstName"
                name="firstName"
                readOnly={true}
              />
            </div>
            </div>
            <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label className="infor" htmlFor="lastName" style={{ marginBottom: "5px" }}>
                Last Name :
              </label>
              <Field
                type="textPer"
                id="lastName"
                name="lastName"
                readOnly={true}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label className="infor" htmlFor="email" style={{ marginBottom: "5px" }}>
                Email :
              </label>
              <Field type="textPer" id="email" name="email" readOnly={true} />
            </div>
            </div>
            <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label className="infor" htmlFor="phoneNumber" style={{ marginBottom: "5px" }}>
                Phone Number :
              </label>
              <Field
                type="textPer"
                id="phoneNumber"
                name="phoneNumber"
                readOnly={true}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label className="infor" htmlFor="address" style={{ marginBottom: "5px" }}>
                Address :
              </label>
              <Field
                type="textPer"
                id="address"
                name="address"
                readOnly={true}
              />
            </div>
            </div>
            <div className="form-row">
            <div className="space" style={{ marginBottom: "15px" }}>
              <label className="infor" htmlFor="point" style={{ marginBottom: "5px" }}>
                Point :
              </label>
              <Field type="numberPer" id="point" name="point" readOnly={true} />
            </div>
          </div>
          <button style={{marginRight:"34px",backgroundColor:"red"}} type="submitPer">Back to List</button>
        </Form>
      </Formik>
    </div>
  );
}
