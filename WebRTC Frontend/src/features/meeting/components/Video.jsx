import React from "react";


const Video = ({ name }) => {
  return (
    <div className="video-box position-relative bg-dark rounded overflow-hidden">
      <div className="video-placeholder d-flex justify-content-center align-items-center text-white h-100">
        {name}'s Video
      </div>
      <div className="username-label position-absolute bottom-0 start-0 px-3 py-1 text-white fw-semibold bg-opacity">
        {name}
      </div>
    </div>
  );
};

export default Video;
