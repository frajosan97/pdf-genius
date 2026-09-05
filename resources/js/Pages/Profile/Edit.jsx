// Edit.jsx - Enhanced with more React Bootstrap
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaUserCog, FaLock, FaTrash, FaShieldAlt } from "react-icons/fa";

export default function Edit({ mustVerifyEmail, status }) {
    const sections = [
        {
            id: "profile",
            icon: FaUserCog,
            iconClass: "coral",
            title: "Profile Information",
            component: UpdateProfileInformationForm,
            props: { mustVerifyEmail, status },
            badge: null,
        },
        {
            id: "password",
            icon: FaLock,
            iconClass: "teal",
            title: "Update Password",
            component: UpdatePasswordForm,
            props: {},
            badge: <Badge className="badge-teal ms-2">Secure</Badge>,
        },
        {
            id: "delete",
            icon: FaTrash,
            iconClass: "gold",
            title: "Delete Account",
            component: DeleteUserForm,
            props: {},
            badge: <Badge className="badge-glow ms-2">Danger</Badge>,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="d-flex align-items-center gap-3 flex-wrap">
                    <h2 className="h4 fw-bold mb-0 text-primary-color">
                        Profile Settings
                    </h2>
                    <Badge className="badge-glow px-3 py-2 rounded-pill">
                        <FaShieldAlt className="me-2" />
                        Protected
                    </Badge>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-4 profile-page">
                <Container fluid>
                    <Row className="g-4 justify-content-center">
                        <Col lg={10} xl={8}>
                            {sections.map((section) => {
                                const Component = section.component;
                                return (
                                    <Card
                                        key={section.id}
                                        className="profile-card mb-4 border-0"
                                    >
                                        <Card.Header className="profile-card-header">
                                            <div
                                                className={`icon-wrapper ${section.iconClass}`}
                                            >
                                                <section.icon />
                                            </div>
                                            <h5 className="fw-bold mb-0 text-primary-color d-flex align-items-center">
                                                {section.title}
                                                {section.badge}
                                            </h5>
                                        </Card.Header>
                                        <Card.Body className="profile-card-body">
                                            <Component {...section.props} />
                                        </Card.Body>
                                    </Card>
                                );
                            })}
                        </Col>
                    </Row>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
