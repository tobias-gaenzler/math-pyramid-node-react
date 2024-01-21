import dotenv from 'dotenv';
import { MathPyramidServer } from './websocket-server/math-pyramid-server';


dotenv.config();
const port = process.env.PORT || "3000";
new MathPyramidServer().listen(port);
