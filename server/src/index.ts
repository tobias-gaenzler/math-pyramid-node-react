import { MathPyramidServer } from './websocket-server/math-pyramid-server';


const port = process.env.PORT || '3000';
const server = new MathPyramidServer();
// await is not allowed on top level => use wrapper function
async function startServer(): Promise<void> {
  await server.start(port);
}
startServer();

