import express from 'express';
import expressWs from 'express-ws';
import path from 'path';
import ws from 'ws';
import { v4 } from 'uuid';
import { UserManager } from '../user/UserManager';
import { CloseHandler } from '../websocket-handler/CloseHandler';
import { ErrorHandler } from '../websocket-handler/ErrorHandler';
import { MessageHandler } from '../websocket-handler/MessageHandler';
import { IncomingMessage, Server, ServerResponse } from 'node:http';

export class MathPyramidServer {
    private server: expressWs.Application;
    private userManager: UserManager;
    private closeHandler: CloseHandler;
    private errorHandler: ErrorHandler;
    private messageHandler: MessageHandler;
    private httpServer: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;

    constructor() {
        const expressWebSocketServer = expressWs(express());
        this.server = expressWebSocketServer.app;

        this.userManager = new UserManager();
        this.closeHandler = new CloseHandler(this.userManager);
        this.errorHandler = new ErrorHandler(this.userManager);
        this.messageHandler = new MessageHandler(this.userManager, expressWebSocketServer);

        this.serveStaticReactApp();

        this.server.ws('/', (ws: ws) => {
            const id: string = v4();
            console.log(`New connection: ${id} `);
            this.userManager.addUser(ws, id);

            ws.onmessage = (rawMessage: ws.MessageEvent) => {
                this.messageHandler.handleMessage(ws, rawMessage);
            };

            ws.on('error', (error: Error) => {
                this.errorHandler.handleError(ws, error);
            });

            ws.on('close', (code: number) => {
                this.closeHandler.handleClose(ws, code);
            });
        });
    }

    start(port: string): Promise<Server<typeof IncomingMessage, typeof ServerResponse>> {
        return new Promise((resolve) => {
            this.httpServer = this.server.listen(port, () => {
                console.log(`Server is running at http://localhost:${port}`);
            });
            resolve(this.httpServer);
        });
    }
    stop() {
        this.server.removeAllListeners();
        if (this.httpServer) {
            this.httpServer.removeAllListeners();
            this.httpServer.close();
        }
    }

    private serveStaticReactApp() {
        this.server.use(express.static(path.resolve(__dirname, '../../../app/build')));
    }
}