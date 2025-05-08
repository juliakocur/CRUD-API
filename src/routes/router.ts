import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from '../controllers/users';
import { createUser } from '../controllers/createUser';
import { parse } from 'url';

export const userRouter = (req: IncomingMessage, res: ServerResponse): boolean => {
  const parsedUrl = parse(req.url || '', true);
  const { pathname: url } = parsedUrl;

  if (req.method === 'GET' && url === '/api/users') {
    getAllUsers(req, res);
    return true;
  }

  const userIdMatch = url?.match(/^\/api\/users\/([0-9a-fA-F-]{36})$/);
  if (req.method === 'GET' && userIdMatch) {
    const id = userIdMatch[1];
    getUserById(req, res, id);
    return true;
  }

  if (req.method === 'POST' && url === '/api/users') {
    createUser(req, res);
    return true;
  }

  return false;
};
