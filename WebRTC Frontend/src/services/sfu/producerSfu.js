import {
  sendSocketMessage,
  recvSocketMessage,
} from "../../socket/socketClient";
import * as mediasoup from "mediasoup-client";
import socket from "../../socket/socket"; 

const producerSfu = async (streamKey) => {
  return new Promise(async (resolve, reject) => {
    socket.connect(); 

    let device;
    let sendTransport;
    let localStream;

    const handlers = {
      rtpCapabilities: async (data) => {
        try {
          device = new mediasoup.Device();
          await device.load({ routerRtpCapabilities: data });

          sendSocketMessage("createSendTransport");
        } catch (err) {
          console.error("Error loading device:", err);
          reject(err);
        }
      },

      sendTransportCreated: async (data) => {
        try {
          localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          sendTransport = device.createSendTransport(data);

          sendTransport.on("connect", ({ dtlsParameters }, callback, errback) => {
            sendSocketMessage("connectSendTransport", dtlsParameters);
            callback();
          });

          sendTransport.on("produce", (params, callback, errback) => {
            sendSocketMessage("produce", {
              streamKey,
              kind: params.kind,
              rtpParameters: params.rtpParameters,
            });

            recvSocketMessage({
              produced: ({ producerId }) => {
                callback({ id: producerId });
                resolve({ localStream });
              },
            });
          });
          
          localStream.getTracks().forEach((track) => {
            sendTransport.produce({track})
          })

        } catch (err) {
          console.error("Error setting up transport or media:", err);
          reject(err);
        }
      },
    };

    recvSocketMessage(handlers);
    sendSocketMessage("getRtpCapabilities");
  });
};

export default producerSfu;
