import React from "react";

import { useDispatch } from "react-redux";
import { addRows } from "../store/actions/cellActions";

import Cell from "./Cell";
import DropdownCell from "./DropdownCell";

const Column = ({ items, id, type, required, dropdownOptions }) => {
  const dispatch = useDispatch();
  const onAddRows = React.useCallback(() => dispatch(addRows({ id }), []));

  return (
    <div className="column">
      {/* If the type of column is dropdown, DropdownCell is rendered */}
      {/* Otherwise normal cell */}
      {type === "dropdown" ? (
        <div>
          {items.map((item, i) => (
            <DropdownCell
              id={id}
              index={i}
              key={i}
              required={required}
              dropdownOptions={dropdownOptions}
            />
          ))}
        </div>
      ) : (
        <div>
          {items.map((item, i) => (
            <Cell
              id={id}
              required={required}
              key={i}
              type={type}
              index={i}
              item={item}
            />
          ))}
        </div>
      )}
      <button onClick={onAddRows} className="new-row-button">
        +
      </button>
    </div>
  );
};

export default Column;
