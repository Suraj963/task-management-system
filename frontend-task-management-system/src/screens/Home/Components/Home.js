import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WelcomeBanner from "./WelcomeBanner";
import StatCard from "../../../common/Components/StatCard";
import {
  CheckCircleFill,
  ClockFill,
  GraphUpArrow,
} from "react-bootstrap-icons";
import { getTasksCount } from "../Services";

const Home = () => {
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const userData = {
    name: "John",
    tasks: 23,
    updates: 3,
  };

  const fetchTasksCount = async () => {
    try {
      const data = await getTasksCount();
      if (data.status === 200) {
        const { completedCount, pendingCount, totalCount } = data.payLoad;
        setCompletedCount(completedCount);
        setPendingCount(pendingCount);
        setTotalCount(totalCount);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchTasksCount();
  }, []);

  return (
    <Container className="py-4">
      {/* Welcome Banner */}
      <WelcomeBanner
        userName={userData.name}
        pendingTasks={pendingCount}
        completedTasks={completedCount}
        totalTasks={totalCount}
      />

      <div className="mt-5">
        <h2 className="fw-bold mb-3">Performance Overview</h2>
        <Row className="g-4">
          <Col md={6} xl={4}>
            <StatCard
              title="Total Tasks"
              value={totalCount}
              icon={GraphUpArrow}
              // percentageChange={5}
              color="info"
            />
          </Col>
          <Col md={6} xl={4}>
            <StatCard
              title="Completed Tasks"
              value={completedCount}
              icon={CheckCircleFill}
              // percentageChange={12}
              color="success"
            />
          </Col>
          <Col md={6} xl={4}>
            <StatCard
              title="Pending Tasks"
              value={pendingCount}
              icon={ClockFill}
              // percentageChange={-8}
              color="warning"
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Home;
