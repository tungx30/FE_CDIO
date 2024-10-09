import React, { useEffect, useState } from "react";
import * as service from "../../Services/productService";
import "./tableProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  dataVal,
} from "firebase/storage";
import { imageDb } from "../../config/config";
export function TableProduct() {
  const [product, setProduct] = useState([]);
  const [imgURL, setImgURL] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 4;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  useEffect(() => {
    getAll();
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
  }, []);
  const getAll = async () => {
    try {
      let mounted = true;
      const items = await service.getAllProduct();
      await setProduct(items.data.product);
      return () => {
        mounted = false;
      };
    } catch (error) {
      console.error(error);
    }
  };
  const onDelete = async (id) => {
    await service.deleteProduct(id);
    await getAll();
  };
  const handleDelete = (id) => {
    onDelete(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (id) => {
    window.location.href = `/sidebar/updateProduct/${id}`;
  };
  const handleDetail = (id) => {
    window.location.href = `/sidebar/detailProduct/${id}`;
  };
  const handleCreate = () => {
    window.location.href = `/sidebar/createProduct`;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleSearch = (event) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const displayedProduct = product
    .filter((product) => {
      if (!searchTerm.trim()) return true;
      return product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .slice(firstIndex, lastIndex);

  const numberOfPages = Math.ceil(product.length / recordPerPage);
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);
  return (
    <div style={{ marginTop: "10px", marginInlineEnd: "70px" }}>
      <br />
      <h2 className="text-center mb-3">Table Products</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Form>
          <InputGroup className="styled-table mb-1">
            <Form.Control
              onChange={handleSearch}
              placeholder="Search Products..."
            />
          </InputGroup>
        </Form>
        <button
          className="btn-create"
          onClick={() => handleCreate()}
          style={{ height: "35px", fontSize: "15px" }}
        >
          Create Product
        </button>
      </div>

      <table
        className="styled-table "
        style={{ height: "400px", width: "1090px" }}
      >
        <thead>
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>Product Name</th>
            <th style={{ whiteSpace: "nowrap" }}>Status</th>
            <th style={{ whiteSpace: "nowrap" }}>Product Number</th>
            <th style={{ whiteSpace: "nowrap" }}>Category</th>
            <th style={{ whiteSpace: "nowrap" }}>Price</th>
            <th style={{ whiteSpace: "nowrap" }}>Image</th>
            <th style={{ whiteSpace: "nowrap" }}>Sold</th>
            <th style={{ whiteSpace: "nowrap" }}>Date Of Manufacture</th>
            <th style={{ whiteSpace: "nowrap" }}>Expiration Date</th>
            <th style={{ whiteSpace: "nowrap" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedProduct.map((product, index) => (
            <tr key={product._id} className="content--table">
              <td
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  fontweight: "bold",
                }}
              >
                {product.productName}
              </td>
              <td style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                {product.status ? "Còn Hàng" : "Hết Hàng"}
              </td>
              <td style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                {product.productNumber}
              </td>
              <td style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                {product.nameCategory}
              </td>
              <td style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                {product.price}
              </td>
              <td style={{ textAlign: "center", fontSize: "15px" }}>
                {imgURL.map((imgData, index) => {
                  if (imgData.fileName === product.productName) {
                    return (
                      <img
                        key={index}
                        src={imgData.url}
                        height="65px"
                        width="65px"
                        alt={product.productName}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </td>
              <td style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                {product.sold}
              </td>
              <td style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                {formatDate(product.expirationDate)}
              </td>
              <td style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                {formatDate(product.dateOfManufacture)}
              </td>
              <td style={{ display: "flex", flexDirection: "row" }}>
                <div className="action">
                  <button
                    style={{ whiteSpace: "nowrap", fontSize: "12px" }}
                    className="btn-edit mt-3"
                    onClick={() => handleEdit(product._id)}
                  >
                    Update
                  </button>
                  <button
                    style={{ whiteSpace: "nowrap", fontSize: "12px" }}
                    className="btn-delete mt-3"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ whiteSpace: "nowrap", fontSize: "12px" }}
                    className="btn-view mt-3"
                    onClick={() => handleDetail(product._id)}
                  >
                    Detail
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row ">
        <div className="col">
          <nav className="justify-content-center d-flex">
            <ul className="pagination">
              <li className="page-item me-2">
                <button className="page-link" onClick={prePage}>
                  Prev
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item me-2 ${
                    number === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button className="page-link" onClick={nextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  }
}
