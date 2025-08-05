import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

const ErrorSnackbar = ({ show, onClose, message }) => {
  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast onClose={onClose} show={show} delay={4000} autohide bg="danger">
        <Toast.Header closeButton={false}>
          <ExclamationTriangleFill className="me-2" />
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {message || "An unexpected error occurred."}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorSnackbar;
