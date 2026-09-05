// AuthenticatedLayout.jsx
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";
import {
    FaFilePdf,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaFileAlt,
    FaChartBar,
    FaUsers,
    FaBell,
    FaCog,
    FaQuestionCircle,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 992;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setShowOffcanvas(!showOffcanvas);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    // Navigation items
    const navItems = [
        { icon: <MdDashboard />, label: "Dashboard", route: "dashboard" },
        // { icon: <FaFileAlt />, label: 'My PDFs', route: 'pdfs.index' },
        // { icon: <FaChartBar />, label: 'Analytics', route: 'analytics' },
        // { icon: <FaUsers />, label: 'Team', route: 'team' },
        // { icon: <FaBell />, label: 'Notifications', route: 'notifications' },
        // { icon: <FaCog />, label: 'Settings', route: 'settings' },
        // { icon: <FaQuestionCircle />, label: 'Help', route: 'help' },
    ];

    const isActiveRoute = (routeName) => {
        return route().current(routeName);
    };

    // Sidebar content (used in both desktop and mobile)
    const SidebarContent = () => (
        <div className="d-flex flex-column h-100">
            {/* Brand */}
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-glass">
                <Link
                    href="/"
                    className="d-flex align-items-center text-decoration-none"
                >
                    <FaFilePdf className="text-coral" size={28} />
                    <span className="ms-2 fw-bold fs-5">
                        <span className="text-primary-color">PDF</span>
                        <span className="text-coral">Genius</span>
                    </span>
                </Link>
                {!isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="btn btn-sm rounded-circle border-0 text-secondary-color"
                        style={{
                            width: "28px",
                            height: "28px",
                            background: "rgba(255, 255, 255, 0.05)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255, 107, 107, 0.15)";
                            e.currentTarget.style.color = "#ff6b6b";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.color = "#a0a0b8";
                        }}
                    >
                        {sidebarOpen ? (
                            <FaChevronLeft size={12} />
                        ) : (
                            <FaChevronRight size={12} />
                        )}
                    </button>
                )}
            </div>

            {/* User Profile */}
            <div
                className={`p-3 border-bottom border-glass d-flex ${!sidebarOpen && !isMobile ? "flex-column align-items-center" : "align-items-center"} gap-2`}
            >
                <div className="user-avatar-large">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                {(sidebarOpen || isMobile) && (
                    <div className="overflow-hidden">
                        <div
                            className="text-primary-color fw-semibold"
                            style={{ fontSize: "0.9rem" }}
                        >
                            {user.name}
                        </div>
                        <div
                            className="text-muted-color"
                            style={{ fontSize: "0.75rem" }}
                        >
                            {user.email}
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-grow-1 p-2">
                {navItems.map((item) => (
                    <Link
                        key={item.route}
                        href={route(item.route)}
                        className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none transition-all ${
                            isActiveRoute(item.route)
                                ? "bg-coral-light text-coral"
                                : "text-secondary-color"
                        }`}
                        style={{
                            marginBottom: "2px",
                            fontSize: "0.9rem",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (!isActiveRoute(item.route)) {
                                e.currentTarget.style.background =
                                    "rgba(255, 255, 255, 0.05)";
                                e.currentTarget.style.color = "#e8e8e8";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActiveRoute(item.route)) {
                                e.currentTarget.style.background =
                                    "transparent";
                                e.currentTarget.style.color = "#a0a0b8";
                            }
                        }}
                    >
                        <span style={{ fontSize: "1.1rem", minWidth: "20px" }}>
                            {item.icon}
                        </span>
                        {(sidebarOpen || isMobile) && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Footer Actions */}
            <div className="p-2 border-top border-glass">
                <Link
                    href={route("profile.edit")}
                    className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none transition-all ${
                        isActiveRoute("profile.edit")
                            ? "bg-coral-light text-coral"
                            : "text-secondary-color"
                    }`}
                    style={{
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                        marginBottom: "2px",
                    }}
                    onMouseEnter={(e) => {
                        if (!isActiveRoute("profile.edit")) {
                            e.currentTarget.style.background =
                                "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.color = "#e8e8e8";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isActiveRoute("profile.edit")) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#a0a0b8";
                        }
                    }}
                >
                    <span style={{ fontSize: "1.1rem", minWidth: "20px" }}>
                        <FaUser />
                    </span>
                    {(sidebarOpen || isMobile) && <span>Profile</span>}
                </Link>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-coral w-100 border-0 bg-transparent"
                    style={{
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                            "rgba(255, 107, 107, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                    }}
                >
                    <span style={{ fontSize: "1.1rem", minWidth: "20px" }}>
                        <FaSignOutAlt />
                    </span>
                    {(sidebarOpen || isMobile) && <span>Log Out</span>}
                </Link>
            </div>
        </div>
    );

    return (
        <div className="authenticated-layout">
            {/* Desktop Sidebar */}
            {!isMobile && (
                <div
                    className="position-fixed top-0 start-0 h-100 border-end border-glass"
                    style={{
                        width: sidebarOpen ? "260px" : "70px",
                        zIndex: 1030,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        background: "rgba(26, 26, 46, 0.98)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <SidebarContent />
                </div>
            )}

            {/* Mobile Offcanvas */}
            <Offcanvas
                show={showOffcanvas}
                onHide={() => setShowOffcanvas(false)}
                placement="start"
                className="bg-indigo-900 text-primary-color border-0"
                style={{ width: "280px" }}
            >
                <Offcanvas.Body className="p-0">
                    <SidebarContent />
                </Offcanvas.Body>
            </Offcanvas>

            {/* Main Content */}
            <div
                className="d-flex flex-column"
                style={{
                    marginLeft: isMobile ? "0" : sidebarOpen ? "260px" : "70px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    minHeight: "100vh",
                }}
            >
                {/* Top Navbar */}
                <Navbar className="authenticated-nav py-3" sticky="top">
                    <Container fluid>
                        <div className="d-flex align-items-center gap-3">
                            <button
                                onClick={toggleSidebar}
                                className="navbar-toggler-custom d-flex align-items-center justify-content-center border-0 bg-transparent rounded-3"
                                style={{ width: "38px", height: "38px" }}
                            >
                                <FaBars />
                            </button>
                            {header && (
                                <div className="text-primary-color fw-medium">
                                    {header}
                                </div>
                            )}
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="d-none d-md-flex align-items-center justify-content-center border-0 bg-transparent text-secondary-color rounded-3"
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255, 107, 107, 0.15)";
                                    e.currentTarget.style.color = "#ff6b6b";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
                                    e.currentTarget.style.color = "#a0a0b8";
                                }}
                            >
                                <FaBell />
                            </button>

                            <NavDropdown
                                title={
                                    <div className="user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                }
                                id="user-dropdown"
                                align="end"
                                className="d-lg-none nav-dropdown-custom"
                            >
                                <NavDropdown.Item
                                    as={Link}
                                    href={route("profile.edit")}
                                    className="authenticated-dropdown-item"
                                >
                                    <FaUser className="me-2" /> Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider className="authenticated-dropdown-divider" />
                                <NavDropdown.Item
                                    as={Link}
                                    href={route("logout")}
                                    method="post"
                                    className="authenticated-dropdown-item text-coral"
                                >
                                    <FaSignOutAlt className="me-2" /> Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Container>
                </Navbar>

                {/* Page Content */}
                <main className="flex-grow-1 py-4">
                    <Container fluid>{children}</Container>
                </main>
            </div>
        </div>
    );
}
