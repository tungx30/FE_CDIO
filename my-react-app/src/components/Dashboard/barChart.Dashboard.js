import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../Dashboard/barChart.Dashboard.css";
import * as Service from "../../Services/dashboard.Service";

export default function BasicBars() {
  const [products , setProduct] = useState([]);
  const [persons , setPerson] = useState([]);
  const [discounts , setDiscount] = useState([]);

  useEffect(()=>{
    getCount();
  },[]);
  const getCount = async ()=>{
    let CountProduct = await Service.CountProduct();
    setProduct(CountProduct.data);
    let countPersonal = await Service.CountPersonal();
    setPerson(countPersonal.data);
    let CountDiscount = await Service.CountDisocunt();
    console.log(CountDiscount);
    setDiscount(CountDiscount.data);

  }
  return (
    <div className="container--main">
      <BarChart
        xAxis={[{ scaleType: "band", data: [" Product", " Personal", " Discount"] }]}
        series={[{ data: [products, persons, discounts] }]}
        width={1000}
        height={500}
      />
    </div>
  );
}
