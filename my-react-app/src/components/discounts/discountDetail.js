import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../../Services/discountService";
import { Formik, Form, Field } from "formik";

export function DetailDiscount(props) {
  const [discount, setDiscount] = useState();
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

  const handleSubmit = async () => {
    try {
      navigate("/sidebar/discount");
    } catch (error) {
      console.log(error);
    }
  };

  if (!discount) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container my-5 d-flex justify-content-center" style={{ width: "800px", height: "550px" }}>
      <div className="col-lg-6">
        <h2 className="mb-2 text-center pb-15">Detail Discount</h2>
        <Formik
          initialValues={{
            discount_name: discount.discount_name,
            discount_description: discount.discount_description,
            discount_type: discount.discount_type,
            discount_value: discount.discount_value,
            discount_code: discount._id,
            discount_created: formatDate(discount.discount_created),
            discount_ended: formatDate(discount.discount_ended),
          }}
          onSubmit={handleSubmit}
        >
          <Form className="row">
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <Field className="form-control w-80" name="discount_name" readOnly />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <Field
                  className="form-control w-100"
                  name="discount_description"
                  readOnly
                  component="textarea"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Type</label>
              <div className="col-sm-8">
                <Field className="form-control" name="discount_type" readOnly />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Value</label>
              <div className="col-sm-8">
                <Field className="form-control" name="discount_value" readOnly />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Code</label>
              <div className="col-sm-8">
                <Field className="form-control" name="discount_code" readOnly />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Created At</label>
              <div className="col-sm-8">
                <Field className="form-control" name="discount_created" readOnly />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Updated At</label>
              <div className="col-sm-8">
                <Field className="form-control" name="discount_ended" readOnly />
              </div>
            </div>

            <div className="b-3 row">
              <div className="pt-6 col-sm-8 offset-sm-4">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-primary btn-lg btn-block w-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
