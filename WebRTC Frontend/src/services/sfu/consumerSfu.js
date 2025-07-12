import {
  recvSocketMessage,
  sendSocketMessage,
} from "../../socket/socketClient";
import * as mediasoup from "mediasoup-client";

const consumerSfu = (streamKey, onNewStream) => {
  return new Promise((resolve, reject) => {
    let device;
    let recvTransport;

    const handlers = {
      rtpCapabilities: async (data) => {
        try {
          device = new mediasoup.Device();
          await device.load({ routerRtpCapabilities: data });
          sendSocketMessage("createRecvTransport");
        } catch (err) {
          console.error("Device load failed", err);
          reject(err);
        }
      },

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

          onNewStream(stream);
          resolve();
        } catch (err) {
          console.error("Consume failed", err);
        }
      },
    };

    recvSocketMessage(handlers);
    sendSocketMessage("getRtpCapabilities");
  });
};

export default consumerSfu;
