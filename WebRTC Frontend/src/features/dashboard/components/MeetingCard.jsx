import React from "react";
import { useNavigate } from "react-router";

const MeetingCard = ({ title, description,streamKey }) => {
  const navigate = useNavigate();

  const handleJoinMeeting = () => {
    navigate(`/meeting/${streamKey}`)
  }
  return (
    <div className="card shadow-sm w-25 m-2" style={{minWidth: "200px"}}>
      <div className="card-body">
        <h5 className="card-title fw-bold text-dark">{title}</h5>
        <p className="card-text text-muted">{description ? description : "(No description)"}</p>
        <button className="btn btn-outline-dark mt-2" onClick={() => {handleJoinMeeting()}}>Join Meeting</button>
      </div>
    </div>
  );
};

export default MeetingCard;
