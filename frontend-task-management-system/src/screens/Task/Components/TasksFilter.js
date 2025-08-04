import {
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const filterStatuses = ["All", "Pending", "Completed"];

const TasksFilter = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <Card
      bg="dark"
      data-bs-theme="dark"
      className="p-3 p-md-4 rounded-4 shadow-sm mb-4 border-0"
    >
      <Card.Body className="p-0">
        <Row className="g-3 align-items-center">
          <Col md={7} lg={8}>
            <div className="bg-body-tertiary rounded-pill">
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-0 ps-3 text-muted">
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent border-0 shadow-none"
                />
              </InputGroup>
            </div>
          </Col>

          <Col md={5} lg={4} className="mt-3 mt-md-0">
            <ButtonGroup className="w-100 w-md-auto d-flex justify-content-md-end">
              {filterStatuses.map((status) => (
                <Button
                  key={status}
                  variant={
                    statusFilter === status ? "light" : "outline-secondary"
                  }
                  onClick={() => onStatusChange(status)}
                  className="fw-medium"
                >
                  {status}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TasksFilter;
