import React, {useCallback} from "react";

import { useDispatch } from "react-redux";
import { updateCellValue } from "../store/actions/cellActions";

const DropdownCell = ({ id, index, required, dropdownOptions }) => {

  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();

  const handleChange = useCallback(e => {
    const updatedItem = e.target.value;

    if (updatedItem === "" && required) {
      setError(true);
    } else if (updatedItem !== "" || !required) {
      dispatch(updateCellValue({ id, index, content: updatedItem }));
      setError(false);
    }
  }, [dispatch, id, index, required]);

  return (
    <div>
      <select
        onBlur={handleChange}
        onChange={handleChange}
        placeholder="Please select an option"
        className={`cell ${error ? "error" : ""}`}
      >
        {/* Adds empty first option  */}
        <option value="">Select option</option>
        {dropdownOptions.map((option, i) => (
          <option key={i} value={option} defaultValue={""}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCell;
