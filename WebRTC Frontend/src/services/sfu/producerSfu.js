import {
  sendSocketMessage,
  recvSocketMessage,
} from "../../socket/socketClient";
import * as mediasoup from "mediasoup-client";
import { getMediasoupDevice } from "./mediasoupInstance";

const producerSfu = async (streamKey) => {
  const device = await getMediasoupDevice();

  return new Promise(async (resolve, reject) => {
    let sendTransport;
    let localStream;

    const handlers = {
      sendTransportCreated: async (data) => {
        try {
          localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          sendTransport = await device.createSendTransport(data);

          sendTransport.on(
            "connect",
            ({ dtlsParameters }, callback, errback) => {
              sendSocketMessage("connectSendTransport", dtlsParameters);
              callback();
            }
          );

          sendTransport.on("produce", (params, callback, errback) => {
            console.log(params.kind)
            sendSocketMessage("produce", {
              streamKey,
              kind: params.kind,
              rtpParameters: params.rtpParameters,
            });

            recvSocketMessage("producer", {
              produced: ({ producerId }) => {
                callback({ id: producerId });
                resolve({ localStream });
              },
            });
          });

          localStream.getTracks().forEach(async (track) => {
            await sendTransport.produce({ track });
          });
        } catch (err) {
          console.error("Error setting up transport or media:", err);
          reject(err);
        }
      },
    };

    recvSocketMessage("producer", handlers);
    sendSocketMessage("createSendTransport");
  });
};

export default producerSfu;
