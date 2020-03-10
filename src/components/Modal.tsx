import React from "react";

const Modal = (props: any) => {
  return (
    <div className="modal">
      <div className="modal-container">{props.children}</div>
    </div>
  );
};

export default Modal;
