import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { userRouter } from './routes/router';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (!userRouter(req, res)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
