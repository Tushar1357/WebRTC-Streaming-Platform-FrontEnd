import {
  recvSocketMessage,
  sendSocketMessage,
} from "../../socket/socketClient";
import { getMediasoupDevice } from "./mediasoupInstance";

const consumerSfu = async (streamKey, onNewStream) => {
  let recvTransport;
  const device = await getMediasoupDevice();
  const userStreams = new Map();

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

          let stream;
          const userId = data.userId;

          if (userStreams.has(userId)) {
            stream = userStreams.get(userId);
          } else {
            stream = new MediaStream();
            userStreams.set(userId, stream);
          }

          stream.addTrack(consumer.track);


          if (stream.getTracks().length === 1) {
            onNewStream(userId, stream);
          }

          resolve(userId);
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
