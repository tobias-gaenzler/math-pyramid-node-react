"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// const path = require('path');
// const { v4: uuidv4 } = require("uuid");
// var express = require('express');
// var expressWs = require('express-ws');
// const PORT = process.env.PORT || 3000;
// const users = new Set();
// var expressWs = expressWs(express());
// var app = expressWs.app;
// app.use(express.static(path.resolve(__dirname, '../../app/build')));
// var aWss = expressWs.getWss('/');
// app.ws('/', function (ws, req) {
//   ws.id = uuidv4();
//   const userRef = {
//     ws,
//   };
//   users.add(userRef);
//   console.log(`New connection: ${ws.id} `);
//   ws.onmessage = function (message) {
//     console.log('received: %s', message);
//     const data = JSON.parse(message.data);
//     if (data.action === "username") {
//       userRef.ws.username = data.sender;
//       console.log(`Received username: ${data.sender} ${userRef.ws.id}`);
//     } else if (data.action === "start") {
//       console.log(`Received start event: ${JSON.stringify(data.data)} from ${userRef.ws.id} ${userRef.ws.username}`);
//       aWss.clients.forEach(function (client) {
//         client.send(`{ "size": "3", "solutionValues": [ 1, 2, 3, 4, 5, 6], "startValues": [1, 2, 3, 4, 5, 6] }`);
//       });
//     }
//   };
//   ws.on('error', (error) => {
//     console.error(`Deleting user ${userRef.ws.id}, ${userRef.ws.username} on error ${error}`);
//     users.delete(userRef);
//   });
//   ws.on("close", (code) => {
//     users.delete(userRef);
//     console.log(
//       `User ${ws.username} is leaving the game.id: ${ws.id}, code: ${code}`
//     );
//   });
// });
// app.listen(PORT);
