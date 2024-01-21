import { MathPyramidModelData } from '../math-pyramid/MathPyramidFactory';
import { MathPyramidServer } from './math-pyramid-server';
import { MathPyramidWebsocketClient } from './websocket-test-utils';


const port = '3010';

describe('MathPyramidServer', () => {
    let server: MathPyramidServer;
    let webServerClient: MathPyramidWebsocketClient;

    beforeAll(async () => {
        server = new MathPyramidServer();
        await server.start(port);
        webServerClient = new MathPyramidWebsocketClient();
    });

    afterAll(async () => {
        server.stop();
    });

    test('Server forwards message to all clients', async () => {
        const [client, messages] = await webServerClient.createSocketClient(port);
        const testMessage = '{"action":"message","sender":"username","data":"message"}';

        client.send(testMessage);
        client.close();
        await webServerClient.waitForSocketState(client, client.CLOSED);

        const [responseMessage] = messages;
        expect(responseMessage).toBe(testMessage);
    });

    test('Server returns math pyramid data on start game action', async () => {
        const [client, messages] = await webServerClient.createSocketClient(port);
        const testMessage = '{ "action": "start", "sender":"username", "data": { "size":"3", "maxValue": "100"}}';

        client.send(testMessage);
        client.close();
        await webServerClient.waitForSocketState(client, client.CLOSED);

        expect(messages.length).toBe(1);
        const [responseMessage] = messages;
        const model = JSON.parse(responseMessage) as MathPyramidModelData;
        expect(model.size).toBe(3);
        expect(model.startValues.length).toBe(6);
        expect(model.solutionValues.length).toBe(6);
    });
});