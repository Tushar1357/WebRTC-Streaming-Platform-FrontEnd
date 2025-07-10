import CreateMeetModal from "../components/CreateMeetModal";
import JoinMeetModal from "../components/JoinMeetModal";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PreviousMeeting from "../components/PreviousMeeting";


const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between flex-wrap align-items-center">
        <h2 className="text-dark fw-bold fs-1">Dashboard</h2>

        <div>
        <Button
          variant="dark"
          className="p-3 rounded-pill"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Meeting
        </Button>

        <Button
          variant="outline-dark"
          className="p-3 mx-3 rounded-pill"
          onClick={() => setShowJoinModal(true)}
        >
          Join Meeting
        </Button>
        </div>
      </div>

      <hr />

      <PreviousMeeting />

      <CreateMeetModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
      <JoinMeetModal
        show={showJoinModal}
        onHide={() => setShowJoinModal(false)}
      />
    </div>
  );
};

export default Dashboard;
