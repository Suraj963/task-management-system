import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

const SuccessSnackbar = ({ show, onClose, message }) => {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast onClose={onClose} show={show} delay={3000} autohide bg="success">
        <Toast.Header closeButton={false}>
          <CheckCircleFill className="me-2" />
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SuccessSnackbar;
