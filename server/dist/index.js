"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const expressWs = require("express-ws");
const path = require("path");
const UserManager_1 = require("./user/UserManager");
const CloseHandler_1 = require("./websocket-handler/CloseHandler");
const ErrorHandler_1 = require("./websocket-handler/ErrorHandler");
const MessageHandler_1 = require("./websocket-handler/MessageHandler");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
var expressWebSocketServer = expressWs((0, express_1.default)());
var server = expressWebSocketServer.app;
const userManager = new UserManager_1.UserManager();
const closeHandler = new CloseHandler_1.CloseHandler(userManager);
const errorHandler = new ErrorHandler_1.ErrorHandler(userManager);
const messageHandler = new MessageHandler_1.MessageHandler(userManager, expressWebSocketServer);
server.use(express_1.default.static(path.resolve(__dirname, '../../app/build')));
server.ws('/', (ws) => {
    const id = (0, uuid_1.v4)();
    console.log(`New connection: ${id} `);
    userManager.addUser(ws, id);
    ws.onmessage = function (rawMessage) {
        messageHandler.handleMessage(ws, rawMessage);
    };
    ws.on('error', (error) => {
        errorHandler.handleError(ws, error);
    });
    ws.on("close", (code) => {
        closeHandler.handleClose(ws, code);
    });
});
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
