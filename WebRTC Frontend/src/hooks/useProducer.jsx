import { useState,useEffect } from "react";
import producerSfu from "../services/sfu/producerSfu";


const useProducer = (meetingId, isProducing) => {
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    const connectProducer = async () => {
      const { localStream } = await producerSfu(meetingId);
      console.log(localStream)
      setLocalStream(localStream);
    };

    if (meetingId && isProducing) connectProducer();
  }, [meetingId, isProducing]);

  return localStream;
};

export default useProducer;
