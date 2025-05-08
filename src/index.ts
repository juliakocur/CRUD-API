import http, { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from './controllers/users';
import dotenv from 'dotenv';
import { parse } from 'url';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url || '', true);
  const { pathname: url } = parsedUrl;

  if (req.method === 'GET' && url === '/api/users') {
    return getAllUsers(req, res);
  }

  const userId = url?.match(/^\/api\/users\/([0-9a-fA-F-]{36})$/);
    if (req.method === 'GET' && userId) {
    const id = userId[1];
    return getUserById(req, res, id);
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
