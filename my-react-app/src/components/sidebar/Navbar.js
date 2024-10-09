import { Main } from "../Dashboard/main.Dashboard";
import "./app.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Row, Col } from "react-bootstrap"; 

 const Navbar = ({ children }) => {
  return (
    <>
      <div className="sidenav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/sidebar/listPersonal">Personal</a>
          </li>

          <li>
            <a href="/sidebar/tableProduct">Products</a>
          </li>
          <li>
            <a href="/sidebar/discount">Discounts</a>
          </li>
        </ul>
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "95vh" }}
      >
        <Row className="justify-content-center">
          <Col sm={3}></Col>
          <Col sm={4}>
            <div className="justify-content-center d-flex ">
              <div>{children}</div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Navbar;
