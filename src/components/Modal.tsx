import React, { PropsWithChildren } from "react";

type ModalProps = {
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = props => {
  return (
    <div className="modal" onClick={props.closeModal}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
