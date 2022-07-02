import React from "react";

// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { editColumnTitle } from "../store/actions/cellActions";

import Column from "./Column";
import Modal from "./Modal";

const Table = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  
  const longestRow = useSelector((state) => {
    return state.columns[
      state.columns
        .map((col) => col.items.length)
        .indexOf(Math.max(...state.columns.map((col) => col.items.length)))
    ].items;
  });
   //Finds the longest items arrays withing the columns state
  //This prop will be used to map the row numbers (indexes) in the spreadsheet
  const [open, setOpen] = React.useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const changeColumnTitle = (i, id) => {
    let title = document.getElementById(`column-title-${i}`).innerHTML;
    dispatch(editColumnTitle({ id, title }));
  };

  return (
    <div className="table grid-container">
      <div className="column-names">
        {columns.map((col, i) => (
          <div
            id={`column-title-${i}`}
            contentEditable=""
            onBlur={() => changeColumnTitle(i, col.id)}
            key={i}
            className="column-title"
          >
            {col.title}
          </div>
        ))}
      </div>
      <div className="cells">
        {columns.map((col, i) => (
          <Column
            dropdownOptions={col.dropdownOptions}
            key={i}
            required={col.required}
            type={col.type}
            items={col.items}
            id={col.id}
          />
        ))}
        <button onClick={handleModal} className="new-col-button">
          +
        </button>
        <Modal open={open} handleClose={handleModal} />
      </div>
      <div className="row">
        {longestRow.map((row, i) => (
          <div key={i} className="row-number">
            {i + 1}
          </div>
        ))}
        {/* i+1 because indexing starts at 0, and we want it to start with 1 */}
      </div>
      {/* Empty corner box */}
      <div className="empty-square row-number" />
    </div>
  );
};

export default Table;
