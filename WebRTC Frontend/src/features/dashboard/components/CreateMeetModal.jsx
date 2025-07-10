import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createMeeting } from "../../../services/meet/createMeeting";
import { getMeetings } from "../../../services/meet/getMeetings";
import { meetingAction } from "../../../store/meetingSlice";
import { useDispatch } from "react-redux";

const createMeetingSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
});

const CreateMeetModal = ({ show, onHide }) => {

  const dispatch = useDispatch();
  const fetchMeetings = async () => {
    try {
      const response = await getMeetings();
      if (response.status) {
        const meetings = response.data.streamDetails;
        await dispatch(meetingAction.updateMeetings(meetings));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        "There was some internal error. Failed to fetch previous meetings."
      );
    }
  };
  const handleCreateMeeting = async (values, { resetForm }) => {
    try {
      const response = await createMeeting(values);
      if (response.status) {
        await fetchMeetings();
        toast.success(response.message);
        onHide();
        resetForm();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("There was some internal error. Please try again");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={createMeetingSchema}
          onSubmit={handleCreateMeeting}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <Field
                  name="title"
                  placeholder="Team Sync"
                  className={`form-control ${
                    touched.title && errors.title ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Weekly sync and updates"
                  className={`form-control ${
                    touched.description && errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <Button
                type="submit"
                variant="dark"
                className="w-100 rounded-pill"
              >
                Create Meeting
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateMeetModal;
