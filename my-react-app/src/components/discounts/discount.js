import React, { useEffect, useState } from "react";
import { getAllDiscounts } from "../../Services/discountService.js";
import * as service from "../../Services/discountService.js";
import { CreateDiscount } from "./createDiscount.js";
import { DetailDiscount } from "./discountDetail.js";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export function Discounts() {
  const [content, setContent] = useState(
    <DiscountList showDiscountForm={showDiscountForm} showDetail={showDetail} />
  );
  const [showDetailPage, setShowDetailPage] = useState(false);

  function showDiscountList() {
    setShowDetailPage(false);
    setContent(
      <DiscountList
        showDiscountForm={showDiscountForm}
        showDetail={showDetail}
      />
    );
  }

  function showDiscountForm() {
    setShowDetailPage(false);
    setContent(<CreateDiscount showDiscountList={showDiscountList} />);
  }

  function showDetail(id) {
    setShowDetailPage(true);
    setContent(<DetailDiscount id={id} showDiscountList={showDiscountList} />);
  }

  return (
    <div className="container bg-white ">
      {showDetailPage ? (
        <DetailDiscount showDiscountList={showDiscountList} />
      ) : (
        content
      )}
    </div>
  );
}

function DiscountList(props) {
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;

  useEffect(() => {
    fetchDiscounts();
  }, []);
  const fetchDiscounts = async () => {
    try {
      const response = await getAllDiscounts();
      setDiscounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.deleteByIdDiscount(id);
      await fetchDiscounts();
      const remainingRecords = discounts.length - 1;
      if (remainingRecords % 5 == 0) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/sidebar/editDetail/${id}`;
  };

  const handleDetail = (id) => {
    window.location.href = `/sidebar/discountDetail/${id}`;
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

  const displayedDiscounts = discounts
    .filter((discount) => {
      if (!searchTerm.trim()) return true;
      return discount.discount_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .slice(firstIndex, lastIndex);

  const numberOfPages = Math.ceil(discounts.length / recordPerPage);
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  return (
    <>
      <h2 className="mb-5 text-center">List of Discounts</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Form>
          <InputGroup className="mb-1 styled-table" >
            <Form.Control
              onChange={handleSearch}
              placeholder="Search Discount..."
            />
          </InputGroup>
        </Form>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={() => props.showDiscountForm()}
          style={{ height: "35px", fontSize: "15px" }}
        >
          Create Discount
        </button>
      </div>
      <div className="my-5 ">
        <div className="row">
          <div className="col">
            <div style={{ height: "370px", overflow: "auto" }}>
              <table className="table table-layout-fixed">
                <thead>
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Discount Name</th>
                    <th style={{ whiteSpace: "nowrap" }}>
                      Discount Description
                    </th>
                    <th style={{ whiteSpace: "nowrap" }}>Discount Code</th>
                    <th style={{ whiteSpace: "nowrap" }}>Discount Type</th>
                    <th style={{ whiteSpace: "nowrap" }}>Discount Value</th>
                    <th style={{ whiteSpace: "nowrap" }}>Date Create</th>
                    <th style={{ whiteSpace: "nowrap" }}>Date End</th>
                    <th style={{ whiteSpace: "nowrap"}}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody style={{ verticalAlign: "middle" }}>
                  {displayedDiscounts.map((discount) => (
                    <tr key={discount._id}>
                      <td>{discount.discount_name}</td>
                      <td>{discount.discount_description}</td>
                      <td>{discount._id}</td>
                      <td>{discount.discount_type}</td>
                      <td>{discount.discount_value}</td>
                      <td>{formatDate(discount.discount_created)}</td>
                      <td>{formatDate(discount.discount_ended)}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <button
                          onClick={() => handleEdit(discount._id)}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDetail(discount._id)}
                          className="btn btn-primary btn-sm me-2"
                        >
                          View 
                        </button>
                        <button
                          onClick={() => handleDelete(discount._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete 
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
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
    </>
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
