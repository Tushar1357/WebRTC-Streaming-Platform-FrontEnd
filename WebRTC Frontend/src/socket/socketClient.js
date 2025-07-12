import socket from "./socket";

export const sendSocketMessage = (action, data) => {
  socket.emit("sfu-message", {action, data})
}

export const recvSocketMessage = (value) => {

  socket.off('sfu-message')
  socket.off('sfu-error')

  
  socket.on("sfu-message", (msg) => {
    console.log(msg)
    if (value[msg.action]){
      value[msg.action](msg.data)
    }
  })

  socket.on("sfu-error", (error) => {
    console.error("SFU Error:", error);
  });
}