import * as yup from "yup";

export default yup.object({
  date: yup.string().required("Transaction Date is required"),
  amount: yup.string().required("Amount is required"),
  description: yup.string().required("Short description is required"),
});