import { IncomingMessage, ServerResponse } from 'http';
import { parseBody, isValidUUID } from '../models/parse';
import { IUser, users } from '../models/types';

export const updateUser = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
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

  try {
    const updatedUserData = await parseBody(req);

    const updatedUser: IUser = {
      id: userId,
      username: updatedUserData.username,
      age: updatedUserData.age,
      hobbies: updatedUserData.hobbies,
    };

    users[userIndex] = updatedUser;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(updatedUser));
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: `Invalid JSON, ${error}` }));
  }
};
