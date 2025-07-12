import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings } from "../../../services/meet/getMeetings";
import { meetingAction } from "../../../store/meetingSlice";
import MeetingCard from "./MeetingCard";

const PreviousMeeting = () => {
  const dispatch = useDispatch();

  const { meetingList } = useSelector((state) => state?.meeting);
  console.log(meetingList);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getMeetings();
        if (response.status) {
          const meetings = response.data.streamDetails;
          await dispatch(meetingAction.updateMeetings(meetings));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(
          "There was some internal error. Failed to fetch previous meetings."
        );
      }
    };

    if (!meetingList || meetingList.length === 0) {
      fetchMeetings();
    }
  }, [dispatch]);
  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-dark fw-bold fs-3">Your Previous Meetings</h3>
      <div className="container d-flex flex-wrap justfy-content-between">
        {meetingList.length === 0 ? (
          <p className="text-muted">No previous meetings found.</p>
        ) : (
          meetingList.map((meeting, index) => (
            <MeetingCard
              key={index}
              title={meeting.title}
              description={meeting.description}
              streamKey={meeting.streamKey}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PreviousMeeting;
