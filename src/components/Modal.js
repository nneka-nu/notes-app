import React from 'react';

const Modal = ({ children, title, show, onHide }) => {
  return (
    <div className={'modal' + (show ? ' show' : '')} data-testid="modal-wrapper">
      <div className="modal-content">
        <div className="modal-heading">
          <h1 className="modal-title" data-testid="modal-title">{title}</h1>
          <span
            title="Close modal"
            className="modal-close"
            onClick={() => onHide()}
          >
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
