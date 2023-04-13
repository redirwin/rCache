import React from "react";
import { CgTrash } from "react-icons/cg";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import validationSchema from "../../utils/formValidationSchema";
import { validateAmountInput } from "../../utils/validateAmountInput";
import TransactionTypeButtons from "../TransactionTypeButtons/TransactionTypeButtons";
import styles from "./EntryForm.module.scss";

export default function EntryForm(props) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const formik = useFormik({
    initialValues: {
      date: props.selectedEntry ? props.selectedEntry.date : formattedDate,
      amount: props.selectedEntry ? props.selectedEntry.amount.toFixed(2) : "",
      description: props.selectedEntry ? props.selectedEntry.description : "",
      note: props.selectedEntry ? props.selectedEntry.note : "",
      transactionType: props.selectedEntry ? props.selectedEntry.type : "spend",
      cleared: props.selectedEntry ? props.selectedEntry.cleared : false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newEntry = {
        eid: props.selectedEntry ? props.selectedEntry.eid : nanoid(),
        date: values.date,
        amount: parseFloat(values.amount.replace(",", "")),
        description: values.description,
        note: values.note,
        type: values.transactionType,
        cleared: values.cleared,
        timestamp: Date.now(),
      };
      props.handleFormSubmit(newEntry);
    },
  });

  const handleTransactionTypeChange = (value) => {
    formik.setFieldValue("transactionType", value);
  };

  return (
    <div className={styles.EntryForm}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.topRow}>
          <div className={styles.dateContainer}>
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
              <div className={styles.formikError}>{formik.errors.date}</div>
            ) : null}
          </div>

          <div className={styles.customCheckbox}>
            <label
              htmlFor="cleared"
              className={formik.values.cleared ? styles.checked : ""}
            >
              Cleared
            </label>
            <input
              type="checkbox"
              id="cleared"
              name="cleared"
              defaultChecked={formik.values.cleared}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <TransactionTypeButtons
          handleTransactionTypeChange={handleTransactionTypeChange}
          errors={formik.errors}
          currentType={formik.values.transactionType}
        />

        <div>
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
            <div className={styles.formikError}>{formik.errors.amount}</div>
          ) : null}
        </div>

        <div>
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
            <div className={styles.formikError}>
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <div>
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
            <div className={styles.formikError}>{formik.errors.note}</div>
          ) : null}
        </div>

        <div className={styles.saveControlsContainer}>
          <button
            aria-label="Trash and Close"
            onClick={() => {
              if (props.selectedEntry) {
                if (
                  window.confirm("Are you sure you want to delete this entry?")
                ) {
                  props.handleEntryDelete(props.selectedEntry);
                }
              } else {
                props.handleFormClose();
              }
            }}
          >
            <CgTrash />
          </button>

          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}
