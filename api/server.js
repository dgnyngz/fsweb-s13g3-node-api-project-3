const express = require("express");
const mw = require("./middleware/middleware");
const server = express();
const userRouter = require("./users/users-router");
server.use(express.json());

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use(mw.logger);
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
