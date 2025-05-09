import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../models/types';
import { v4 as uuidv4 } from 'uuid';

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      if (
        typeof username !== 'string' ||
        typeof age !== 'number' ||
        !Array.isArray(hobbies)
      ) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Invalid user data' }));
        return;
      }

      const newUser = {
        id: uuidv4(),
        username,
        age,
        hobbies,
      };

      users.push(newUser);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: `Invalid JSON, ${error}` }));
    }
  });
};
