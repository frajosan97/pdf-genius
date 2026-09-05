// Partials/DeleteUserForm.jsx
import { useForm } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`${className} danger-zone`}>
            <header className="profile-section-header">
                <h2>Delete Account</h2>
                <p>
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button className="delete-btn" onClick={confirmUserDeletion}>
                <FaTrash className="me-2" />
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onHide={closeModal} centered>
                <Modal.Header
                    closeButton
                    className="modal-header-custom"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <Modal.Title className="text-primary-color">
                        <FaExclamationTriangle className="text-coral me-2" />
                        Delete Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="delete-modal-body">
                    <Alert variant="danger" className="delete-warning">
                        <FaExclamationTriangle className="me-2" />
                        Are you sure you want to delete your account? This
                        action cannot be undone.
                    </Alert>

                    <p className="delete-instruction">
                        Please enter your password to confirm you would like to
                        permanently delete your account.
                    </p>

                    <Form onSubmit={deleteUser}>
                        <Form.Group className="mb-3">
                            <Form.Label className="form-label-custom">
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordInput}
                                className="form-control-custom"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter your password"
                                required
                                autoFocus
                            />
                            {errors.password && (
                                <div className="text-danger mt-1 small">
                                    {errors.password}
                                </div>
                            )}
                        </Form.Group>

                        <div className="modal-actions">
                            <Button
                                variant="secondary"
                                className="cancel-btn"
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="confirm-delete-btn"
                                disabled={processing}
                            >
                                {processing ? "Deleting..." : "Delete Account"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    );
}
