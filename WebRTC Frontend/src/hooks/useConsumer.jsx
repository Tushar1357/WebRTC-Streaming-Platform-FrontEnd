import { useEffect, useState } from "react";
import consumerSfu from "../services/sfu/consumerSfu";
import { recvSocketMessage, sendSocketMessage } from "../socket/socketClient";

const useConsumer = (meetingId, onNewStream, isProducing) => {
  const [existingProducers, setExistingProducers] = useState([]);

  useEffect(() => {
    if (!isProducing && meetingId) {
      sendSocketMessage("join", { streamKey: meetingId });

      consumerSfu(meetingId, onNewStream).then((initialProducerId) => {
        if (initialProducerId && !existingProducers.includes(initialProducerId)) {
          setExistingProducers((prev) => [initialProducerId, ...prev]);
        }
      });

      const handlers = {
        new_producer_joined: (data) => {
          if (!existingProducers.includes(data.producerId)) {
            consumerSfu(meetingId, onNewStream).then(() => {
              setExistingProducers((prev) => [data.producerId, ...prev]);
            });
          }
        },
      };

      recvSocketMessage("consumer", handlers);
    }
  }, [meetingId, isProducing, onNewStream, existingProducers]);
};

export default useConsumer;
