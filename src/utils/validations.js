export function validateString(item) {
  //Since text is usually any string there is not
  return typeof item == "string";
}

export function validateNumber(item) {
  //NaN - not number, isNaN() checks if var is NON a number
  // i.e "123" - false => we need opposite of that so !isNaN()
  //parseFloat makes sure spaces don't count either
  // || (item == '') to make sure you can remove the last character
  return (!isNaN(item) && !isNaN(parseFloat(item))) || item == "";
}

export function validateDate(item) {
  //Even though the input of the date format looks lie dd/mm/yyyy
  //If you look at how the data is passed it's actualy yyyy-mm-dd
  //So the validation looks like this
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!item.match(regEx)) return false; // Invalid format
  var d = new Date(item);
  //getTime() returns date in miliseconds 
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === item;
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  //toISOString() - returns String in ISO format 
  //Slice slices ISO format into just the regular date format
}

//Master function that checks input and validates it
export function validateInput(item, type) {
  if (type === "text" && !validateString(item)) {
    return false;
  } else if (type === "number" && !validateNumber(item)) {
    return false;
  } else if (type === "date" && !validateDate(item)) {
    return false;
  } else {
    return true;
  }
}
