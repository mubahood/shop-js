// src/app/pages/auth/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/slices/notificationSlice";
import { loginUser } from "../../store/slices/authSlice";
import { APP_CONFIG } from "../../constants";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Use the auth slice login action
      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      }) as any);
      
      if (result.success) {
        dispatch(showNotification({
          type: "success",
          message: "Welcome back!"
        }));
        navigate(from, { replace: true });
      } else {
        setErrors({ email: result.error || "Login failed" });
      }
    } catch (error) {
      dispatch(showNotification({
        type: "error",
        message: "Login failed. Please try again."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="text-center mb-4">
        <h2 className="h3 fw-bold">Sign In</h2>
        <p className="text-muted">Welcome back! Please sign in to your account</p>
      </div>

      {/* Demo Credentials */}
      <Alert variant="info" className="small mb-4">
        <strong>Demo Credentials:</strong><br />
        Email: demo@example.com<br />
        Password: password
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between">
            <Form.Label>Password</Form.Label>
            <Link 
              to="/auth/forgot-password" 
              className="small text-decoration-none"
            >
              Forgot password?
            </Link>
          </div>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            isInvalid={!!errors.password}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            label="Remember me"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-100 mb-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="text-center">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/auth/register" className="text-decoration-none fw-semibold">
            Sign up
          </Link>
        </div>

        {/* Social Login */}
        <div className="social-login mt-4">
          <div className="text-center mb-3">
            <span className="text-muted small">Or continue with</span>
          </div>
          
          <div className="d-grid gap-2">
            <Button variant="outline-primary" className="social-btn">
              <i className="bi bi-google me-2"></i>
              Continue with Google
            </Button>
            <Button variant="outline-dark" className="social-btn">
              <i className="bi bi-facebook me-2"></i>
              Continue with Facebook
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
