import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../models/types';
import { validate as validUUID } from 'uuid';

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
};

export const getUserById = (req: IncomingMessage, res: ServerResponse, id: string) => {
  if (!validUUID(id)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify(user));
};
