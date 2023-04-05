import React from "react";
import { CgTrash } from "react-icons/cg";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import validationSchema from "../../utils/formValidationSchema";
import { validateAmountInput } from "../../utils/validateAmountInput";
import TransactionTypeButtons from "../TransactionTypeButtons/TransactionTypeButtons";

export default function EntryForm(props) {
  const formik = useFormik({
    initialValues: {
      date: props.selectedEntry
        ? props.selectedEntry.date
        : new Date().toISOString().substr(0, 10),
      amount: props.selectedEntry ? props.selectedEntry.amount.toFixed(2) : "",
      description: props.selectedEntry ? props.selectedEntry.description : "",
      note: props.selectedEntry ? props.selectedEntry.note : "",
      transactionType: props.selectedEntry ? props.selectedEntry.type : "spend",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newEntry = {
        uuid: props.selectedEntry ? props.selectedEntry.uuid : nanoid(),
        date: values.date,
        amount: parseFloat(values.amount.replace(",", "")),
        description: values.description,
        note: values.note,
        type: values.transactionType,
        timestamp: Date.now()
      };
      console.log(newEntry);
      props.handleFormSubmit(newEntry);
    },
  });

  const handleTransactionTypeChange = (value) => {
    console.log(value);
    formik.setFieldValue("transactionType", value);
  };

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
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
              <div>{formik.errors.date}</div>
            ) : null}
          </div>

          <TransactionTypeButtons
            handleTransactionTypeChange={handleTransactionTypeChange}
            errors={formik.errors}
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
              <div>{formik.errors.amount}</div>
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
              <div>{formik.errors.description}</div>
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
              <div>{formik.errors.note}</div>
            ) : null}
          </div>

          <div>
            <button
              aria-label="Trash and Close"
              onClick={() => {
                if (props.selectedEntry) {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this entry?"
                    )
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
    </div>
  );
}
