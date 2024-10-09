import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as service from "../../Services/productService";
import * as Yup from "yup";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { fontSize, height, padding } from "@mui/system";
import { imageDb } from "../../config/config";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  dataVal,
} from "firebase/storage";
const initialState = {
  productName: "",
  status: Boolean,
  productNumber: 0,
  category: "6628aa1b1223ea212541f3cb",
  price: 0,
  describe: "",
  expirationDate: "",
  dateOfManufacture: "",
};
const AddProduct = () => {
  const [img, setImg] = useState("");
  const [imgURL, setImgURL] = useState([]);
  //const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    //values.preventDefault();
    try {
      await service.doProduct(values);
      console.log("kjkkk", values.expirationDate);
      const imgRef = ref(imageDb, `files/${values.productName}`);
      await uploadBytes(imgRef, img);
      toast.success("Product added successfully");
      navigate("/sidebar/tableProduct");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Has exist");
      } else {
        console.error(error);
        toast.error("Product added not successfully");
      }
    }
  };
  const [getCategory, setCategory] = useState("");
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <Formik initialValues={initialState} onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <h2 className="text-center mb-1">Create Products</h2>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "15px",
            maxWidth: "740px", // Giả sử chiều rộng tối đa là 800px
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: "1" }}>
              <label htmlFor="productName">Product Name</label>
              <Field
                className="form-input-product"
                type="text"
                name="productName"
                required
                minLength="3"
                maxLength="100"
              />

              <label htmlFor="status">Product status:</label>
              <Field
                className="form-input-product"
                component="select"
                id="status"
                name="status"
                required="vui lòng chọn loại sản phẩm"
              >
                <option value={"true"}>Còn Hàng</option>
                <option value={"false"}>Hết Hàng</option>
              </Field>

              <label htmlFor="productNumber">Product number:</label>
              <Field
                className="form-input-product"
                type="number"
                id="productNumber"
                name="productNumber"
                required
                min="0"
                max="10000000"
              />

              <label htmlFor="category">Category:</label>
              <Field
                className="form-input-product"
                component="select"
                id="category"
                name="category"
                required="vui lòng chọn loại sản phẩm"
              >
                <option value={"6628aa1b1223ea212541f3cb"}>Rau</option>
                <option value={"6628aa3c1223ea212541f3cd"}>Củ</option>
                <option value={"6628aa591223ea212541f3cf"}>Quả</option>
              </Field>
              <label htmlFor="Sold">Sold product</label>
              <Field
                className="form-input-product"
                type="text"
                id="sold"
                name="sold"
                placeholder="Your product date of manufacture"
              />
            </div>
            <div style={{ flex: "1" }}>
              <label htmlFor="price">Product price:</label>
              <Field
                className="form-input-product"
                type="number"
                id="price"
                name="price"
                placeholder="Your product price"
                required
                min="0"
                max="10000000"
              />
              <label htmlFor="describe"> Product describe</label>
              <Field
                className="form-input-product"
                type="text"
                id="describe"
                name="describe"
                placeholder="Your product describe"
                required
                minLength="3"
                maxLength="500"
              />
              <label htmlFor="file" className="">
                {" "}
                Product img
              </label>
              <Field
                className="form-input-product"
                style={{ height: "46px", fontSize: "center" }}
                type="file"
                id="imgURL"
                name="imgURL"
                placeholder="Your product image"
                required="vui lòng chọn ảnh sản phẩm"
                onChange={(e) => setImg(e.target.files[0])}
              />
              <label htmlFor="dateOfManufacture">Date of manufacture</label>
              <Field
                className="form-input-product"
                type="date"
                id="dateOfManufacture"
                name="dateOfManufacture"
                placeholder="Your product date of manufacture"
              />
              <label htmlFor="expirationDate">Expiration date</label>
              <Field
                className="form-input-product"
                type="date"
                id="expirationDate"
                name="expirationDate"
                placeholder="Your product expiration date"
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <input type="submit" value="save" className="form-btn-product" />
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default AddProduct;
