import React, { useEffect } from "react";
import ControlBar from "../components/ControlBar";
import "./index.css";
import MeetingInfo from "../components/MeetingInfo";
import Video from "../components/Video";
import { useParams } from "react-router";
import { getMeetInfo } from "../../../services/meet/getMeetInfo";
import { useDispatch, useSelector } from "react-redux";
import { currentMeetActions } from "../../../store/currentmeetslice";
import { toast } from "react-toastify";

const participants = ["You", "Alice", "Bob", "Charlie"];

const MeetingPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { currentMeetInfo } = useSelector((state) => state?.currentMeet);

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
  }, [dispatch]);

  const handleLeave = () => {
    console.log("Leaving meeting...");
  };

  if (!currentMeetInfo.title) return <h1>Invalid Stream Key</h1>;
  return (
    <div className="meeting-page d-flex flex-column min-vh-100 dark-color">
      <header className="p-3 border-bottom">
        <MeetingInfo
          title={currentMeetInfo.title}
          description={
            currentMeetInfo.description
              ? currentMeetInfo.description
              : "(No description)"
          }
        />
      </header>

      <main className="flex-grow-1 px-3 py-2">
        <div className="row g-3">
          {participants.map((name, idx) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
              <Video name={name} />
            </div>
          ))}
        </div>
      </main>

      <footer className="border-top">
        <ControlBar onLeave={handleLeave} />
      </footer>
    </div>
  );
};

export default MeetingPage;
