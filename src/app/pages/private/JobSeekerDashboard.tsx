// src/app/pages/candidate/JobSeekerDashboard.tsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, ProgressBar, ListGroup, Button, Alert, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaBriefcase,
  FaClipboardCheck,
  FaCalendarDay,
  FaAward,
  FaEye,
  FaChartPie,
  FaChartBar,
  FaListAlt,
  FaBell,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

// Define your main colors and additional colors
const primaryColor = "#114786";
const accentColor = "#f33d02";
const successColor = "#28a745";
const warningColor = "#ffc107";
const dangerColor = "#dc3545";
const infoColor = "#17a2b8";
const lightGray = "#f8f9fa";
const dashboardBackground = "#f4f6f8";

// Dummy data class for the Job Seeker Dashboard Manifest
class JobSeekerDashboardManifest {
  totalApplicationsSubmitted: number = 150;
  pendingApplications: number = 45;
  interviewInvitations: number = 12;
  jobOffersReceived: number = 3;
  profileViews: number = 210;

  applicationStatusData = [
    { name: "Pending", value: 45, color: warningColor },
    { name: "Interviewing", value: 12, color: accentColor },
    { name: "Offered", value: 3, color: successColor },
    { name: "Rejected", value: 90, color: dangerColor },
  ];

  monthlyActivityData = [
    { month: "Jan", applications: 20, interviews: 2, offers: 1 },
    { month: "Feb", applications: 25, interviews: 3, offers: 0 },
    { month: "Mar", applications: 30, interviews: 5, offers: 1 },
    { month: "Apr", applications: 28, interviews: 4, offers: 0 },
    { month: "May", applications: 35, interviews: 6, offers: 1 },
    { month: "Jun", applications: 40, interviews: 8, offers: 0 },
  ];

  latestApplications = [
    { id: 1, jobTitle: "Software Engineer", company: "Tech Solutions Inc.", date: "2023-08-05", status: "Interviewing" },
    { id: 2, jobTitle: "Data Analyst", company: "Data Insights Ltd.", date: "2023-08-03", status: "Pending" },
    { id: 3, jobTitle: "Project Manager", company: "Global Corp", date: "2023-07-28", status: "Rejected" },
    { id: 4, jobTitle: "UX Designer", company: "Creative Studios", date: "2023-07-20", status: "Offered" },
  ];

  recentJobOffers = [
    { id: 1, jobTitle: "UX Designer", company: "Creative Studios", date: "2023-08-07", status: "Pending Response" },
  ];

  upcomingInterviews = [
    { id: 1, jobTitle: "Software Engineer", company: "Tech Solutions Inc.", date: "2023-08-15", time: "10:00 AM", type: "Video Call" },
    { id: 2, jobTitle: "Marketing Manager", company: "Marketing Pros", date: "2023-08-18", time: "02:00 PM", type: "In-Person" },
  ];

  savedJobs = [
    { id: 1, jobTitle: "Senior Frontend Developer", company: "Web Giants Ltd.", location: "Kampala", dateSaved: "2023-08-01", deadline: "2023-08-20" },
    { id: 2, jobTitle: "Backend Engineer (Node.js)", company: "Cloud Services Inc.", location: "Remote", dateSaved: "2023-07-25", deadline: "2023-08-15" },
  ];

  recommendedJobs = [
    { id: 3, jobTitle: "Fullstack Developer (React/Python)", company: "Innovate Tech", location: "New York", dateSaved: "2023-08-08", deadline: "2023-08-25", reason: "Based on your skills and profile." },
    { id: 4, jobTitle: "DevOps Engineer", company: "Global Solutions", location: "London", dateSaved: "2023-08-09", deadline: "2023-08-30", reason: "Similar to jobs you've applied to." },
  ];

  responseRate: number = 65;
  successRate: number = 25;
  profileCompleteness: number = 80;
  tips = [
    "Complete your profile to increase visibility.",
    "Apply for jobs regularly to improve your chances.",
    "Follow up on your applications after a week.",
  ];
}

// Create a dummy instance
const dashboardData = new JobSeekerDashboardManifest();

// For RadialBarChart data
const radialBarData = [{ name: "Profile Strength", value: dashboardData.profileCompleteness }];

// Framer Motion animation variants
const fadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20 },
};

