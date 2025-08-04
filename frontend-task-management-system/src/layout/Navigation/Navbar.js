import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navigationbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="shadow-sm py-3"
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-light">
          TASK MANAGER
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="app-navbar-nav" />

        <Navbar.Collapse id="app-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="fw-bold text-light">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/tasks" className="fw-bold text-light">
              Tasks
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown
              title={
                <img
                  src="https://placehold.co/32x32/EFEFEF/7B7B7B?text=U"
                  alt="User"
                  className="rounded-circle"
                  width="32"
                  height="32"
                />
              }
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
