import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as service from "../../Services/productService";
import { toast } from "react-toastify";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  dataVal,
} from "firebase/storage";
import { imageDb } from "../../config/config";
const ViewProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState();
  const [imgURL, setImgURL] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getFindById();
  }, [id]);

  const getFindById = async () => {
    try {
      const response = await service.findByIdProduct(id);
      const temp = response.data;
      setProduct(temp);
      listAll(ref(imageDb, "files")).then((imgs) => {
        console.log(imgs);
        imgs.items.forEach((val) => {
          const fileName = val.name;
          getDownloadURL(val).then((url) => {
            console.log(fileName, url);
            setImgURL((data) => [...data, { fileName, url }]);
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    navigate("/sidebar/tableProduct");
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
    imgURL: product.imgURL,
    describe: product.describe,
    expirationDate: formatDate(product.expirationDate),
    dateOfManufacture: formatDate(product.dateOfManufacture),
    sold: product.sold
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
        <h2 className="text-center mb-1">Detail Products</h2>
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
                readOnly={true}
              />

              <label htmlFor="status">Product status:</label>
              <Field
                className="form-input-product"
                component="select"
                id="status"
                name="status"
                required="vui lòng chọn loại sản phẩm"
                onChange={(e) => e.target.blur()} // Ngăn chặn sự kiện onchange khi có thay đổi
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
                readOnly={true}
              />

              <label htmlFor="category">Category:</label>
              <Field
                className="form-input-product"
                component="select"
                id="category"
                name="category"
                required="vui lòng chọn loại sản phẩm"
                onChange={(e) => e.target.blur()}
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
                readOnly={true}
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
                readOnly={true}
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
                readOnly={true}
              />
              <label htmlFor="dateOfManufacture">Date of manufacture</label>
              <Field
                className="form-input-product"
                id="dateOfManufacture"
                name="dateOfManufacture"
                placeholder="Your product date of manufacture"
                readOnly={true}
              />
              <label htmlFor="expirationDate">Product expiration date</label>
              <Field
                className="form-input-product"
                id="expirationDate"
                name="expirationDate"
                placeholder="Your product expiration date"
                readOnly={true}
              />
             <label htmlFor="file"> Product img</label>
              {imgURL.map((imgData, index) => {
                if (imgData.fileName === product.productName) {
                  return (
                    <img
                    style={{marginLeft:"15px"}}
                      key={index}
                      src={imgData.url}
                      height="120px"
                      width="330px"
                      alt={product.productName}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <input type="submit" value="back" className="form-btn-product" />
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default ViewProduct;
