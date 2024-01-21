import WebSocket from 'ws';

export class MathPyramidWebsocketClient {

    async waitForSocketState(socket: WebSocket, state: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(this.waitForState(resolve, socket, state));
        });
    }

    // Extracted method because I could not access 'this' in Promise -> setTimeout
    waitForState(resolve: (value: void) => void, socket: WebSocket, state: number): () => void {
        return () => {
            if (socket.readyState === state) {
                resolve();
            } else {
                this.waitForSocketState(socket, state).then(resolve);
            }
        };
    }

    async createSocketClient(port: string): Promise<[WebSocket, string[]]> {
        const client = new WebSocket(`ws://localhost:${port}`);
        await this.waitForSocketState(client, client.OPEN);
        const messages: string[] = [];

        client.on('message', (data) => {
            messages.push(data.toString());
        });

        return [client, messages];
    }
}
