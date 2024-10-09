import axios from "axios";

export const CountPersonal = async () => {
  let count = await axios.get("http://localhost:4000/api/personal/");
  return count.data;
};

export const CountProduct = async () => {
  let count = await axios.get("http://localhost:4000/api/product/getCount");
  return count.data;
};

export const CountDisocunt = async () => {
  let count = await axios.get("http://localhost:4000/api/discount/count");
  return count.data;
};

export const PointPersonal = async () => {
  let personal = await axios.get("http://localhost:4000/api/personal/getPoint");
  return personal.data;
};

export const PointProduct = async () => {
  let product = await axios.get("http://localhost:4000/api/product/maxPoint");
  return product.data;
};

export const PointDiscount = async () => {
  let discount = await axios.get("http://localhost:4000/api/discount/maxValue");
  console.log("THuss", discount.data);
  return discount.data;
};
