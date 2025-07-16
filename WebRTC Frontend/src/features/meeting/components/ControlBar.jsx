import React from "react";
import { FaMicrophone, FaVideo, FaPhoneSlash } from "react-icons/fa";

const ControlBar = ({
  onLeave,
  handleIsVideoProducing,
  isVideoProducing,
  handleIsAudioProducing,
  isAudioProducing,
}) => {
  return (
    <div className="control-bar d-flex justify-content-center gap-4 py-3 bg-dark">
      <button
        className={`btn rounded-circle ${
          isAudioProducing ? "btn-success" : "btn-outline-light btn-danger"
        }`}
        onClick={handleIsAudioProducing}
      >
        <FaMicrophone />
      </button>

      <button
        className={`btn btn rounded-circle ${
          isVideoProducing ? "btn-success" : "btn-outline-light btn-danger"
        }`}
        onClick={handleIsVideoProducing}
      >
        <FaVideo />
      </button>

      <button className="btn btn-danger rounded-circle" onClick={onLeave}>
        <FaPhoneSlash />
      </button>
    </div>
  );
};

export default ControlBar;
