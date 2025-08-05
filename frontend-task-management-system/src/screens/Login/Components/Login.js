import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { KeyFill, PhoneFill } from "react-bootstrap-icons";
import SuccessSnackbar from "../../../common/Components/SuccessSnackbar";
import ErrorSnackbar from "../../../common/Components/ErrorSnackbar";
import { Base64 } from "js-base64";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginFields, validateLoginSubmitFields } from "../Validation";
import { loginUser } from "../Services";
import { AuthContext } from "../../../Auth";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
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
    const newErrors = validateLoginFields(name, value, errors);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors({ ...newErrors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newError = validateLoginSubmitFields(formData);
      setErrors(newError);
      if (Object.keys(newError).length === 0) {
        const req = {
          mobile: formData.mobile.trim(),
          password: formData.password,
        };
        handleLogin(req);
      }
    } catch (error) {
      setErrorMessage("Incorrect Mobile or Password");
      setShowErrorSnackbar(true);
    }
  };

  const handleLogin = async (reqData) => {
    try {
      localStorage.removeItem("token");
      formData.mobile = Number(formData.mobile);
      const data = await loginUser(reqData);
      if (data.status === 200) {
        localStorage.setItem("token", data?.payLoad?.token);
        login();
        setSuccessMessage("Logged In successfully!");
        setShowSuccessSnackbar(true);

        setFormData({
          mobile: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        throw new Error(`API returned status ${data.status}`);
      }
    } catch (error) {
      setErrorMessage("Incorrect Mobile or Password");
      setShowErrorSnackbar(true);
    }
  };

  return (
    <Container
      fluid
      className="bg-light vh-100 d-flex justify-content-center align-items-center p-3"
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
                  <p className="lead mt-3">
                    Access your world, securely and swiftly.
                  </p>
                </div>
              </Col>

              <Col md={6}>
                <Card.Body className="p-4 p-lg-5">
                  <div className="mb-4 text-center text-md-start">
                    <h2 className="fw-bolder">Login to Your Account</h2>
                    <p className="text-muted">Enter your credentials below.</p>
                  </div>

                  <Form>
                    <Form.Group className="mb-4" controlId="formMobile">
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
                      <div className="text-end mt-2">
                        <a
                          href="#"
                          className="text-muted small text-decoration-none"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </Form.Group>

                    <div className="d-grid mt-4">
                      <Button
                        variant="dark"
                        type="submit"
                        size="lg"
                        className="py-2 fw-semibold"
                        onClick={handleSubmit}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <span className="text-muted">Don't have an account? </span>
                    <Link
                      to="/signUp"
                      className="text-dark fw-medium text-decoration-none"
                    >
                      Sign Up
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

export default Login;
