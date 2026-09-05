// Partials/UpdateProfileInformationForm.jsx
import { useForm, usePage, Link } from "@inertiajs/react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaSave, FaCheckCircle } from "react-icons/fa";

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header className="profile-section-header">
                <h2>Profile Information</h2>
                <p>
                    Update your account's profile information and email address.
                </p>
            </header>

            <Form onSubmit={submit} className="profile-form">
                <Form.Group className="form-group">
                    <Form.Label className="form-label-custom">Name</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control-custom"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                        placeholder="Your full name"
                    />
                    {errors.name && (
                        <div className="text-danger mt-1 small">
                            {errors.name}
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label className="form-label-custom">Email</Form.Label>
                    <Form.Control
                        type="email"
                        className="form-control-custom"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="your@email.com"
                    />
                    {errors.email && (
                        <div className="text-danger mt-1 small">
                            {errors.email}
                        </div>
                    )}
                </Form.Group>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="verification-notice">
                        <p className="text-muted-custom">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="resend-link ms-1"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="verification-success">
                                <FaCheckCircle className="me-1" />A new
                                verification link has been sent to your email
                                address.
                            </div>
                        )}
                    </div>
                )}

                <div className="save-button-group">
                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        <FaSave className="me-2" />
                        {processing ? "Saving..." : "Save"}
                    </Button>

                    {recentlySuccessful && (
                        <span className="save-success">
                            <FaCheckCircle className="me-1" />
                            Saved.
                        </span>
                    )}
                </div>
            </Form>
        </section>
    );
}
