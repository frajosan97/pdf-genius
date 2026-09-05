import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <Alert variant="success" className="mb-4">
                    {status}
                </Alert>
            )}

            <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        className="form-control-custom"
                        autoComplete="username"
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

                <Form.Group className="mb-4">
                    <Form.Label className="form-label-custom">
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        className="form-control-custom"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    {errors.password && (
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Check
                        type="checkbox"
                        id="remember"
                        label="Remember me"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                        className="text-secondary-color"
                    />
                </Form.Group>

                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-coral text-decoration-none hover-opacity-75"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        {processing ? "Logging in..." : "Log in"}
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
