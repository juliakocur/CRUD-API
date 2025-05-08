import { IncomingMessage } from 'http';
import { IUser } from './user';
import { validate as uuidValidate } from 'uuid';

export const parseBody = (req: IncomingMessage): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed: IUser = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        reject(new Error(`Invalid JSON, ${error}`));
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
};

export const isValidUUID = (id: string): boolean => {
  return uuidValidate(id);
};
