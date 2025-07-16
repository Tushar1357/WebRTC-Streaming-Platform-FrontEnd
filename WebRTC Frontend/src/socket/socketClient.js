import socket from "./socket";

export const sendSocketMessage = (action, data) => {
  socket.emit("sfu-message", { action, data });
};

let isProducerListenerRegistered = false;
let isConsumerListenerRegistered = false;

const producerHandlers = new Map();
const consumerHandlers = new Map();

export const recvSocketMessage = (role, handlers) => {
  const handlerMap = role === "producer" ? producerHandlers : consumerHandlers;

  for (const key of Object.keys(handlers)) {
    handlerMap.set(key, handlers[key]);
  }


  if (role === "producer" && !isProducerListenerRegistered) {
    socket.on("sfu-message", (msg) => {
      const handler = producerHandlers.get(msg.action);
      if (handler) handler(msg.data);
    });
    isProducerListenerRegistered = true;
  }

  if (role === "consumer" && !isConsumerListenerRegistered) {
    socket.on("sfu-message", (msg) => {
      const handler = consumerHandlers.get(msg.action);
      console.log(msg.action)
      if (handler) handler(msg.data);
    });
    isConsumerListenerRegistered = true;
  }

  socket.on("sfu-error", (error) => {
    console.error("SFU Error:", error);
  });
};

