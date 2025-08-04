import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

const TasksHeader = ({ onCreateTaskClick }) => {
  return (
    <div className="bg-dark text-white p-4 rounded-4 shadow-sm mb-4">
      <Row className="align-items-center">
        <Col>
          <h3 className="fw-bold mb-1">Tasks</h3>
          <p className="text-white-50 mb-0">
            Manage and track your task progress
          </p>
        </Col>
        <Col xs="auto" className="ms-auto">
          <Button
            variant="light"
            onClick={onCreateTaskClick}
            className="d-inline-flex align-items-center gap-2 fw-medium"
          >
            <PlusCircleFill size={18} />
            Create Task
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TasksHeader;
