import { Card } from "react-bootstrap";

const WelcomeBanner = ({
  userName = "User",
  pendingTasks,
  completedTasks,
  totalTasks
}) => {
  //   ( #0d1b4a, #1a2a6c)
  const bannerStyle = {
    background: "linear-gradient(to right, #212529, #010517ff)",
  };

  return (
    <Card
      style={bannerStyle}
      className="text-white border-0 shadow-lg rounded-4"
    >
      <Card.Body className="p-4 p-md-5">
        <h4 className="fw-bold display-6">Welcome back, Buddy! 👋</h4>
        <p className="lead mb-1" style={{ fontSize: "1.1rem" }}>
          You have <strong>{pendingTasks} pending tasks</strong> and{" "}
          <strong>{completedTasks} completed Tasks</strong> and  <strong>{totalTasks}</strong> Total Task.
        </p>
        <p style={{ fontSize: "1.1rem" }}>Let's make today productive!</p>
      </Card.Body>
    </Card>
  );
};

export default WelcomeBanner;
