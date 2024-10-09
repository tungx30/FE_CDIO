import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as service from "../../Services/productService";
import "./AddEdit.css";
import { imageDb } from "../../config/config";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  dataVal,
} from "firebase/storage";
const EditProduct = () => {
  const [img, setImg] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [dateTime, setDateTime] = useState([]);
  let { id } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getFindById();
  }, [id]);
  let imgValue = [];
  const getFindById = async () => {
    try {
      const response = await service.findByIdProduct(id);
      const DateTimee = await service.getProductTime(id);
      console.log(DateTimee.data);
      console.log(DateTimee);
      const temp = response.data;
      setProduct(temp);
      setDateTime(DateTimee.data);
      listAll(ref(imageDb, "files")).then((imgs) => {
        console.log(imgs);
        imgs.items.forEach((val) => {
          const fileName = val.name;
          getDownloadURL(val).then((url) => {
            console.log(val);
            if (fileName === temp.productName) {
              //console.log("cos vo", url);
              setImgURL((prevURLs) => [...prevURLs, url]);
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await service.updateProduct(id, values);
      const imgRef = ref(imageDb, `files/${values.productName}`);
      console.log("check", img);
      if (img == "") {
        navigate("/sidebar/tableProduct");
      } else {
        await uploadBytes(imgRef, img);
      }
      console.log("check", img);
      if (img == "") {
        navigate("/sidebar/tableProduct");
      } else {
        await uploadBytes(imgRef, img);
      }
      navigate("/sidebar/tableProduct");
    } catch (error) {
      console.error(error);
    }
  };
  const formatDate = (dateStr) => {
    if (dateStr) {
      const [year, month, day] = dateStr.split("-");
      return `${day}-${month}-${year}`;
    }
    return "";
  };
  if (!product) {
    return null;
  }
  const initProduct = {
    productName: product.productName,
    status: product.status,
    productNumber: product.productNumber,
    category: product.category,
    price: product.price,
    describe: product.describe,
    imgURL: imgURL.url,
    expirationDate: dateTime.formattedExpirationDate,
    dateOfManufacture: dateTime.formattedDateOfManufacture,
    sold: product.sold,
  };
  return (
    <Formik initialValues={initProduct} onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <h2 className="text-center mb-1">Update Products</h2>
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
                onChange={(e) => setImg(e.target.files[0])}
              />
              <label htmlFor="dateOfManufacture">Date of manufacture</label>
              <Field
                className="form-input-product"
                id="dateOfManufacture"
                type="date"
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

export default EditProduct;
