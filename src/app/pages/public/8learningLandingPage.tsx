// src/app/pages/public/8learningLandingPage.tsx

import React from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card,
  Carousel,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Define your main colours
const primaryColor = "#114786";
const accentColor = "#f33d02";

const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const EightLearningLandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        style={{
          position: "relative",
          backgroundImage: `linear-gradient(45deg, ${primaryColor}E6, ${accentColor}E6), url(https://via.placeholder.com/1920x1080?text=Hero+Background)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 0",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(17, 71, 134, 0.85)",
          }}
        />
        <Container
          className="container-fluid"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Row className="align-items-center">
            <Col md={7}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeVariant}
              >
                <h1 className="display-4 fw-bold">
                  8learning – Transform Your Future, One Skill at a Time.
                </h1>
                <p className="lead" style={{ color: "#ddd" }}>
                  Join our comprehensive skills training programs and unlock
                  your potential with expert instructors and flexible learning.
                </p>
                <a
                  href="/register"
                  className="me-2"
                  style={{
                    backgroundColor: accentColor,
                    borderColor: accentColor,
                  }}
                >
                  Get Started
                </a>
                <a
                  href="/courses"
                  className="me-2"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: accentColor,
                    color: "#fff",
                  }}
                >
                  Learn More
                </a>
              </motion.div>
            </Col>
            <Col md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="https://via.placeholder.com/500x400?text=Training+Image"
                  alt="Training"
                  className="img-fluid rounded shadow"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section
        id="features"
        style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}
      >
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 style={{ color: primaryColor }} className="fw-bold">
                Our Courses
              </h2>
              <p className="text-muted">
                Explore a wide range of skills training programs designed to
                empower you for the future.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center shadow-sm border-0">
                <Card.Body>
                  <FaChalkboardTeacher
                    size={50}
                    color={primaryColor}
                    className="mb-3"
                  />
                  <Card.Title>Expert Instructors</Card.Title>
                  <Card.Text>
                    Learn from industry professionals with years of real-world
                    experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center shadow-sm border-0">
                <Card.Body>
                  <FaGraduationCap
                    size={50}
                    color={primaryColor}
                    className="mb-3"
                  />
                  <Card.Title>Comprehensive Curriculum</Card.Title>
                  <Card.Text>
                    Gain practical skills with hands-on projects and real-life
                    case studies.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center shadow-sm border-0">
                <Card.Body>
                  <FaUsers size={50} color={primaryColor} className="mb-3" />
                  <Card.Title>Community Support</Card.Title>
                  <Card.Text>
                    Connect with like-minded learners and industry experts in
                    our vibrant community.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Courses Listing Section */}
      <section id="courses-list" style={{ padding: "80px 0" }}>
        <Container>
          <Row className="mb-5">
            <Col>
              <h2
                style={{ color: primaryColor }}
                className="fw-bold text-center"
              >
                Popular Courses
              </h2>
            </Col>
          </Row>
          <Row>
            {Array.from({ length: 4 }).map((_, index) => (
              <Col md={3} key={index} className="mb-4">
                <Card className="shadow-sm border-0 h-100">
                  <Card.Img
                    variant="top"
                    src={`https://via.placeholder.com/300x200?text=Course+${
                      index + 1
                    }`}
                  />
                  <Card.Body>
                    <Card.Title>Course Title {index + 1}</Card.Title>
                    <Card.Text>
                      A brief description of the course content goes here.
                    </Card.Text>
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: accentColor,
                        borderColor: accentColor,
                      }}
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}
      >
        <Container>
          <Row className="mb-5">
            <Col>
              <h2
                style={{ color: primaryColor }}
                className="fw-bold text-center"
              >
                Testimonials
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Carousel indicators={false} controls={true}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Carousel.Item key={index}>
                    <Row className="justify-content-center">
                      <Col md={8} className="text-center">
                        <p className="lead">
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin vel arcu eget massa fermentum tempus."
                        </p>
                        <h5 className="fw-bold">Student {index + 1}</h5>
                        <p className="text-muted">Aspiring Professional</p>
                      </Col>
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call To Action Section */}
      <section
        id="cta"
        style={{ padding: "80px 0", backgroundColor: primaryColor }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold text-white">
                Ready to Upgrade Your Skills?
              </h2>
              <p className="lead text-white-50">
                Join 8learning today and start your journey towards a brighter
                future.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="light" size="lg" className="fw-bold">
                Enroll Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default EightLearningLandingPage;
