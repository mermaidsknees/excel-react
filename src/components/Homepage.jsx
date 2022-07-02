import React from "react";
import Modal from "./Modal";

const Homepage = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="homepage">
      <div className="welcome">
        <h1>The table is empty</h1>
        <button onClick={handleModal}>Create First Row</button>
        <Modal open={open} handleClose={handleModal} />
      </div>
    </div>
  );
}

export default Homepage;
