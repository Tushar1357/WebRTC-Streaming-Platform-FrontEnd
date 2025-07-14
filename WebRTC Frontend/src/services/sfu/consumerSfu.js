import {
  recvSocketMessage,
  sendSocketMessage,
} from "../../socket/socketClient";
import * as mediasoup from "mediasoup-client";
import { getMediasoupDevice } from "./mediasoupInstance";

const consumerSfu = async (streamKey, onNewStream) => {
  let recvTransport;

  const device = await getMediasoupDevice();

  return new Promise((resolve, reject) => {
    const handlers = {
      recvTransportCreated: async (data) => {
        try {
          recvTransport = device.createRecvTransport(data);

          recvTransport.on("connect", ({ dtlsParameters }, callback) => {
            sendSocketMessage("connectRecvTransport", dtlsParameters);
            callback();
          });

          sendSocketMessage("consume", {
            streamKey,
            rtpCapabilities: device.rtpCapabilities,
          });
        } catch (err) {
          console.error("Recv transport error", err);
          reject(err);
        }
      },

      consumed: async (data) => {
        try {
          const consumer = await recvTransport.consume({
            id: data.id,
            producerId: data.producerId,
            kind: data.kind,
            rtpParameters: data.rtpParameters,
          });

          const stream = new MediaStream([consumer.track]);
          if (data.kind === "video")
            onNewStream(stream);
          resolve(data.producerId);
        } catch (err) {
          console.error("Consume failed", err);
        }
      },
    };

    recvSocketMessage("consumer", handlers);
    sendSocketMessage("createRecvTransport");
  });
};

export default consumerSfu;
