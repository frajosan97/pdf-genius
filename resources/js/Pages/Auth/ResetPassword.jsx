import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Form, Button } from "react-bootstrap";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Form onSubmit={submit}>
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
                        autoFocus
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
                    />
                    {errors.password_confirmation && (
                        <Form.Control.Feedback type="invalid">
                            {errors.password_confirmation}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        {processing ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
