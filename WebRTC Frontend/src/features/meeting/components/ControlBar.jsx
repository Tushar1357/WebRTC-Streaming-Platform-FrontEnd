import React from "react";
import { FaMicrophone, FaVideo, FaPhoneSlash } from "react-icons/fa";

const ControlBar = ({ onLeave, handleIsProducing, isProducing }) => {
  return (
    <div className="control-bar d-flex justify-content-center gap-4 py-3 bg-dark">
      <button className="btn btn-outline-light rounded-circle">
        <FaMicrophone />
      </button>

      <button
        className={`btn rounded-circle ${
          isProducing ? "btn-success" : "btn-outline-light"
        }`}
        onClick={handleIsProducing}
      >
        <FaVideo />
      </button>

      <button
        className="btn btn-danger rounded-circle"
        onClick={onLeave}
      >
        <FaPhoneSlash />
      </button>
    </div>
  );
};

export default ControlBar;
