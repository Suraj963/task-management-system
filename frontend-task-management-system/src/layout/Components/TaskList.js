import React, { useState } from "react";
import {
  Table,
  Badge,
  Form,
  Button,
  Card,
  ListGroup,
  ButtonGroup,
} from "react-bootstrap";
import TaskActions from "./TaskActions";
import EmptyState from "./EmptyState";
import { formatDate } from "../../utils";

const TaskListTable = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const StatusBadge = ({ status }) => (
    <Badge
      pill
      bg={status === "Completed" ? "success" : "warning"}
      className="fw-semibold"
    >
      {status}
    </Badge>
  );

  const PaginationControl = () => {
    if (totalPages <= 1) return null;

    const handlePrevious = () =>
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    const handleNext = () =>
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Button
          key={number}
          variant={number === currentPage ? "light" : "outline-secondary"}
          onClick={() => setCurrentPage(number)}
          className="fw-bold"
        >
          {number}
        </Button>
      );
    }

    return (
      <div className="d-flex justify-content-center mt-3">
        <ButtonGroup aria-label="Pagination">
          <Button
            variant="outline-secondary"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>
          {items}
          <Button
            variant="outline-secondary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </ButtonGroup>
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-0">
        {tasks.length > 0 ? (
          <>
            {/* DESKTOP VIEW */}
            <div className="d-none d-lg-block">
              <Table responsive="lg" className="align-middle mb-0" hover>
                <thead>
                  <tr>
                    <th className="p-3 pt-2 text-uppercase text-secondary small fw-bolder">
                      Task Details
                    </th>
                    <th className="p-3 pt-2 text-uppercase text-secondary small fw-bolder">
                      Status
                    </th>
                    <th className="p-3 pt-2 text-uppercase text-secondary small fw-bolder">
                      Created On
                    </th>
                    <th className="p-3 pt-2 text-uppercase text-secondary small fw-bolder">
                      Updated On
                    </th>
                    <th
                      className="p-3 pt-2 text-uppercase text-secondary small fw-bolder text-end"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task) => (
                    <tr key={task.id} className="border-top">
                      <td className="p-3">
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="checkbox"
                            id={`task-check-${task.id}`}
                            checked={task.status === "Completed"}
                            onChange={() =>
                              onToggleComplete(task.status, task.id)
                            }
                            className="me-3"
                            style={{ transform: "scale(1.3)" }}
                          />
                          <div
                            className={
                              task.status === "Completed" ? "text-muted" : ""
                            }
                            style={{ wordBreak: "break-word", minWidth: 0 }}
                          >
                            <div
                              className={`fw-bold ${
                                task.status === "Completed"
                                  ? "text-decoration-line-through"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </div>
                            <div className="small">{task.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <StatusBadge status={task.status} />
                      </td>
                      <td className="p-3 small text-muted">
                        {formatDate(task.createdAt)}
                      </td>
                      <td className="p-3 small text-muted">
                        {formatDate(task.updatedAt)}
                      </td>
                      <td className="p-3 text-end">
                        <TaskActions
                          task={task}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* MOBILE VIEW */}
            <div className="d-lg-none">
              <ListGroup variant="flush">
                {currentTasks.map((task) => (
                  <ListGroup.Item key={`mobile-${task.id}`} className="p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div
                        className={`flex-grow-1 me-3 ${
                          task.status === "Completed" ? "text-muted" : ""
                        }`}
                        style={{ wordBreak: "break-word" }}
                      >
                        <h6
                          className={`fw-bold mb-1 ${
                            task.status === "Completed"
                              ? "text-decoration-line-through"
                              : ""
                          }`}
                        >
                          {task.title}
                        </h6>
                        <p className="mb-2 small">{task.description}</p>
                      </div>
                      <Form.Check
                        type="checkbox"
                        id={`mobile-task-check-${task.id}`}
                        checked={task.status === "Completed"}
                        onChange={() => onToggleComplete(task.status, task.id)}
                        className="ms-2"
                        style={{ transform: "scale(1.3)" }}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div>
                        <StatusBadge status={task.status} />
                        <span className="ms-3 small text-muted">
                          {formatDate(task.createdAt)} |
                        </span>
                        <span className="ms-3 small text-muted">
                          {formatDate(task.updatedAt)}
                        </span>
                      </div>
                      <TaskActions
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            <div className="p-3">
              <PaginationControl />
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </Card.Body>
    </Card>
  );
};

export default TaskListTable;
