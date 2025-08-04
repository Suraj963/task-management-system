import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import validateFormFields from "../../screens/Task/Validation";

const CreateTaskModal = ({ show, handleClose, onSave, editingTask }) => {
  const getInitialState = () => ({
    title: "",
    description: "",
    status: "Pending",
    createdAt: new Date().toISOString().substring(0, 10),
  });

  const [task, setTask] = useState(getInitialState());
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = validateFormFields(task);
    setErrors(newError);
    if (Object.keys(newError).length === 0) {
      onSave(task);
      setTask(getInitialState());
      setErrors({});
    }
  };

  useEffect(() => {
    if (show) {
      if (editingTask) {
        const formattedTask = {
          ...editingTask,
          createdAt: editingTask.createdAt
            ? new Date(editingTask.createdAt).toISOString().substring(0, 10)
            : "",
        };
        setTask(formattedTask);
      } else {
        setTask(getInitialState());
      }
    }
  }, [editingTask, show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingTask ? "Edit Task" : "Create New Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTaskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTaskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTaskCreatedAt">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="date"
              name="createdAt"
              value={task.createdAt}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" type="submit" onClick={handleSubmit}>
          {editingTask ? "Update Task" : "Save Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
