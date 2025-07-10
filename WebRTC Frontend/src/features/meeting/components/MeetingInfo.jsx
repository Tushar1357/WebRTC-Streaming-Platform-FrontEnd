import React from "react";


const MeetingInfo = ({ title, description }) => {
  return (
    <div className="meeting-info-container bg-white shadow-sm rounded p-4 mb-3">
      <h2 className="meeting-title text-dark fw-bold mb-2">{title}</h2>
      <p className="meeting-description text-secondary mb-0">{description}</p>
    </div>
  );
};

export default MeetingInfo;
