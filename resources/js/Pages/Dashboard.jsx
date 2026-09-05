// Dashboard.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
    FaFilePdf,
    FaKey,
    FaChartLine,
    FaUsers,
    FaCrown,
    FaRocket,
    FaGem,
} from "react-icons/fa";

export default function Dashboard({ stats }) {
    const defaultStats = {
        totalGenerations: 1247,
        apiCalls: 3456,
        activeUsers: 89,
        plan: "Pro",
    };

    const planIcons = {
        Free: <FaRocket className="text-teal" />,
        Starter: <FaRocket className="text-primary" />,
        Pro: <FaGem className="text-warning" />,
        Business: <FaCrown className="text-info" />,
    };

    const statsData = stats || defaultStats;

    return (
        <AuthenticatedLayout
            header={
                <div className="d-flex align-items-center gap-3 flex-wrap">
                    <h2 className="h4 fw-bold mb-0 text-primary-color">
                        Dashboard
                    </h2>
                    <Badge className="badge-glow px-3 py-2 rounded-pill">
                        <FaKey className="me-2" /> API Key:
                        sk_live_••••••••••••••••
                    </Badge>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <Container fluid>
                    {/* Stats Row */}
                    <Row className="g-4 mb-4">
                        <Col lg={3} md={6}>
                            <Card className="stat-card h-100 border-0">
                                <Card.Body>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="stat-label">
                                                Total PDFs Generated
                                            </div>
                                            <div className="stat-value">
                                                {statsData.totalGenerations.toLocaleString()}
                                            </div>
                                            <div className="stat-change">
                                                <span className="up">
                                                    ↑ 12.5%
                                                </span>{" "}
                                                from last month
                                            </div>
                                        </div>
                                        <div className="stat-icon bg-coral-light">
                                            <FaFilePdf className="text-coral" />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={3} md={6}>
                            <Card className="stat-card h-100 border-0">
                                <Card.Body>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="stat-label">
                                                API Calls
                                            </div>
                                            <div className="stat-value">
                                                {statsData.apiCalls.toLocaleString()}
                                            </div>
                                            <div className="stat-change">
                                                <span className="up">
                                                    ↑ 8.3%
                                                </span>{" "}
                                                from last month
                                            </div>
                                        </div>
                                        <div className="stat-icon bg-teal-light">
                                            <FaChartLine className="text-teal" />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={3} md={6}>
                            <Card className="stat-card h-100 border-0">
                                <Card.Body>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="stat-label">
                                                Active Users
                                            </div>
                                            <div className="stat-value">
                                                {statsData.activeUsers}
                                            </div>
                                            <div className="stat-change">
                                                <span className="up">
                                                    ↑ 5.2%
                                                </span>{" "}
                                                from last month
                                            </div>
                                        </div>
                                        <div className="stat-icon bg-gold-light">
                                            <FaUsers className="text-gold" />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={3} md={6}>
                            <Card className="stat-card h-100 border-0">
                                <Card.Body>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="stat-label">
                                                Current Plan
                                            </div>
                                            <div className="stat-value">
                                                {statsData.plan}
                                            </div>
                                            <div className="stat-change">
                                                {statsData.plan === "Free"
                                                    ? "50 PDFs/month"
                                                    : statsData.plan ===
                                                        "Starter"
                                                      ? "500 PDFs/month"
                                                      : statsData.plan === "Pro"
                                                        ? "2,500 PDFs/month"
                                                        : "10,000 PDFs/month"}
                                            </div>
                                        </div>
                                        <div
                                            className="stat-icon"
                                            style={{
                                                background:
                                                    "rgba(162,89,255,0.1)",
                                                color: "#a259ff",
                                            }}
                                        >
                                            {planIcons[statsData.plan] || (
                                                <FaRocket />
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Quick Actions */}
                    <Row className="g-3 mb-4">
                        <Col>
                            <h5 className="text-secondary-color mb-3">
                                Quick Actions
                            </h5>
                            <div className="d-flex flex-wrap gap-3">
                                <Button
                                    variant="outline-light"
                                    className="quick-action-btn d-flex flex-column align-items-center justify-content-center"
                                >
                                    <FaFilePdf className="fs-4 mb-2" />
                                    <small>Generate PDF</small>
                                </Button>
                                <Button
                                    variant="outline-light"
                                    className="quick-action-btn d-flex flex-column align-items-center justify-content-center"
                                >
                                    <FaKey className="fs-4 mb-2" />
                                    <small>API Keys</small>
                                </Button>
                                <Button
                                    variant="outline-light"
                                    className="quick-action-btn d-flex flex-column align-items-center justify-content-center"
                                >
                                    <FaChartLine className="fs-4 mb-2" />
                                    <small>Analytics</small>
                                </Button>
                                <Button
                                    variant="outline-light"
                                    className="quick-action-btn d-flex flex-column align-items-center justify-content-center"
                                >
                                    <FaUsers className="fs-4 mb-2" />
                                    <small>Team</small>
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Recent Activity & Usage */}
                    <Row className="g-4">
                        <Col lg={8}>
                            <Card className="stat-card border-0">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="text-primary-color mb-0">
                                            Recent Activity
                                        </h5>
                                        <Button
                                            variant="link"
                                            className="text-decoration-none p-0 text-coral"
                                        >
                                            View All
                                        </Button>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <div className="activity-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="text-primary-color">
                                                    Invoice #INV-2024-001
                                                </span>
                                                <Badge className="badge-glow ms-2">
                                                    Generated
                                                </Badge>
                                            </div>
                                            <small className="text-muted-color">
                                                2 min ago
                                            </small>
                                        </div>
                                        <div className="activity-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="text-primary-color">
                                                    API Key rotation
                                                </span>
                                                <Badge className="badge-teal ms-2">
                                                    Security
                                                </Badge>
                                            </div>
                                            <small className="text-muted-color">
                                                15 min ago
                                            </small>
                                        </div>
                                        <div className="activity-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="text-primary-color">
                                                    Monthly report generated
                                                </span>
                                                <Badge className="badge-glow ms-2">
                                                    Auto
                                                </Badge>
                                            </div>
                                            <small className="text-muted-color">
                                                1 hour ago
                                            </small>
                                        </div>
                                        <div className="activity-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="text-primary-color">
                                                    New API integration
                                                </span>
                                                <Badge
                                                    style={{
                                                        background:
                                                            "rgba(162,89,255,0.15)",
                                                        color: "#a259ff",
                                                        border: "1px solid rgba(162,89,255,0.15)",
                                                    }}
                                                    className="ms-2"
                                                >
                                                    Success
                                                </Badge>
                                            </div>
                                            <small className="text-muted-color">
                                                3 hours ago
                                            </small>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card className="stat-card border-0">
                                <Card.Body>
                                    <h5 className="text-primary-color mb-3">
                                        Usage Overview
                                    </h5>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary-color">
                                                API Usage
                                            </span>
                                            <span className="text-primary-color fw-semibold">
                                                67%
                                            </span>
                                        </div>
                                        <div className="progress-custom">
                                            <div
                                                className="progress-bar-coral"
                                                style={{ width: "67%" }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary-color">
                                                Storage Used
                                            </span>
                                            <span className="text-primary-color fw-semibold">
                                                42%
                                            </span>
                                        </div>
                                        <div className="progress-custom">
                                            <div
                                                className="progress-bar-teal"
                                                style={{ width: "42%" }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary-color">
                                                PDF Credits
                                            </span>
                                            <span className="text-primary-color fw-semibold">
                                                89%
                                            </span>
                                        </div>
                                        <div className="progress-custom">
                                            <div
                                                className="progress-bar-gold"
                                                style={{ width: "89%" }}
                                            ></div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