const JobSeekerDashboard: React.FC = () => {
  return (
    <motion.div
      className="bg-light"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariant}
      style={{ minHeight: "100vh", backgroundColor: dashboardBackground }}
    >
      <Container fluid className="p-4">
        {/* Dashboard Header */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold" style={{ color: primaryColor }}>
              Welcome Back, Job Seeker!
            </h2>
            <p className="text-muted">Here's an overview of your job search activity.</p>
          </Col>
        </Row>

        {/* Overview Cards */}
        <Row className="mb-4">
          {[
            {
              label: "Total Applications",
              value: dashboardData.totalApplicationsSubmitted,
              icon: <FaClipboardCheck />,
              color: primaryColor,
            },
            {
              label: "Pending Applications",
              value: dashboardData.pendingApplications,
              icon: <FaHourglassHalf />,
              color: warningColor,
            },
            {
              label: "Interview Invites",
              value: dashboardData.interviewInvitations,
              icon: <FaCalendarDay />,
              color: primaryColor,
            },
            {
              label: "Job Offers",
              value: dashboardData.jobOffersReceived,
              icon: <FaAward />,
              color: accentColor,
            },
            {
              label: "Profile Views",
              value: dashboardData.profileViews,
              icon: <FaEye />,
              color: primaryColor,
            },
          ].map((stat, idx) => (
            <Col md={3} sm={6} xs={12} key={idx} className="mb-3">
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="d-flex align-items-center">
                  <div
                    className="me-3 d-flex justify-content-center align-items-center rounded-circle"
                    style={{ width: "50px", height: "50px", backgroundColor: stat.color, color: "#fff" }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <h5 className="mb-0" style={{ color: stat.color }}>{stat.value}</h5>
                    <small className="text-muted">{stat.label}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Charts */}
        <Row className="mb-5">
          <Col md={6} className="mb-3">
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>
                  Application Status Breakdown
                </h6>
              </Card.Header>
              <Card.Body style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.applicationStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {dashboardData.applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={14} />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>
                  Monthly Application Activity
                </h6>
              </Card.Header>
              <Card.Body style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.monthlyActivityData} margin={{ top: 25, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={lightGray} />
                    <XAxis dataKey="month" style={{ fontSize: "0.9rem" }} />
                    <YAxis style={{ fontSize: "0.9rem" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" fill={primaryColor} name="Applications" barSize={20} />
                    <Bar dataKey="interviews" fill={accentColor} name="Interviews" barSize={20} />
                    <Bar dataKey="offers" fill={successColor} name="Job Offers" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Applications */}
        <Row className="mb-5">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>Recent Applications</h6>
              </Card.Header>
              <Card.Body>
                {dashboardData.latestApplications.length > 0 ? (
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.latestApplications.map((app) => (
                        <tr key={app.id}>
                          <td>{app.jobTitle}</td>
                          <td>{new Date(app.date).toLocaleDateString()}</td>
                          <td>
                            <Badge  bg={
                              app.status === "Pending"
                                ? warningColor
                                : app.status === "Interviewing"
                                ? infoColor
                                : app.status === "Offered"
                                ? successColor
                                : dangerColor
                            }>
                              {app.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Alert variant="info">No recent applications.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Interviews */}
        <Row className="mb-5">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>Upcoming Interviews</h6>
              </Card.Header>
              <Card.Body>
                {dashboardData.upcomingInterviews.length > 0 ? (
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.upcomingInterviews.map((interview) => (
                        <tr key={interview.id}>
                          <td>{interview.jobTitle}</td>
                          <td>{new Date(interview.date).toLocaleDateString()}</td>
                          <td>{interview.time}</td>
                          <td>{interview.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Alert variant="info">No upcoming interviews scheduled.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Saved & Recommended Jobs */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="shadow-sm border-0 mb-3">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>Saved Jobs</h6>
              </Card.Header>
              <Card.Body>
                {dashboardData.savedJobs.length > 0 ? (
                  <ListGroup variant="flush">
                    {dashboardData.savedJobs.map((job) => (
                      <ListGroup.Item key={job.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{job.jobTitle}</strong> at {job.company}
                        </div>
                        <Button variant="primary" size="sm" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                          Apply Now
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">No saved jobs.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm border-0 mb-3">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>Recommended Jobs</h6>
              </Card.Header>
              <Card.Body>
                {dashboardData.recommendedJobs.length > 0 ? (
                  <ListGroup variant="flush">
                    {dashboardData.recommendedJobs.map((job) => (
                      <ListGroup.Item key={job.id}>
                        <strong>{job.jobTitle}</strong> at {job.company}
                        <br />
                        <small className="text-muted">{job.reason}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">No recommendations available.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Profile Completion & Tips */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="shadow-sm border-0 mb-3">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>Profile Completion</h6>
              </Card.Header>
              <Card.Body>
                <ProgressBar now={dashboardData.profileCompleteness} label={`${dashboardData.profileCompleteness}%`} variant="primary" style={{ height: "25px" }} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white p-3">
                <h6 className="mb-0 fw-bold" style={{ color: primaryColor }}>Dashboard Tips & Notifications</h6>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {dashboardData.tips.map((tip, idx) => (
                    <ListGroup.Item key={idx} className="py-2">
                      <FaCheckCircle className="me-2 text-success" />
                      {tip}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="text-center mt-3">
                  <Button variant="primary" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                    View All Notifications
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default JobSeekerDashboard;
