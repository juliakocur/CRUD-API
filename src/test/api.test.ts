import { server } from '../index';
import { IUser } from '../models/types';

let url: string;
let userId: string;

beforeAll((done) => {
  server.listen(0, () => {
    const address = server.address();
    if (typeof address === 'object' && address !== null && 'port' in address) {
      url = `http://localhost:${address.port}`;
      done();
    } else {
      done(new Error('Unable to get server address'));
    }
  });
});

afterAll((done) => {
  server.close(done);
});

test('GET should return an empty array', async () => {
  const result = await fetch(`${url}/api/users`);
  expect(result.status).toBe(200);
  const body = await result.json();
  expect(body).toEqual([]);
});

test('POST should creates user', async () => {
  const newUser: Omit<IUser, 'id'> = {
    username: 'Max',
    age: 30,
    hobbies: ['football', 'gaming'],
  };

  const result = await fetch(`${url}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  expect(result.status).toBe(201);
  const body = await result.json();
  expect(body.username).toBe('Max');
  userId = body.id;
});

test('GET should return created user', async () => {
  const result = await fetch(`${url}/api/users/${userId}`);
  expect(result.status).toBe(200);
  const body = await result.json();
  expect(body.id).toBe(userId);
});

test('PUT should updates user', async () => {
  const updatedUser = {
    username: 'Maxim',
    age: 33,
    hobbies: ['running'],
  };

  const res = await fetch(`${url}/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser),
  });

  expect(res.status).toBe(200);
  const body = await res.json();
  expect(body.username).toBe('Maxim');
});

test('DELETE should deletes user', async () => {
  const result = await fetch(`${url}/api/users/${userId}`, {
    method: 'DELETE',
  });

  expect(result.status).toBe(204);
});

test('GET should return 404 - user not found', async () => {
  const result = await fetch(`${url}/api/users/${userId}`);
  expect(result.status).toBe(404);
});
