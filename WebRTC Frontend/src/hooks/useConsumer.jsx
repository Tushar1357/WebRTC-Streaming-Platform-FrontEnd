import { useEffect, useRef } from "react";
import consumerSfu from "../services/sfu/consumerSfu";
import { recvSocketMessage, sendSocketMessage } from "../socket/socketClient";

const useConsumer = (meetingId, onNewStream, isProducing) => {
  const existingUsersRef = useRef(new Set());

  useEffect(() => {
    if (!meetingId || isProducing) return;

    sendSocketMessage("join", { streamKey: meetingId });


    consumerSfu(meetingId, (userId, stream) => {
      // if (!existingUsersRef.current.has(userId)) {
        onNewStream(userId, stream);
        existingUsersRef.current.add(userId);
      // }
    }).catch((err) => console.error("Initial consume error:", err));


    const handlers = {
      new_producer_joined: (data) => {
        const { userId } = data;
        // if (!existingUsersRef.current.has(userId)) {
          consumerSfu(meetingId, (userId, stream) => {
            console.log(userId, stream)
            onNewStream(userId, stream);
            existingUsersRef.current.add(userId);
          }).catch((err) => console.error("Dynamic consume error:", err));
        // }
      },
    };

    recvSocketMessage("consumer", handlers);
  }, [meetingId, isProducing, onNewStream]);
};

export default useConsumer;
