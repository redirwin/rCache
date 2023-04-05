import React from "react";
import { CgTrash } from "react-icons/cg";
import { useFormik } from "formik";
import validationSchema from "../../utils/formValidationSchema";

export default function EntryForm() {
  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().substr(0, 10),
      amount: "",
      description: "",
      note: "",
      transactionType: "spend",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // handle form submission here
    },
  });

  const validateAmountInput = (input) => {
    let value = input.replace(/[^\d.]/g, "");
    // Removes non-numeric characters except for the decimal point
    let decimalIndex = value.indexOf(".");
    if (decimalIndex !== -1) {
      // Limits the decimal places to two
      if (value.slice(decimalIndex + 1).length > 2) {
        value = value.slice(0, decimalIndex + 3);
      }
      // Limits to only one "." character
      if (value.match(/\./g) && value.match(/\./g).length > 1) {
        value = value.slice(0, -1);
      }
    }
    // adds commas to the thousands place
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return value;
  };

  return (
    <div className={styles.EntryForm}>
      <div className={styles.formContent}>
        <form onSubmit={formik.handleSubmit}>
          <div className={`${styles.inputContainer} ${styles.dateContainer}`}>
            <label htmlFor="date">Transaction Date</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Transaction Date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className={styles.error}>{formik.errors.date}</div>
            ) : null}
          </div>

          <div
            className={`${styles.inputContainer} ${styles.transactionTypeContainer}`}
          >
            <label htmlFor="transactionType">Transaction Type</label>
            <div>
              <button
                type="button"
                id="deposit"
                name="transactionType"
                value="deposit"
                className={`${styles.depositButton} ${
                  formik.values.transactionType === "deposit"
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  formik.setFieldValue("transactionType", "deposit")
                }
              >
                DEPOSIT
              </button>

              <button
                type="button"
                id="spend"
                name="transactionType"
                value="spend"
                className={`${styles.spendButton} ${
                  formik.values.transactionType === "spend" ? styles.active : ""
                }`}
                onClick={() => formik.setFieldValue("transactionType", "spend")}
              >
                SPEND
              </button>
            </div>
            {formik.touched.transactionType && formik.errors.transactionType ? (
              <div className={styles.error}>
                {formik.errors.transactionType}
              </div>
            ) : null}
          </div>

          <div
            className={`${styles.inputContainer} ${styles.amountContainer} ${
              formik.values.transactionType === "spend"
                ? styles.spend
                : styles.deposit
            }`}
          >
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              placeholder="$0.00"
              max="99999999999.99"
              value={formik.values.amount}
              inputMode="numeric"
              onChange={(e) => {
                e.target.value = validateAmountInput(e.target.value);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className={styles.error}>{formik.errors.amount}</div>
            ) : null}
          </div>

          <div
            className={`${styles.inputContainer} ${styles.descriptionContainer}`}
          >
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Short Description"
              maxLength="50"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className={styles.error}>{formik.errors.description}</div>
            ) : null}
          </div>

          <div className={`${styles.inputContainer} ${styles.noteContainer}`}>
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              name="note"
              placeholder="Longer note (not required)."
              maxLength="200"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.note && formik.errors.note ? (
              <div className={styles.error}>{formik.errors.note}</div>
            ) : null}
          </div>

          <div
            className={`${styles.inputContainer} ${styles.saveControlsContainer}`}
          >
            <button
              type="button"
              className={styles.trash}
            >
              <CgTrash />
            </button>
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  );
}
