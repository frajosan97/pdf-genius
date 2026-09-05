import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Button, Alert } from "react-bootstrap";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-secondary-color">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === "verification-link-sent" && (
                <Alert variant="success" className="mb-4">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </Alert>
            )}

            <Form onSubmit={submit}>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <Button
                        type="submit"
                        className="btn-primary-custom"
                        disabled={processing}
                    >
                        {processing
                            ? "Sending..."
                            : "Resend Verification Email"}
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="btn btn-outline-custom"
                    >
                        Log Out
                    </Link>
                </div>
            </Form>
        </GuestLayout>
    );
}
