import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../../Services/discountService";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
export function EditDiscount() {
  const [discount, setDiscount] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDiscount = async () => {
    try {
      if (id) {
        const response = await service.findByIdDiscount(id);
        setDiscount(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await service.updateByIdDiscount(id, values);
      navigate("/sidebar/discount");
    } catch (error) {
      console.log(error);
    }
  };

  if (!discount) {
    return null;
  }

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validationSchema = Yup.object().shape({
    discount_name: Yup.string()
      .max(30, "Name must be at most 30 characters")
      .matches(/^[a-zA-Z0-9\s]*$/, "Name must contain only letters and numbers")
      .required("Name is required"),
    discount_description: Yup.string()
      .max(50)
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Description must contain only letters and numbers"
      )
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
    <div
      className="container my-5 d-flex justify-content-center"
      style={{ width: "800px", height: "550px" }}
    >
      <div className="col-lg-6">
        <h2 className="mb-3 text-center">Update Discount</h2>
        <Formik
          initialValues={{
            discount_name: discount.discount_name,
            discount_description: discount.discount_description,
            discount_type: discount.discount_type,
            discount_value: discount.discount_value,
            discount_code: discount._id,
            discount_created: formatDateForInput(discount.discount_created),
            discount_ended: formatDateForInput(discount.discount_ended),
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          // validationSchema={validationSchema}
        >
          <Form className="row">
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
                  name="discount_created"
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

            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Code</label>
              <div className="col-sm-8">
                <Field className="form-control" name="discount_code" readOnly />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-8 offset-sm-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Update
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
