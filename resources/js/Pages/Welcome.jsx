// Welcome.jsx
import { Head, Link } from "@inertiajs/react";
import {
    Container,
    Navbar,
    Nav,
    Button,
    Row,
    Col,
    Card,
    Badge,
    ListGroup,
    Modal,
    Form,
    Alert,
} from "react-bootstrap";
import { useState } from "react";
import {
    FaRocket,
    FaCode,
    FaUserCog,
    FaFilePdf,
    FaKey,
    FaShieldAlt,
    FaArrowRight,
    FaCheckCircle,
    FaGem,
    FaStar,
    FaServer,
    FaCloudUploadAlt,
    FaWindowRestore,
    FaRegFilePdf,
    FaClipboardList,
    FaChartLine,
    FaCrown,
    FaBolt,
    FaTwitter,
    FaGithub,
    FaLinkedin,
    FaYoutube,
    FaInstagram,
    FaDiscord,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaClock,
    FaShieldAlt as FaShield,
    FaAward,
    FaUsers,
    FaHeart,
    FaCoffee,
} from "react-icons/fa";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeveloperModal, setShowDeveloperModal] = useState(false);
    const [activeTab, setActiveTab] = useState("developers");

    const pricingPlans = [
        {
            id: "free",
            name: "Free",
            icon: <FaStar className="text-warning" />,
            price: "$0",
            period: "per month",
            pdfs: "50 PDFs",
            features: [
                "Basic API access",
                "50 API calls/month",
                "Community support",
                "Basic templates",
                "Watermarked output",
                "Rate limited",
            ],
            recommended: false,
        },
        {
            id: "starter",
            name: "Starter",
            icon: <FaRocket className="text-primary" />,
            price: "$29",
            period: "per month",
            pdfs: "500 PDFs",
            features: [
                "API access with rate limit",
                "1,000 API calls/month",
                "Standard support",
                "Basic templates",
                "Watermarked output",
            ],
            recommended: false,
        },
        {
            id: "pro",
            name: "Professional",
            icon: <FaGem className="text-warning" />,
            price: "$79",
            period: "per month",
            pdfs: "2,500 PDFs",
            features: [
                "Priority API access",
                "5,000 API calls/month",
                "Priority support",
                "Custom templates",
                "No watermarks",
                "Advanced formatting",
            ],
            recommended: true,
        },
        {
            id: "business",
            name: "Business",
            icon: <FaCrown className="text-info" />,
            price: "$199",
            period: "per month",
            pdfs: "10,000 PDFs",
            features: [
                "Dedicated API access",
                "25,000 API calls/month",
                "24/7 premium support",
                "White-label solution",
                "Bulk processing",
                "Advanced security",
                "SLA guarantee",
            ],
            recommended: false,
        },
    ];

    const userPricing = {
        single: "$2.99",
        bundle: "$19.99",
        bundleCount: "10 PDFs",
    };

    return (
        <>
            <Head title="Welcome" />

            {/* Navigation */}
            <Navbar
                expand="lg"
                className="py-3 px-0 authenticated-nav"
                sticky="top"
            >
                <Container>
                    <Navbar.Brand
                        href="#"
                        className="fw-bold fs-3 text-primary-color"
                    >
                        <FaFilePdf className="me-2 text-coral" />
                        <span className="text-primary-color">PDF</span>
                        <span className="text-coral">Genius</span>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="navbar-toggler-custom"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center gap-2">
                            <Nav.Link
                                href="#features"
                                className="nav-link-custom"
                            >
                                Features
                            </Nav.Link>
                            <Nav.Link
                                href="#pricing"
                                className="nav-link-custom"
                            >
                                Pricing
                            </Nav.Link>
                            <Nav.Link
                                href="#developers"
                                className="nav-link-custom"
                            >
                                Developers
                            </Nav.Link>
                            <Nav.Link href="#demo" className="nav-link-custom">
                                Demo
                            </Nav.Link>
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="text-decoration-none"
                                >
                                    <Button className="btn-primary-custom px-4 py-2">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-decoration-none"
                                    >
                                        <Button
                                            variant="link"
                                            className="nav-link-custom text-decoration-none"
                                        >
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-decoration-none"
                                    >
                                        <Button className="btn-primary-custom">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section className="hero-glow gradient-bg-hero py-5 min-vh-90 d-flex align-items-center">
                <Container className="position-relative z-index-2">
                    <Row className="align-items-center py-5">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <Badge className="badge-glow mb-4 fs-6 py-2 px-4 rounded-pill">
                                <FaBolt className="me-2" /> Automated PDF
                                Generation
                            </Badge>
                            <h1 className="display-2 fw-bold mb-4 lh-1 text-primary-color">
                                Generate{" "}
                                <span className="text-coral text-shadow-coral">
                                    PDFs
                                </span>
                                <br />
                                <span className="fs-1 text-secondary-color">
                                    with Developer-Power
                                </span>
                            </h1>
                            <p className="lead mb-4 text-secondary-color max-w-90">
                                Powerful PDF generation API for developers and a
                                simple interface for users. Generate invoices,
                                reports, certificates, and more in seconds.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <Button
                                    className="btn-primary-custom btn-lg"
                                    onClick={() => setShowModal(true)}
                                >
                                    Try Demo <FaArrowRight className="ms-2" />
                                </Button>
                                <Button
                                    className="btn-outline-custom btn-lg"
                                    href="#developers"
                                >
                                    <FaCode className="me-2" /> Developer API
                                </Button>
                            </div>
                            <div className="mt-5 d-flex gap-4 flex-wrap">
                                <div>
                                    <span className="text-coral fw-bold">
                                        10K+
                                    </span>
                                    <span className="text-muted-color">
                                        {" "}
                                        PDFs generated
                                    </span>
                                </div>
                                <div>
                                    <span className="text-teal fw-bold">
                                        99.9%
                                    </span>
                                    <span className="text-muted-color">
                                        {" "}
                                        Uptime
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gold fw-bold">
                                        4.9★
                                    </span>
                                    <span className="text-muted-color">
                                        {" "}
                                        Developer rating
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <Card className="glass-card p-0 overflow-hidden rounded-4">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="stat-icon bg-coral-light me-3">
                                            <FaCloudUploadAlt className="text-coral" />
                                        </div>
                                        <div>
                                            <h6 className="mb-0 text-primary-color">
                                                Simple API Integration
                                            </h6>
                                            <small className="text-muted-color">
                                                Send data → Get PDF URL → Embed
                                                in iframe
                                            </small>
                                        </div>
                                    </div>
                                    <div className="code-block">
                                        <pre className="mb-0">
                                            <span className="comment">
                                                // POST /api/v1/generate
                                            </span>
                                            <br />
                                            <span className="bracket">{`{`}</span>
                                            <br />
                                            <span className="key">
                                                {" "}
                                                "template"
                                            </span>
                                            :{" "}
                                            <span className="string">
                                                "invoice"
                                            </span>
                                            ,<br />
                                            <span className="key"> "data"</span>
                                            :{" "}
                                            <span className="bracket">{`{`}</span>
                                            <br />
                                            <span className="key">
                                                {" "}
                                                "customer"
                                            </span>
                                            :{" "}
                                            <span className="string">
                                                "Acme Corp"
                                            </span>
                                            ,<br />
                                            <span className="key">
                                                {" "}
                                                "amount"
                                            </span>
                                            :{" "}
                                            <span className="string">
                                                1500.00
                                            </span>
                                            <br />
                                            <span className="bracket">{`}`}</span>
                                            ,<br />
                                            <span className="key">
                                                {" "}
                                                "api_key"
                                            </span>
                                            :{" "}
                                            <span className="string">
                                                "sk_live_xxxxx"
                                            </span>
                                            <br />
                                            <span className="bracket">{`}`}</span>
                                            <br />
                                            <br />
                                            <span className="comment">
                                                // Response
                                            </span>
                                            <br />
                                            <span className="bracket">{`{`}</span>
                                            <br />
                                            <span className="key">
                                                {" "}
                                                "pdf_url"
                                            </span>
                                            :{" "}
                                            <span className="string">
                                                "https://pdfgen.com/result/abc123"
                                            </span>
                                            ,<br />
                                            <span className="key">
                                                {" "}
                                                "expires_in"
                                            </span>
                                            :{" "}
                                            <span className="string">3600</span>
                                            <br />
                                            <span className="bracket">{`}`}</span>
                                        </pre>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-between align-items-center">
                                        <span className="text-secondary-color">
                                            <FaCheckCircle className="text-teal me-2" />
                                            Ready for production
                                        </span>
                                        <span className="text-secondary-color">
                                            <FaShieldAlt className="text-coral me-2" />
                                            Secure & reliable
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section id="features" className="py-5 bg-indigo-900">
                <Container>
                    <div className="text-center mb-5">
                        <Badge className="badge-glow mb-3 px-4 py-2 rounded-pill">
                            Features
                        </Badge>
                        <h2 className="display-5 fw-bold text-primary-color">
                            Why Choose{" "}
                            <span className="text-coral">PDFGenius</span>
                        </h2>
                        <p className="text-secondary-color">
                            Everything you need to generate PDFs at scale
                        </p>
                    </div>
                    <Row className="g-4">
                        <Col md={4}>
                            <Card className="glass-card h-100 p-4 rounded-4">
                                <div className="feature-icon">
                                    <FaServer />
                                </div>
                                <h5 className="text-primary-color">
                                    RESTful API
                                </h5>
                                <p className="text-secondary-color">
                                    Simple and well-documented API endpoints for
                                    seamless integration with any tech stack.
                                </p>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="glass-card h-100 p-4 rounded-4">
                                <div className="feature-icon">
                                    <FaWindowRestore />
                                </div>
                                <h5 className="text-primary-color">
                                    iFrame Integration
                                </h5>
                                <p className="text-secondary-color">
                                    Get a URL to embed the generated PDF
                                    directly in your application's iframe.
                                </p>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="glass-card h-100 p-4 rounded-4">
                                <div className="feature-icon">
                                    <FaKey />
                                </div>
                                <h5 className="text-primary-color">
                                    API Keys & Tokens
                                </h5>
                                <p className="text-secondary-color">
                                    Generate secure API keys and tokens for
                                    authentication and rate limiting.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Developer/User Toggle Section */}
            <section
                id="developers"
                className="py-5"
                style={{
                    background:
                        "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
                }}
            >
                <Container>
                    <div className="text-center mb-5">
                        <Badge className="badge-glow mb-3 px-4 py-2 rounded-pill">
                            Choose Your Path
                        </Badge>
                        <h2 className="display-5 fw-bold text-primary-color">
                            <span className="text-coral">Developers</span> or{" "}
                            <span className="text-teal">Users</span>
                        </h2>
                        <p className="text-secondary-color">
                            Whether you're building apps or need PDFs, we've got
                            you covered.
                        </p>
                        <div
                            className="btn-group mt-3"
                            role="group"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                padding: "4px",
                                borderRadius: "12px",
                            }}
                        >
                            <Button
                                variant={
                                    activeTab === "developers"
                                        ? "primary"
                                        : "outline-primary"
                                }
                                onClick={() => setActiveTab("developers")}
                                className="px-4"
                                style={{
                                    borderRadius: "8px",
                                    border: "none",
                                    background:
                                        activeTab === "developers"
                                            ? "linear-gradient(135deg, #ff6b6b, #e55a5a)"
                                            : "transparent",
                                }}
                            >
                                <FaCode className="me-2" /> Developers
                            </Button>
                            <Button
                                variant={
                                    activeTab === "users"
                                        ? "primary"
                                        : "outline-primary"
                                }
                                onClick={() => setActiveTab("users")}
                                className="px-4"
                                style={{
                                    borderRadius: "8px",
                                    border: "none",
                                    background:
                                        activeTab === "users"
                                            ? "linear-gradient(135deg, #ff6b6b, #e55a5a)"
                                            : "transparent",
                                }}
                            >
                                <FaUserCog className="me-2" /> Users
                            </Button>
                        </div>
                    </div>

                    {activeTab === "developers" ? (
                        <Row>
                            <Col lg={8} className="mx-auto">
                                <Card className="glass-card rounded-4 p-4">
                                    <Card.Body className="p-0">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="stat-icon bg-coral-light me-3">
                                                <FaKey className="text-coral" />
                                            </div>
                                            <h4 className="fw-bold mb-0 text-primary-color">
                                                Developer API Access
                                            </h4>
                                        </div>
                                        <p className="text-secondary-color">
                                            Get your API keys and tokens to
                                            integrate PDF generation into your
                                            applications. Send data from your
                                            app and we'll return a secure URL to
                                            display the PDF in an iframe.
                                        </p>
                                        <Row className="g-3 mt-2">
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaCheckCircle className="text-teal me-2" />
                                                    <span className="text-primary-color">
                                                        Instant API key
                                                        generation
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaCheckCircle className="text-teal me-2" />
                                                    <span className="text-primary-color">
                                                        Token-based
                                                        authentication
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaCheckCircle className="text-teal me-2" />
                                                    <span className="text-primary-color">
                                                        Rate limiting & usage
                                                        tracking
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaCheckCircle className="text-teal me-2" />
                                                    <span className="text-primary-color">
                                                        iFrame embed ready
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="mt-4">
                                            <Button
                                                className="btn-primary-custom"
                                                onClick={() =>
                                                    setShowDeveloperModal(true)
                                                }
                                            >
                                                <FaKey className="me-2" /> Get
                                                Your API Keys
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col lg={8} className="mx-auto">
                                <Card className="glass-card rounded-4 p-4">
                                    <Card.Body className="p-0">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="stat-icon bg-teal-light me-3">
                                                <FaUserCog className="text-teal" />
                                            </div>
                                            <h4 className="fw-bold mb-0 text-primary-color">
                                                Simple User Interface
                                            </h4>
                                        </div>
                                        <p className="text-secondary-color">
                                            Generate professional PDFs without
                                            any coding. Upload your data, choose
                                            a template, and download your PDF
                                            instantly.
                                        </p>
                                        <Row className="g-3 mt-2">
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaRegFilePdf className="text-coral me-2" />
                                                    <span className="text-primary-color">
                                                        50+ professional
                                                        templates
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaClipboardList className="text-teal me-2" />
                                                    <span className="text-primary-color">
                                                        Bulk generation
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaChartLine className="text-gold me-2" />
                                                    <span className="text-primary-color">
                                                        Analytics & tracking
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="p-3 rounded border border-glass bg-glass">
                                                    <FaCloudUploadAlt className="text-coral me-2" />
                                                    <span className="text-primary-color">
                                                        Cloud storage
                                                        integration
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="mt-4">
                                            <Button
                                                className="btn-primary-custom"
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
                                            >
                                                <FaFilePdf className="me-2" />{" "}
                                                Start Generating
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-5 bg-indigo-900">
                <Container>
                    <div className="text-center mb-5">
                        <Badge className="badge-glow mb-3 px-4 py-2 rounded-pill">
                            Pricing
                        </Badge>
                        <h2 className="display-5 fw-bold text-primary-color">
                            Simple, Transparent{" "}
                            <span className="text-coral">Pricing</span>
                        </h2>
                        <p className="text-secondary-color">
                            Choose the plan that fits your needs. All plans
                            include API access.
                        </p>
                    </div>

                    {activeTab === "developers" ? (
                        <Row className="g-4 justify-content-center">
                            {pricingPlans.map((plan) => (
                                <Col lg={3} md={6} key={plan.id}>
                                    <div
                                        className={`pricing-card ${plan.recommended ? "recommended" : ""} ${plan.id === "free" ? "free-tier" : ""}`}
                                    >
                                        <div className="text-center">
                                            <div
                                                className="fs-1 mb-2"
                                                style={{
                                                    color:
                                                        plan.id === "free"
                                                            ? "#4ecdc4"
                                                            : "#ff6b6b",
                                                }}
                                            >
                                                {plan.icon}
                                            </div>
                                            <h5 className="text-primary-color">
                                                {plan.name}
                                            </h5>
                                            <div
                                                className="display-5 fw-bold"
                                                style={{
                                                    color:
                                                        plan.id === "free"
                                                            ? "#4ecdc4"
                                                            : "#ff6b6b",
                                                }}
                                            >
                                                {plan.price}
                                            </div>
                                            <div className="text-muted-color">
                                                {plan.period}
                                            </div>
                                            <div className="mt-2 mb-3">
                                                <Badge
                                                    style={{
                                                        background:
                                                            "rgba(255,255,255,0.08)",
                                                        color: "var(--text-secondary)",
                                                        padding: "0.4rem 1rem",
                                                        borderRadius: "20px",
                                                    }}
                                                >
                                                    {plan.pdfs} included
                                                </Badge>
                                            </div>
                                        </div>
                                        <ListGroup
                                            variant="flush"
                                            className="text-start"
                                            style={{
                                                background: "transparent",
                                            }}
                                        >
                                            {plan.features.map(
                                                (feature, idx) => (
                                                    <ListGroup.Item
                                                        key={idx}
                                                        style={{
                                                            background:
                                                                "transparent",
                                                            borderColor:
                                                                "rgba(255,255,255,0.05)",
                                                            color: "var(--text-secondary)",
                                                            padding: "0.6rem 0",
                                                        }}
                                                    >
                                                        <FaCheckCircle
                                                            style={{
                                                                color: "#4ecdc4",
                                                                marginRight:
                                                                    "0.75rem",
                                                                fontSize:
                                                                    "0.8rem",
                                                            }}
                                                        />
                                                        {feature}
                                                    </ListGroup.Item>
                                                ),
                                            )}
                                        </ListGroup>
                                        <Button
                                            className={
                                                plan.recommended ||
                                                plan.id === "free"
                                                    ? "btn-primary-custom w-100 mt-3"
                                                    : "btn-outline-custom w-100 mt-3"
                                            }
                                            onClick={() =>
                                                setShowDeveloperModal(true)
                                            }
                                        >
                                            {plan.id === "free"
                                                ? "Start Free"
                                                : "Get Started"}
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <Card className="glass-card rounded-4 p-4">
                                    <Card.Body className="p-0">
                                        <h4 className="fw-bold text-center mb-4 text-primary-color">
                                            User Pricing
                                        </h4>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <div className="p-4 text-center rounded-3 border border-glass bg-glass">
                                                    <div className="display-4 fw-bold text-coral">
                                                        {userPricing.single}
                                                    </div>
                                                    <div className="text-muted-color">
                                                        per PDF
                                                    </div>
                                                    <Button
                                                        className="btn-outline-custom w-100 mt-3"
                                                        onClick={() =>
                                                            setShowModal(true)
                                                        }
                                                        style={{
                                                            color: "var(--text-primary)",
                                                        }}
                                                    >
                                                        Generate Single
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div
                                                    className="p-4 text-center rounded-3"
                                                    style={{
                                                        background:
                                                            "rgba(255,107,107,0.05)",
                                                        border: "1px solid rgba(255,107,107,0.15)",
                                                    }}
                                                >
                                                    <Badge className="coral-gradient mb-3 px-3 py-2 rounded-pill">
                                                        Popular
                                                    </Badge>
                                                    <div className="display-4 fw-bold text-coral">
                                                        {userPricing.bundle}
                                                    </div>
                                                    <div className="text-muted-color">
                                                        for{" "}
                                                        {
                                                            userPricing.bundleCount
                                                        }
                                                    </div>
                                                    <Button
                                                        className="btn-primary-custom w-100 mt-3"
                                                        onClick={() =>
                                                            setShowModal(true)
                                                        }
                                                    >
                                                        Get Bundle
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>

            {/* How It Works */}
            <section
                className="py-5"
                style={{
                    background:
                        "linear-gradient(180deg, #16213e 0%, #1a1a2e 100%)",
                }}
            >
                <Container>
                    <div className="text-center mb-5">
                        <Badge className="badge-glow mb-3 px-4 py-2 rounded-pill">
                            How It Works
                        </Badge>
                        <h2 className="display-5 fw-bold text-primary-color">
                            Get Started in{" "}
                            <span className="text-coral">4 Steps</span>
                        </h2>
                    </div>
                    <Row className="g-4">
                        <Col md={3} className="text-center">
                            <div className="step-number">1</div>
                            <h5 className="text-primary-color">Get API Key</h5>
                            <p className="text-secondary-color">
                                Sign up and generate your unique API key and
                                token.
                            </p>
                        </Col>
                        <Col md={3} className="text-center">
                            <div className="step-number">2</div>
                            <h5 className="text-primary-color">Send Data</h5>
                            <p className="text-secondary-color">
                                Post your data and template choice to our API
                                endpoint.
                            </p>
                        </Col>
                        <Col md={3} className="text-center">
                            <div className="step-number">3</div>
                            <h5 className="text-primary-color">Get URL</h5>
                            <p className="text-secondary-color">
                                We return a secure URL to your generated PDF.
                            </p>
                        </Col>
                        <Col md={3} className="text-center">
                            <div className="step-number">4</div>
                            <h5 className="text-primary-color">Embed & Use</h5>
                            <p className="text-secondary-color">
                                Embed the URL in an iframe or download directly.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section
                className="py-5"
                style={{
                    background:
                        "linear-gradient(135deg, #1a1a2e 0%, #2a1a1a 50%, #1a1a2e 100%)",
                    borderTop: "1px solid rgba(255,107,107,0.08)",
                    borderBottom: "1px solid rgba(255,107,107,0.08)",
                }}
            >
                <Container className="text-center">
                    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                        <Badge className="badge-glow mb-3 px-4 py-2 rounded-pill">
                            Start Today
                        </Badge>
                        <h2 className="display-4 fw-bold mb-3 text-primary-color">
                            Ready to Generate{" "}
                            <span className="text-coral">PDFs</span>?
                        </h2>
                        <p className="lead mb-4 text-secondary-color">
                            Join thousands of developers and users who trust us
                            for their PDF needs.
                        </p>
                        <Button
                            className="btn-primary-custom btn-lg"
                            onClick={() => setShowModal(true)}
                            style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}
                        >
                            Start Free Trial <FaArrowRight className="ms-2" />
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Footer */}
            <footer
                style={{
                    background: "#0d0d1a",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    padding: "4rem 0 1.5rem",
                }}
            >
                <Container>
                    <Row className="g-4">
                        <Col lg={3} md={6}>
                            <h5 className="text-primary-color mb-3">
                                <FaFilePdf className="text-coral me-2" />
                                PDFGenius
                            </h5>
                            <p
                                className="text-muted-color"
                                style={{
                                    fontSize: "0.9rem",
                                    lineHeight: "1.8",
                                }}
                            >
                                Automated PDF generation for the modern web.
                                Empowering developers and users to create
                                professional PDFs with ease.
                            </p>
                            <div className="d-flex gap-2 mt-3 flex-wrap">
                                <a href="#" className="social-icon">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="social-icon">
                                    <FaGithub />
                                </a>
                                <a href="#" className="social-icon">
                                    <FaLinkedin />
                                </a>
                                <a href="#" className="social-icon">
                                    <FaYoutube />
                                </a>
                                <a href="#" className="social-icon">
                                    <FaDiscord />
                                </a>
                                <a href="#" className="social-icon">
                                    <FaInstagram />
                                </a>
                            </div>
                        </Col>

                        <Col lg={2} md={6}>
                            <h6 className="footer-heading">Product</h6>
                            <div className="d-flex flex-column gap-2">
                                <a href="#features" className="footer-link">
                                    Features
                                </a>
                                <a href="#pricing" className="footer-link">
                                    Pricing
                                </a>
                                <a href="#" className="footer-link">
                                    Integrations
                                </a>
                                <a href="#" className="footer-link">
                                    Changelog
                                </a>
                                <a href="#" className="footer-link">
                                    Roadmap
                                </a>
                            </div>
                        </Col>

                        <Col lg={2} md={6}>
                            <h6 className="footer-heading">Developers</h6>
                            <div className="d-flex flex-column gap-2">
                                <a href="#" className="footer-link">
                                    API Reference
                                </a>
                                <a href="#" className="footer-link">
                                    Documentation
                                </a>
                                <a href="#" className="footer-link">
                                    SDKs & Libraries
                                </a>
                                <a href="#" className="footer-link">
                                    API Status
                                </a>
                                <a href="#" className="footer-link">
                                    Open Source
                                </a>
                            </div>
                        </Col>

                        <Col lg={2} md={6}>
                            <h6 className="footer-heading">Company</h6>
                            <div className="d-flex flex-column gap-2">
                                <a href="#" className="footer-link">
                                    About Us
                                </a>
                                <a href="#" className="footer-link">
                                    Careers
                                </a>
                                <a href="#" className="footer-link">
                                    Blog
                                </a>
                                <a href="#" className="footer-link">
                                    Press Kit
                                </a>
                                <a href="#" className="footer-link">
                                    Partners
                                </a>
                            </div>
                        </Col>

                        <Col lg={3} md={6}>
                            <h6 className="footer-heading">Support</h6>
                            <div className="d-flex flex-column gap-2">
                                <a href="#" className="footer-link">
                                    <FaEnvelope className="me-2" />{" "}
                                    support@pdfgenius.com
                                </a>
                                <a href="#" className="footer-link">
                                    <FaPhone className="me-2" /> +1 (800)
                                    555-PDFG
                                </a>
                                <a href="#" className="footer-link">
                                    <FaMapMarkerAlt className="me-2" /> 123 Tech
                                    Street, SF, CA
                                </a>
                                <a href="#" className="footer-link">
                                    <FaClock className="me-2" /> 24/7 Support
                                    Available
                                </a>
                                <a href="#" className="footer-link">
                                    <FaShield className="me-2" /> Security
                                    Center
                                </a>
                            </div>
                        </Col>
                    </Row>

                    <hr className="footer-divider" />

                    <Row className="g-3">
                        <Col md={4}>
                            <div className="d-flex gap-3">
                                <a href="#" className="footer-link">
                                    Terms of Service
                                </a>
                                <a href="#" className="footer-link">
                                    Privacy Policy
                                </a>
                                <a href="#" className="footer-link">
                                    Cookie Policy
                                </a>
                            </div>
                        </Col>
                        <Col md={4} className="text-center">
                            <Badge className="badge-glow me-2">
                                GDPR Compliant
                            </Badge>
                            <Badge className="badge-teal">SOC2 Type II</Badge>
                        </Col>
                        <Col md={4} className="text-md-end">
                            <small className="text-muted-color">
                                © 2026 PDFGenius. All rights reserved.
                            </small>
                            <div className="mt-1">
                                <small className="text-muted-color">
                                    Laravel {laravelVersion} | PHP {phpVersion}
                                </small>
                            </div>
                        </Col>
                    </Row>

                    <Row
                        className="mt-3 pt-3"
                        style={{
                            borderTop: "1px solid rgba(255,255,255,0.03)",
                        }}
                    >
                        <Col className="text-center">
                            <div className="d-flex justify-content-center gap-4 flex-wrap">
                                <span
                                    className="text-muted-color"
                                    style={{ fontSize: "0.8rem" }}
                                >
                                    <FaHeart className="text-coral me-1" />{" "}
                                    Built with love
                                </span>
                                <span
                                    className="text-muted-color"
                                    style={{ fontSize: "0.8rem" }}
                                >
                                    <FaCoffee className="me-1" /> Fueled by code
                                </span>
                                <span
                                    className="text-muted-color"
                                    style={{ fontSize: "0.8rem" }}
                                >
                                    <FaUsers className="me-1" /> 10K+ developers
                                    trust us
                                </span>
                                <span
                                    className="text-muted-color"
                                    style={{ fontSize: "0.8rem" }}
                                >
                                    <FaAward className="me-1" /> #1 PDF
                                    generation API
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {/* Demo Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
            >
                <Modal.Header
                    closeButton
                    className="modal-header-custom"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <Modal.Title className="text-primary-color">
                        <FaFilePdf className="text-coral me-2" />
                        Try PDF Generation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "var(--indigo-900)" }}>
                    <Alert
                        variant="info"
                        style={{
                            background: "rgba(255,107,107,0.08)",
                            border: "1px solid rgba(255,107,107,0.15)",
                            color: "#ff6b6b",
                            borderRadius: "10px",
                        }}
                    >
                        <FaCheckCircle className="me-2" /> This is a demo. Your
                        PDF will be generated in seconds.
                    </Alert>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-secondary-color">
                                Select Template
                            </Form.Label>
                            <Form.Select className="form-select-custom">
                                <option>Invoice</option>
                                <option>Report</option>
                                <option>Certificate</option>
                                <option>Receipt</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-secondary-color">
                                Your Data (JSON)
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                className="form-control-custom"
                                placeholder='{"customer": "John Doe", "amount": 250.00}'
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                className="btn-primary-custom"
                                onClick={() => {
                                    alert(
                                        "PDF generated! Check your dashboard.",
                                    );
                                    setShowModal(false);
                                }}
                            >
                                <FaFilePdf className="me-2" /> Generate Demo PDF
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Developer API Modal */}
            <Modal
                show={showDeveloperModal}
                onHide={() => setShowDeveloperModal(false)}
                centered
            >
                <Modal.Header
                    closeButton
                    className="modal-header-custom"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <Modal.Title className="text-primary-color">
                        <FaKey className="text-coral me-2" />
                        Get Your API Keys
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "var(--indigo-900)" }}>
                    <p className="text-secondary-color">
                        Sign up for a developer account and get instant access
                        to your API keys and tokens.
                    </p>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-secondary-color">
                                Full Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control-custom"
                                placeholder="John Doe"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-secondary-color">
                                Email address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                className="form-control-custom"
                                placeholder="john@example.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-secondary-color">
                                Application Type
                            </Form.Label>
                            <Form.Select className="form-select-custom">
                                <option>Web Application</option>
                                <option>Mobile App</option>
                                <option>Desktop Software</option>
                                <option>Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Button
                            className="btn-primary-custom w-100"
                            onClick={() => {
                                alert(
                                    "API keys sent to your email! Check your dashboard.",
                                );
                                setShowDeveloperModal(false);
                            }}
                        >
                            <FaKey className="me-2" /> Request API Access
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
