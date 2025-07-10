import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const joinMeetingSchema = Yup.object({
  meetingId: Yup.string().required("Meeting ID is required"),
});

const JoinMeetModal = ({ show, onHide }) => {
  const handleJoinMeeting = (values, { resetForm }) => {
    toast.success(`Joining meeting: ${values.meetingId}`);
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Join Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ meetingId: "" }}
          validationSchema={joinMeetingSchema}
          onSubmit={handleJoinMeeting}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Meeting ID</label>
                <Field
                  name="meetingId"
                  className={`form-control ${touched.meetingId && errors.meetingId ? "is-invalid" : ""}`}
                  placeholder="Enter Meeting ID"
                />
                <ErrorMessage name="meetingId" component="div" className="invalid-feedback" />
              </div>
              <Button type="submit" variant="dark" className="w-100 rounded-pill">
                Join Meeting
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default JoinMeetModal;
