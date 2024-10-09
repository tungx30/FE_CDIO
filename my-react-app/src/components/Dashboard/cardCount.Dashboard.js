import { useEffect, useState } from "react";
import "../Dashboard/cardCount.Dashboard.css";
import * as Service from "../../Services/dashboard.Service";
import { PieChart } from '@mui/x-charts/PieChart';

export function CardCount() {
  const [products, setProduct] = useState([]);
  const [persons, setPerson] = useState([]);
  const [discounts, setDiscount] = useState([]);
  useEffect(() => {
    getCount();
  }, []);
  const getCount = async () => {
    let CountProduct = await Service.CountProduct();
    setProduct(CountProduct.data);
    let countPersonal = await Service.CountPersonal();
    setPerson(countPersonal.data);
    let CountDiscount = await Service.CountDisocunt();
    setDiscount(CountDiscount.data);
  };
  return (
    <div className="card--container">
      <h3 className="main--tile" style={{ paddingBottom: "15px" }}>
        The Amount Of Data
      </h3>
      <div className="card--wrapper">
        <div className="payment--card">
          <span className="title--head">Product</span>
          <h2 className="tile--value">{products}</h2>
          <span className="title--text">By One Product</span>
        </div>
        <div className="payment--card">
          <span className="title--head">Person</span>
          <h2 className="tile--value">{persons}</h2>
          <span className="title--text">By One Person</span>
        </div>
        <div className="payment--card">
          <span className="title--head">Discount</span>
          <h2 className="tile--value">{discounts}</h2>
          <span className="title--text">By One Discount</span>
        </div>
        <div className="payment--card">
          <span className="title--head">Total Pie Chart</span>
          <div style={{paddingLeft:"30px"}}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: products },
                    { id: 1, value: persons },
                    { id: 2, value: discounts },
                  ],
                },
              ]}
              width={165}
              height={70}
            />
          </div>
          <span className="title--text">By One Discount</span>
        </div>
      </div>
    </div>
  );
}
