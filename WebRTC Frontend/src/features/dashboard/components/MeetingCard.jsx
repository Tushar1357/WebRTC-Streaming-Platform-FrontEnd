import React from "react";

const MeetingCard = ({ title, description }) => {
  return (
    <div className="card shadow-sm w-25 m-2" style={{minWidth: "200px"}}>
      <div className="card-body">
        <h5 className="card-title fw-bold text-dark">{title}</h5>
        <p className="card-text text-muted">{description ? description : "(No description)"}</p>
        <button className="btn btn-outline-dark mt-2">Join Meeting</button>
      </div>
    </div>
  );
};

export default MeetingCard;
