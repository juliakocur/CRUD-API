import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../models/user';

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
};
