export function validateAmountInput(input) {
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
  }
  