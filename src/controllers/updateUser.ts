import { IncomingMessage, ServerResponse } from 'http';
import { parseBody, isValidUUID } from '../models/parse';
import { IUser } from '../models/user';

const users: Record<string, IUser> = {};

export const updateUser = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!isValidUUID(userId)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Invalid userId, should be a valid UUID' }));
    return;
  }

  if (!users[userId]) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  try {
    const updatedUser = await parseBody(req);
    const response = { ...updatedUser, id: userId };
    users[userId] = updatedUser;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: `Invalid JSON, ${error}` }));
  }
};
