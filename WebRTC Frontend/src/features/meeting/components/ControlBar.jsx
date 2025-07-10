import React from "react";
import { FaMicrophone, FaVideo, FaPhoneSlash } from "react-icons/fa";


const ControlBar = ({ onLeave }) => {
  return (
    <div className="control-bar">
      <button className="control-btn">
        <FaMicrophone />
      </button>
      <button className="control-btn">
        <FaVideo />
      </button>
      <button className="leave-btn" onClick={onLeave}>
        <FaPhoneSlash />
      </button>
    </div>
  );
};

export default ControlBar;
