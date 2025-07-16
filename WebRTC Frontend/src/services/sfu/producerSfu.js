import {
  sendSocketMessage,
  recvSocketMessage,
} from "../../socket/socketClient";
import * as mediasoup from "mediasoup-client";
import { getMediasoupDevice } from "./mediasoupInstance";

const localStreamMap = new Map();

const getOrCreateLocalStream = async (userId, isVideoProducing, isAudioProducing) => {
  if (!localStreamMap.has(userId)) {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: isVideoProducing,
      audio: isAudioProducing,
    });
    localStreamMap.set(userId, localStream);
  }
  return localStreamMap.get(userId);
};

const producerSfu = async (streamKey, userId, isVideoProducing, isAudioProducing) => {
  const device = await getMediasoupDevice();

  return new Promise(async (resolve, reject) => {
    let sendTransport;
    let localStream;

    const handlers = {
      sendTransportCreated: async (data) => {
        try {

          localStream = await getOrCreateLocalStream(userId, isVideoProducing, isAudioProducing);


          sendTransport = await device.createSendTransport(data);

          sendTransport.on("connect", ({ dtlsParameters }, callback) => {
            sendSocketMessage("connectSendTransport", dtlsParameters);
            callback();
          });

          sendTransport.on("produce", (params, callback) => {
            sendSocketMessage("produce", {
              streamKey,
              kind: params.kind,
              rtpParameters: params.rtpParameters,
            });

            recvSocketMessage("producer", {
              produced: ({ producerId }) => {
                callback({ id: producerId });
              },
            });
          });

          const producePromises = localStream.getTracks().map(async (track) => {
            return await sendTransport.produce({ track });
          });

          await Promise.all(producePromises);
          resolve({ localStream });
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
