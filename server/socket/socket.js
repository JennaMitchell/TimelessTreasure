let io;
const { Server } = require("socket.io");
module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket io not initialized!");
    }
    return io;
  },
};
