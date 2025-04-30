# AuthSystem - Elysia Template

A robust authentication system template built with Elysia and Bun runtime, featuring user registration, authentication, and profile management.

## Features

- 🔐 User Authentication (Login/Register)
- 👤 User Profile Management
- 🎫 JWT Token-based Authentication
- 🔄 Refresh Token Support
- 📚 OpenAPI Documentation
- 🗄️ Prisma ORM Integration

## Prerequisites

- Bun >= 1.0.0
- Node.js >= 16.0.0

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
bun install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Run database migrations:
```bash
bun prisma migrate dev
```

5. Start the development server:
```bash
bun run dev
```

The server will start at http://localhost:3000

## API Documentation

Access the Swagger UI documentation at: http://localhost:3000/swagger

### Available Routes

#### Authentication Routes
- POST `/auth/register` - Register a new user
  - Body: { name, gender, whatsapp, password }
  - Response: Success message with user creation confirmation

- POST `/auth/login` - User login
  - Body: { whatsapp, password }
  - Response: JWT tokens (access and refresh)

#### User Routes
- GET `/user/me` - Get current user profile
  - Authentication: Bearer token required
  - Response: User profile information

#### Protected Routes
All routes under `/user/*` require authentication using a valid JWT token in the Authorization header:
```
Authorization: Bearer your-jwt-token
```

## Development

To start the development server with hot reload:
```bash
bun run dev
```

To run tests:
```bash
bun test
```

## Tech Stack

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- [Elysia](https://elysiajs.com/) - Node.js web framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [JWT](https://jwt.io/) - Authentication tokens
- [SQLite](https://www.sqlite.org/) - Database (can be changed to PostgreSQL/MySQL)

## Project Structure

```
src/
├── config/         # Configuration files
├── domain/         # Business logic and controllers
├── lib/           # Shared libraries and utilities
├── models/        # Data models and schemas
├── plugins/       # Elysia plugins
├── routes/        # Route definitions
└── tests/         # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
