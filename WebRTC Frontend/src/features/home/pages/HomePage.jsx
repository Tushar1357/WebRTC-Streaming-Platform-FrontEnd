import React from "react";

const HomePage = () => {
  return (
    <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-dark">Premium Video Conferencing</h1>
        <p className="fw-semibold text-secondary">
          High quality video calls for your meetings
        </p>
      </div>
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <button className="btn btn-dark px-4 py-2">New Meeting</button>
        <button className="btn btn-dark px-4 py-2">Join Meeting</button>
      </div>
    </div>
  );
};

export default HomePage;
