import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Form, Button, Alert } from "react-bootstrap";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Alert variant="info" className="mb-4 text-secondary-color">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </Alert>

            <Form onSubmit={submit}>
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

                <div className="d-flex justify-content-end">
                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        {processing ? "Confirming..." : "Confirm"}
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
