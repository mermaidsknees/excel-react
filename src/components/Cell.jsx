import React, { useCallback } from "react";

//Custom made validations
import { validateInput } from "../utils/validations";

import { useDispatch } from "react-redux";
import { updateCellValue } from "../store/actions/cellActions";

function Cell({ id, type, index, required, item }) {
  const dispatch = useDispatch();
  const [updatedItem, setUpdatedItem] = React.useState(item);
  const [focus, setFocus] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleFocus = () => {
    setFocus(!focus);
  };

  //This array allows to store multiple conditional styles to an element
  let cellClass = ["cell", focus ? "selected" : "", error ? "error" : ""];
  //join(" ") merges array elements to obtain a usable class
  cellClass = cellClass.join(" ");

  const handleChange = useCallback((e) => {
    setUpdatedItem(e.target.value);
  }, []);

  const submitValue = useCallback(() => {
    if ((updatedItem === "" && required) || !validateInput(updatedItem, type)) {
      //Sets error if required field is empty
      setError(true);
    } else if (
      (validateInput(updatedItem, type) && !required) ||
      (updatedItem !== "" && required)
    ) {
      dispatch(updateCellValue({ id, index, content: updatedItem }));
      setError(false);
    }
  }, [dispatch, id, index, required, type, updatedItem]);

  const updateCell = () => {
    handleFocus();
    submitValue();
  };

  return (
    <div>
      <input
        type={type === "date" ? "date" : "text"}
        onFocus={() => {
          handleFocus();
        }}
        value={updatedItem}
        onBlur={updateCell}
        onChange={handleChange}
        className={cellClass}
      />
    </div>
  );
}

export default Cell;
