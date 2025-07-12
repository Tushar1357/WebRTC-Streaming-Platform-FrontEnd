import { useEffect } from "react";
import consumerSfu from "../services/sfu/consumerSfu";
import { recvSocketMessage } from "../socket/socketClient";

const useConsumer = (meetingId, onNewStream, isProducing) => {
  useEffect(() => {
    if (isProducing && meetingId) {
      consumerSfu(meetingId, onNewStream);
    }

  }, [meetingId, isProducing, onNewStream]);
};

export default useConsumer;
