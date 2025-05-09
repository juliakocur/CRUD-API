import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { userRouter } from './routes/router';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    if (!userRouter(req, res)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Not found' }));
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: `Server error: ${(error as Error).message}` }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
