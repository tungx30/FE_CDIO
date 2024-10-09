import "../Dashboard/top.Dashboard.css";
import { useEffect, useState } from "react";
import * as service from "../../Services/dashboard.Service";

export function TopDashboard() {
  const [Product, setProduct] = useState([{}]);
  const [Personal, setPersonal] = useState([{}]);
  const [Discount, setDiscount] = useState([{}]);
  useEffect(() => {
    getPoint();
  }, []);
  const getPoint = async () => {
    const pointProduct = await service.PointProduct();
    const PointPersonal = await service.PointPersonal();
    const PointDiscount = await service.PointDiscount();
    console.log("thu", PointDiscount);
    setPersonal(PointPersonal.data);
    setProduct(pointProduct.data);
    setDiscount(PointDiscount.data);
  };
  return (
    <div className="container">
      <h3 style={{ paddingBottom: "10px" }}>Top</h3>
      <ul>
        <li className="link-text">
          Customers buy the most : {Personal.lastName} {Personal.firstName}
        </li>
        <li className="link-text">
          Best - selling product : {Product.productName}
        </li>
        <li className="link-text">
          Discount codes have the highest value : {Discount.discount_name}
        </li>
      </ul>
    </div>
  );
}
