// Partials/UpdatePasswordForm.jsx
import { useForm } from "@inertiajs/react";
import { Form, Button } from "react-bootstrap";
import { FaKey, FaCheckCircle } from "react-icons/fa";
import { useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="profile-section-header">
                <h2>Update Password</h2>
                <p>
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <Form onSubmit={updatePassword} className="profile-form">
                <Form.Group className="form-group">
                    <Form.Label className="form-label-custom">
                        Current Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        ref={currentPasswordInput}
                        className="form-control-custom"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        required
                        autoComplete="current-password"
                        placeholder="Enter current password"
                    />
                    {errors.current_password && (
                        <div className="text-danger mt-1 small">
                            {errors.current_password}
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label className="form-label-custom">
                        New Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        ref={passwordInput}
                        className="form-control-custom"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        autoComplete="new-password"
                        placeholder="Enter new password"
                    />
                    {errors.password && (
                        <div className="text-danger mt-1 small">
                            {errors.password}
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label className="form-label-custom">
                        Confirm New Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        className="form-control-custom"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                    />
                    {errors.password_confirmation && (
                        <div className="text-danger mt-1 small">
                            {errors.password_confirmation}
                        </div>
                    )}
                </Form.Group>

                <div className="save-button-group">
                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        <FaKey className="me-2" />
                        {processing ? "Updating..." : "Update Password"}
                    </Button>

                    {recentlySuccessful && (
                        <span className="save-success">
                            <FaCheckCircle className="me-1" />
                            Password updated.
                        </span>
                    )}
                </div>
            </Form>
        </section>
    );
}
