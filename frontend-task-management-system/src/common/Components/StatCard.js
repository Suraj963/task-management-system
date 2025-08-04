import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

const StatCard = ({ title, value, icon: Icon, color = "primary" }) => {
  return (
    <Card
      className={`shadow-sm border-0 border-start border-5 border-${color} rounded-4 h-100`}
    >
      <Card.Body className="p-4 d-flex flex-column">
        <Row className="align-items-start">
          <Col>
            <h6 className="text-muted text-uppercase mb-2">{title}</h6>
            <h2 className="fw-bolder mb-0">{value}</h2>
          </Col>
          <Col xs="auto">
            <div
              className={`p-3 bg-${color} bg-opacity-10 text-${color} rounded-3`}
            >
              <Icon size={28} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default StatCard;
