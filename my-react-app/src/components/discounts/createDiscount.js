import React, { useEffect, useState } from "react";
import { getAllDiscounts } from "../../Services/discountService";
import * as service from "../../Services/discountService";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
export function CreateDiscount(props) {
  const handleSubmit = async (values) => {
    try {
      await service.doDiscounts(values);
      console.log(values);
      props.showDiscountList();
    } catch (error) {
      console.log(error);
    }
  };
  const validationSchema = Yup.object().shape({
    discount_name: Yup.string()
      .max(30, "Name must be at most 30 characters")
      .required("Name is required"),
    discount_description: Yup.string()
      .max(50)
      .required("Description is required"),
    discount_type: Yup.string()
      .oneOf(
        [
          "%",
          "phần trăm",
          "Phần trăm",
          "Phần Trăm",
          "giảm trực tiếp",
          "Giảm trực tiếp",
          "Giảm Trực tiếp",
          "Giảm Trực Tiếp",
        ],
        "Invalid discount type"
      )
      .required("Discount type is required"),
    discount_value: Yup.number()
      .min(1000, "Discount value must be at least 4 digits")
      .max(999999, "Discount value must be at most 6 digits")
      .required("Discount value is required"),
  });
  return (
    <>
      <div
        className="container my-5 d-flex justify-content-center"
        style={{ width: "800px", height: "550px" }}
      >
        <div className="col-lg-6">
          <h2 className="mb-5 text-center">Create New Discount</h2>
          <Formik
            initialValues={{
              discount_name: "",
              discount_description: "",
              discount_type: "",
              discount_value: 1000,
              discount_code: "",
              discount_created: "",
              discount_ended: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="row">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Name</label>
                  <div className="col-sm-8">
                    <Field className="form-control" name="discount_name" />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Description</label>
                  <div className="col-sm-8">
                    <Field
                      className="form-control"
                      name="discount_description"
                      component="textarea"
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Type</label>
                  <div className="col-sm-8">
                    <Field className="form-control" name="discount_type" />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Value</label>
                  <div className="col-sm-8">
                    <Field className="form-control" name="discount_value" />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Created At</label>
                  <div className="col-sm-8">
                    <Field
                      className="form-control"
                      name="createdAt"
                      type="date"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Updated At</label>
                  <div className="col-sm-8">
                    <Field
                      className="form-control"
                      name="discount_ended"
                      type="date"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="offset-sm-4 col-sm-4 d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm me-3"
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-sm-4 d-grid">
                    <button
                      onClick={() => props.showDiscountList()}
                      type="button"
                      className="btn btn-secondary me-2 "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

function DiscountList(props) {
  const [discount, setDiscount] = useState([]);
  const fetchDiscounts = async () => {
    try {
      const discounts = await getAllDiscounts();
      setDiscount(discounts.data);
      console.log(discounts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const getDelete = async (id) => {
    await service.deleteByIdDiscount(id);
    await fetchDiscounts();
  };

  const handleDelete = (id) => {
    getDelete(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h2 className="mb-3 text-center">List of Discounts</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Discount Name</th>
            <th>Discount Description</th>
            <th>Discount Type</th>
            <th>Discount Value</th>
            <th>Discount Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {discount.map((dis, index) => {
            return (
              <tr key={index}>
                <td>{dis.discount_name}</td>
                <td>{dis.discount_description}</td>
                <td>{dis.discount_type}</td>
                <td>{dis.discount_value}</td>
                <td>{dis.discount_code}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <button
                    onClick={() => props.showDiscountForm()}
                    type="button"
                    className="btn btn-primary btn-sm me-2 "
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => props.showDiscountForm()}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(dis._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
