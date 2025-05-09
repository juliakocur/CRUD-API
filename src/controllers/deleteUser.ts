import { IncomingMessage, ServerResponse } from 'http';
import { isValidUUID } from '../models/parse';
import { users } from '../models/types';

export const deleteUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!isValidUUID(userId)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Invalid userId, should be a valid UUID' }));
    return;
  }

  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  users.splice(userIndex, 1);

  res.statusCode = 204;
  res.end();
};
