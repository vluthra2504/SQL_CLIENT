require("custom-env").env(process.env.NODE_ENV || "dev");
const app = require("./app");
const http = require("http");

const PORT = process.env.PORT || 5000;

function onListening() {
  console.log(`Server Running on PORTS ${PORT}`);
}

const server = http.createServer(app);
server.on("listening", onListening);
server.listen(PORT);
