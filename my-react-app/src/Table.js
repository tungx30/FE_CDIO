import { getAllDiscounts } from "./Services/discountService";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const discounts = await getAllDiscounts();
        setData(discounts.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Discount ID</th>
            <th>Discount Name</th>
            <th>Discount Description</th>
            <th>Discount Type</th>
            <th>Discount Value</th>
            <th>Discount Code</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((discount, index) => (
            <tr key={index}>
              <td>{discount.discount_id}</td>
              <td>{discount.discount_name}</td>
              <td>{discount.discount_description}</td>
              <td>{discount.discount_type}</td>
              <td>{discount.discount_value}</td>
              <td>{discount.discount_code}</td>
              <td>{formatDate(discount.createdAt)}</td>
              <td>{formatDate(discount.updatedAt)}</td>
              <td>
                <button>Add</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
