import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import {
  PersonFill,
  EnvelopeFill,
  KeyFill,
  PhoneFill,
} from "react-bootstrap-icons";
import { validateFormFields, validateSubmitFormFields } from "../Validation";
import { signUp } from "../Services";
import SuccessSnackbar from "../../../common/Components/SuccessSnackbar";
import ErrorSnackbar from "../../../common/Components/ErrorSnackbar";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // State for Snackbar
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateFormFields(name, value, errors);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors({ ...newErrors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newError = validateSubmitFormFields(formData);
      setErrors(newError);
      if (Object.keys(newError).length === 0) {
        const data = await signUp(formData);
        console.log(data);
        if (data.status === 200) {
          setSuccessMessage("Registered successfully!");
          setShowSuccessSnackbar(true);

          setFormData({
            name: "",
            mobile: "",
            email: "",
            password: "",
          });

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          throw new Error(`API returned status ${data.status}`);
        }
      }
    } catch (error) {
      setErrorMessage("User already Exists");
      setShowErrorSnackbar(true);
    }
  };

  return (
    <Container
      fluid
      className="p-0 m-0 vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col lg={10} xl={9}>
          <Card className="border-0 shadow-lg">
            <Row className="g-0">
              <Col
                md={6}
                className="bg-dark text-white d-none d-md-flex flex-column justify-content-center align-items-center p-5 rounded-start"
              >
                <div className="text-center">
                  <h1 className="fw-bolder display-4">TASK MANAGER</h1>
                  <p className="lead mt-3">Start your journey with us today.</p>
                </div>
              </Col>

              <Col md={6}>
                <Card.Body className="p-4 p-lg-5">
                  <div className="mb-4 text-center text-md-start">
                    <h2 className="fw-bolder">Create an Account</h2>
                    <p className="text-muted">
                      Join us by filling out the form below.
                    </p>
                  </div>

                  <Form>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Full Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                          <PersonFill />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          className="py-2 bg-light border-start-0"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMobile">
                      <Form.Label>Mobile Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                          <PhoneFill />
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          placeholder="Enter your mobile number"
                          className="py-2 bg-light border-start-0"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          isInvalid={!!errors.mobile}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mobile}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email Address</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                          <EnvelopeFill />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          className="py-2 bg-light border-start-0"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                          <KeyFill />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Create a password"
                          className="py-2 bg-light border-start-0"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-grid mt-4">
                      <Button
                        onClick={handleSubmit}
                        variant="dark"
                        type="submit"
                        size="lg"
                        className="py-2 fw-semibold"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <span className="text-muted">
                      Already have an account?{" "}
                    </span>
                    <Link
                      to="/login"
                      className="text-dark fw-medium text-decoration-none"
                    >
                      Login
                    </Link>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* SUCCESS SNACKBAR COMPONENT */}
      <SuccessSnackbar
        show={showSuccessSnackbar}
        message={successMessage}
        onClose={() => setShowSuccessSnackbar(false)}
      />

      {/* ERROR SNACKBAR COMPONENT */}
      <ErrorSnackbar
        show={showErrorSnackbar}
        message={errorMessage}
        onClose={() => setShowErrorSnackbar(false)}
      />
    </Container>
  );
};

export default Signup;
