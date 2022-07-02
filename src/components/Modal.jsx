import React, {useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import { createColumn } from "../store/actions/cellActions";

const Modal = ({ open, handleClose }) => {
  const columns = useSelector((state) => state.columns);
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState();
  const [type, setType] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [dropdownItem, setDropdownItem] = React.useState([""]);
  const [dropdownOptions, setDropdownOptions] = React.useState([]);

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDropdownItem = (event) => {
    setDropdownItem(event.target.value);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleDropdownSubmit = useCallback(()=> {
    setDropdownOptions([...dropdownOptions, dropdownItem]);
    setDropdownItem(""); //resets input field on submit
  }, [dropdownItem, dropdownOptions])

  //This functions resets all the values in the Modal window after submit
  const resetModal = useCallback(() => {
    setChecked(true);
    setTitle();
    setDropdownItem([]);
    setType(false);
    setDropdownOptions([]);
    handleClose();
  }, [handleClose]);

  const handleSubmit = useCallback(() => {
    dispatch(
      createColumn({
        id: columns.length,
        required: checked,
        items: new Array(10).fill(""),
        // 10 empty array items (i.e spreadsheet cells)
        // Gives the initial value of empty string
        title,
        type,
        dropdownOptions,
      })
    );
    resetModal();
  },[checked, columns.length, dispatch, dropdownOptions, resetModal, title, type]);

  return (
    <div>
      {/* Modal window from Material UI */}
      {/* Initiates Dialog with user about creating new column */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Column</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To create a column please specify the name, type of input and if the
            field is required
          </DialogContentText>
          <TextField
            autoFocus
            value={title ? title : ""}
            //Sets default value to empty string
            //Can be done differently but this is more visible
            onChange={handleTitle}
            margin="dense"
            label="Column Title"
            type="text"
            fullWidth
          />
          {/* Multiple Choice Material UI Component */}
          <InputLabel className="home-input-label">Cell Type</InputLabel>

          <Select
            value={type ? type : setType("text")}
            //Setting default value to text instead of false
            onChange={handleChange}
            className="home-select"
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="dropdown">Select(Dropdown)</MenuItem>
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="number">Number</MenuItem>
          </Select>

          <InputLabel className="home-input-label">Required?</InputLabel>
          <Checkbox
            value={checked}
            className="home-checkbox"
            color="primary"
            onChange={handleCheckbox}
          />

          {type === "dropdown" ? (
            <div>
              <div className="add-dropdown-option">
                <TextField
                  type="text"
                  onChange={handleDropdownItem}
                  value={dropdownItem}
                  label="Add Dropdown Options"
                />
                <Button
                  onClick={handleDropdownSubmit}
                  className="add-dropdown-button"
                  variant="contained"
                >
                  Add
                </Button>
              </div>

              <div className="display-dropdown-items">
                {dropdownOptions
                  ? dropdownOptions.map((item, i) => (
                      <span className="display-dropdown-item" key={i}>
                        {item}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
