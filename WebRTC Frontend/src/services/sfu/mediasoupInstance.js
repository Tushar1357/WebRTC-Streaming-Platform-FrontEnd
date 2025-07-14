import * as mediasoupClient from "mediasoup-client";
import { sendSocketMessage,recvSocketMessage } from "../../socket/socketClient";

let device;

export const getMediasoupDevice = async () => {
  if (device) return device;

  return new Promise((resolve, reject) => {
    const handlers = {
      "rtpCapabilities": async (data) => {
        try {
          device = new mediasoupClient.Device();
          await device.load({ routerRtpCapabilities: data });
          resolve(device);
        } catch (err) {
          reject(err);
        }
      }
    };

    recvSocketMessage("consumer", handlers);
    sendSocketMessage("getRtpCapabilities");
  });
};
