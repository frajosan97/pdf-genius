import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Form, Button, Alert } from "react-bootstrap";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-secondary-color">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <Alert variant="success" className="mb-4">
                    {status}
                </Alert>
            )}

            <Form onSubmit={submit}>
                <Form.Group className="mb-4">
                    <Form.Label className="form-label-custom">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        className="form-control-custom"
                        autoFocus
                        onChange={(e) => setData("email", e.target.value)}
                        isInvalid={!!errors.email}
                    />
                    {errors.email && (
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        {processing
                            ? "Sending..."
                            : "Email Password Reset Link"}
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
