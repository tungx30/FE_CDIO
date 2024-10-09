import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as service from "../../Services/personalServices";
import "./listPersonal.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
export function ListPersonal() {
  const [personal, setPersonal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await service.getAllPersonal();
      if (response.success === true) {
        setPersonal(response.data);
      } else {
        console.error("No personal data found");
      }
    } catch (error) {
      console.error("Error fetching personal data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.deletePersonal(id);
      await getAll();
      const remainingRecords = personal.length - 1;
      if (remainingRecords % 5 == 0) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleDetail = (id) => {
    window.location.href = `/sidebar/detailPersonal/${id}`;
  };
  const handleCreate = (id) => {
    window.location.href = `/sidebar/createPersonal`;
  };
  const handleUpdate = (id) => {
    window.location.href = `/sidebar/updatePersonal/${id}`;
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await service.deletePersonal(id);
  //     await getAll(); // Reload personal data after deletion
  //   } catch (error) {
  //     console.error("Error deleting personal data:", error);
  //   }
  // };
  const displayedPersonal = personal
    .filter((personal) => {
      if (!searchTerm.trim()) return true;
      return personal.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(personal.length / recordPerPage);
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);
  return (
    <div style={{ marginTop: "30px", alignItems: "center" }}>
      <h1 style={{ marginLeft: "490px", marginBottom: "20px" }}>
        List of Personal
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Form>
          <InputGroup>
            <Form.Control
              onChange={handleSearch}
              placeholder="Search Personal..."
            />
          </InputGroup>
        </Form>
        <button
          className="btnPersonal-create"
          onClick={handleCreate}
          style={{ height: "35px", fontSize: "15px" }}
        >
          Create Personal
        </button>
      </div>
      <div style={{ height: 450, overflow: "auto" }}>
        <table className="style-table">
          <thead>
            <tr>
              <th style={{ whiteSpace: "nowrap", minWidth: 50 }}>No.</th>
              <th
                style={{ whiteSpace: "nowrap", minWidth: 100, maxWidth: 100 }}
              >
                First Name
              </th>
              <th style={{ whiteSpace: "nowrap", minWidth: 100 }}>Last Name</th>
              <th
                style={{ whiteSpace: "nowrap", minWidth: 220, maxWidth: 220 }}
              >
                Email
              </th>
              <th
                style={{ whiteSpace: "nowrap", minWidth: 120, maxWidth: 120 }}
              >
                Phone Number
              </th>
              <th
                style={{ whiteSpace: "nowrap", minWidth: 230, maxWidth: 230 }}
              >
                Address
              </th>
              <th style={{ whiteSpace: "nowrap", minWidth: 70, maxWidth: 70 }}>
                Point
              </th>
              <th
                style={{ whiteSpace: "nowrap", minWidth: 380, maxWidth: 380 }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedPersonal.map((personal, index) => (
              <tr key={personal._id}>
                <th scope="row">
                  {(currentPage - 1) * recordPerPage + index + 1}
                </th>
                <td style={{ whiteSpace: "nowrap" }}>{personal.firstName}</td>
                <td style={{ whiteSpace: "nowrap" }}>{personal.lastName}</td>
                <td style={{ whiteSpace: "nowrap" }}>{personal.email}</td>
                <td style={{ whiteSpace: "nowrap" }}>{personal.phoneNumber}</td>
                <td style={{ whiteSpace: "nowrap" }}>{personal.address}</td>
                <td style={{ whiteSpace: "nowrap" }}>{personal.point}</td>
                <td style={{ display: "center", flexDirection: "row" }}>
                  <div className="btn-wrapper">
                    <button
                      className="btnPersonal-edit"
                      onClick={() => handleUpdate(personal._id)}
                    >
                      Edit Personal
                    </button>
                    <button
                      className="btnPersonal-delete"
                      onClick={() => handleDelete(personal._id)}
                    >
                      Delete Personal
                    </button>
                    <Link to={`/detailPersonal/${personal._id}`}>
                      <button
                        className="btnPersonal-view"
                        onClick={() => handleDetail(personal._id)}
                      >
                        View Personal
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div style={{ marginRight: "100px" }} className="col">
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
