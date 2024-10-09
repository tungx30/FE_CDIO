import axios from "axios";

export const getAllDiscounts = async () => {
  try {
    let result = await axios.get("http://localhost:4000/api/discount");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const doDiscounts = async (id) => {
  let discount = await axios.post(
    "http://localhost:4000/api/discount/create/",
    id
  );
  return discount.status;
};

export const findByIdDiscount = async (id) => {
  try {
    let result = await axios.get(
      "http://localhost:4000/api/discount/getId/" + id
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateByIdDiscount = async (id,value) => {
  try {
    let result = await axios.put(
      "http://localhost:4000/api/discount/edit/getId/" + id,value
    );
    return result.status;
  } catch (error) {
    console.log(error);
  }
};

export const deleteByIdDiscount = async (id, value) => {
  let result = await axios.delete(
    "http://localhost:4000/api/discount/delete/getId/" + id,
    value
  );
  return result.data;
};
