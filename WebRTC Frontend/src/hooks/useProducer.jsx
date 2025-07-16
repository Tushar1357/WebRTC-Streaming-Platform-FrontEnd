import { useState, useEffect } from "react";
import producerSfu from "../services/sfu/producerSfu";


const useProducer = (meetingId, isVideoProducing, isAudioProducing) => {
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const connectProducer = async () => {
      try {
        const userId = localStorage.getItem("userId"); 

        if (!userId) {
          console.error("Missing userId for producer");
          return;
        }

        const { localStream } = await producerSfu(
          meetingId,
          userId,
          isVideoProducing,
          isAudioProducing
        );

        if (isMounted) setLocalStream(localStream);
      } catch (error) {
        console.error("Failed to start producer:", error);
      }
    };

    if (meetingId && (isVideoProducing || isAudioProducing)) {
      connectProducer();
    }

    return () => {
      isMounted = false;
    };
  }, [meetingId, isVideoProducing, isAudioProducing]);

  return localStream;
};

export default useProducer;
