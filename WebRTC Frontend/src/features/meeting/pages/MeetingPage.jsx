import React, { useEffect, useRef, useState } from "react";
import ControlBar from "../components/ControlBar";
import "./index.css";
import MeetingInfo from "../components/MeetingInfo";
import { useParams } from "react-router";
import { getMeetInfo } from "../../../services/meet/getMeetInfo";
import { useDispatch, useSelector } from "react-redux";
import { currentMeetActions } from "../../../store/currentmeetslice";
import { toast } from "react-toastify";
import useProducer from "../../../hooks/useProducer";
import useConsumer from "../../../hooks/useConsumer";

const MeetingPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [remoteStreams, setRemoteStreams] = useState([]);

  const [isProducing, setIsProducing] = useState(false);
  const localStream = useProducer(params.meetingId, isProducing);

  useConsumer(
    params.meetingId,
    (newStream) => {
      setRemoteStreams((prev) => [...prev, newStream]);
    },
    !isProducing
  );

  const { currentMeetInfo, loading } = useSelector(
    (state) => state?.currentMeet
  );

  const handleToggleVideo = () => {
    setIsProducing((prev) => !prev);
  };

  const handleLeave = () => {
    console.log("Leaving meeting...");
  };

  useEffect(() => {
    const fetchStreamInfo = async () => {
      try {
        const response = await getMeetInfo({ streamKey: params?.meetingId });
        if (response.status) {
          dispatch(
            currentMeetActions.updateCurrentMeet(response.data.streamDetails)
          );
        } else {
          toast.error(`Error while getting stream info. ${response.message}`);
        }
      } catch (error) {
        toast.error("There was some internal error. Please try again.");
      }
    };
    fetchStreamInfo();
  }, [dispatch, params?.meetingId]);

  if (loading)
    return <div className="text-center mt-5">Loading meeting...</div>;

  if (!currentMeetInfo?.title) {
    return (
      <div className="text-center mt-5 text-danger">
        <h2>Invalid or Expired Meeting Link</h2>
        <p>Please check your invite link and try again.</p>
      </div>
    );
  }

  return (
    <div className="meeting-page d-flex flex-column min-vh-100 dark-color">
      <header className="p-3 border-bottom">
        <MeetingInfo
          title={currentMeetInfo.title}
          description={currentMeetInfo.description || "(No description)"}
        />
      </header>

      <main className="flex-grow-1 px-3 py-2 mb-5">
        <div className="row g-3">
          {isProducing && localStream && (
            <video
              width={100}
              height={400}
              ref={(video) => {
                if (video) video.srcObject = localStream;
              }}
              autoPlay
              muted
              playsInline
              className="rounded bg-dark"
            />
          )}

          {remoteStreams.map((stream, idx) => (
            <video
              key={idx}
              autoPlay
              playsInline
              ref={(el) => {
                if (el && stream) el.srcObject = stream;
              }}
              muted={false}
              className="rounded bg-dark"
              width={300}
              height={200}
            />
          ))}
        </div>
      </main>

      <footer className="border-top mt-5">
        <ControlBar
          onLeave={handleLeave}
          handleIsProducing={handleToggleVideo}
          isProducing={isProducing}
        />
      </footer>
    </div>
  );
};

export default MeetingPage;
