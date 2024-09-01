# Library Management System

## Architecture

- **Controllers**: Handle HTTP requests and responses.
- **Models**: Define schemas and interact with MongoDB.
- **Routes**: Define API endpoints.
- **Services**: Contain business logic.
- **Tests**: Ensure functionality and correctness.

## Setup

1. Clone the repository.
2. Install dependencies: `pnpm install`.
3. Set up environment variables in `.env`.
4. Start the server: `pnpm start`.
5. Run tests: `pnpm test`.

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `PORT`: Port to run the server on.
