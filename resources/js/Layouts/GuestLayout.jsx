import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Container, Row, Col } from "react-bootstrap";

export default function GuestLayout({ children }) {
    return (
        <div className="gradient-bg min-vh-100 d-flex align-items-center justify-content-center">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <div className="glass p-4 p-md-5 rounded-4">
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
