import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        className="form-control-custom"
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData("name", e.target.value)}
                        isInvalid={!!errors.name}
                        required
                    />
                    {errors.name && (
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        className="form-control-custom"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        isInvalid={!!errors.email}
                        required
                    />
                    {errors.email && (
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        className="form-control-custom"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        isInvalid={!!errors.password}
                        required
                    />
                    {errors.password && (
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="form-label-custom">
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="form-control-custom"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        isInvalid={!!errors.password_confirmation}
                        required
                    />
                    {errors.password_confirmation && (
                        <Form.Control.Feedback type="invalid">
                            {errors.password_confirmation}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <Link
                        href={route("login")}
                        className="text-coral text-decoration-none hover-opacity-75"
                    >
                        Already registered?
                    </Link>

                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        {processing ? "Registering..." : "Register"}
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
