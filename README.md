# CRUD API

A simple CRUD (Create, Read, Update, Delete) API for managing users, built with TypeScript and Node.js.

## START
### Clone the project from repository
```bash
git clone https://github.com/juliakocur/CRUD-API.git
```

### Check current version of node
```bash
node -v
```

If node is not according to technical requirements, apply correct version
```bash
nvm use 22.9.0
```
### Install dependencies
```bash
npm i
```
### Rename .env.example 
```bash
mv .env.example .env
```

## USAGE
### Development Mode
- To run the application in development mode with hot-reloading:
   ```sh
   npm run start:dev
### Production Mode
- To run the application in production mode:
   ```sh
   npm run start:prod
### Multi-Instance Mode
- To run the application with multiple instances using the Node.js `Cluster` API:
    ```sh
    npm run start:multi

## Using the API
### Endpoints
- GET `/api/users` - Get all users
- GET `/api/users/{userId}` - Get a user by ID
- POST `/api/users` - Create a new user
- PUT `/api/users/{userId}` - Update an existing user
- DELETE `/api/users/{userId}` - Delete an existing user

### Response Codes
 - 200 OK - Successful operation
 - 201 Created - User successfully created
 - 204 No Content - User successfully deleted
 - 400 Bad Request - Invalid user ID or data
 - 404 Not Found - User not found

## Testing
To run the tests:
    `npm run test`

## Technology Stack

 - Node.js - JavaScript runtime for building the API.
 - TypeScript - For static typing and modern JavaScript features.
 - webpack - Module bundler for building the project.
 