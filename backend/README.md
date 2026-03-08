## Overview

This is the backend API for the Movie Compare App. It exposes endpoints to:

- Search movies via OMDb
- Fetch a movie by IMDb ID
- Compare 2–5 movies and persist comparison history
- Retrieve recent comparisons

The server is built with Koa and uses Sequelize + MySQL for persistence.

## Project structure

```text
backend/
  src/
    config/                 # DB configuration (Sequelize)
    controllers/            # Request handlers
    middleware/             # Error handler, rate limiter
    models/                 # Sequelize models
    repositories/           # DB access layer
    routes/                 # API routes
    services/               # OMDb service wrappers
    utils/                  # Logger, cache, http client, comparison utils
    main.js                 # Koa app (middleware + routes)
    server.js               # Bootstraps DB + starts HTTP server
  tests/
    unit/                   # Unit tests (controllers/services/utils/repos)
    integration/            # Integration tests (HTTP endpoints)
  jest.config.js
  package.json
  yarn.lock
```

## Tech stack

- **Runtime**: Node.js (ES Modules)
- **Web framework**: Koa (`koa`, `@koa/router`)
- **Security & middleware**: `koa-helmet`, `helmet`, `@koa/cors`, `koa-bodyparser`
- **Rate limiting**: `koa-ratelimit` (memory driver)
- **DB / ORM**: MySQL + Sequelize (`mysql2`, `sequelize`)
- **HTTP client**: Axios
- **Caching**: `node-cache` (in-memory)
- **Logging**: Pino (`pino`, `koa-pino-logger`, `pino-pretty`)
- **Testing**: Jest + Supertest
- **Tooling**: ESLint, Prettier, Nodemon

## Set up project configuration

### 1) Install dependencies

```bash
yarn install
```

### 2) Environment variables

Create a `.env` file in `backend/` with at least:

```bash
# Server
PORT=3000

# OMDb
OMDB_BASE_URL=https://www.omdbapi.com
OMDB_API_KEY=YOUR_KEY_HERE

# Database (MySQL)
DB_NAME=movie_compare
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
```

### 3) Run the server

Development:

```bash
yarn dev
```

Production:

```bash
yarn start
```

Notes:

- Ensure **MySQL is running** and the credentials in `.env` are correct.
- On startup, the server authenticates and syncs the Sequelize models.

## Endpoint Docs

Base URL: `http://localhost:${PORT}`

### Health

- **GET** `/api/health`
- **Response 200**

```json
{ "success": true, "message": "API is running" }
```

### Search movies (OMDb)

- **GET** `/api/search`
- **Query params**
  - `s` (required): search string
  - `type` (optional): `movie` | `series` | `episode`
  - `y` (optional): year
  - `page` (optional): must be \(\ge 1\)

Examples:

- `/api/search?s=batman`
- `/api/search?s=batman&page=2`

Errors:

- **400** if `s` is missing
- **400** if `page < 1`
- **404** if OMDb returns no results

### Get a movie by IMDb ID (OMDb)

- **GET** `/api/movie/:imdbId`
- **Path params**
  - `imdbId`: must match `tt` + 7–8 digits (example: `tt0372784`)

Errors:

- **400** invalid IMDb ID format
- **404** movie not found

### Compare movies

- **POST** `/api/compare`
- **Body**

```json
{
  "imdbIds": ["tt0372784", "tt0468569"]
}
```

Rules:

- `imdbIds` is required and must be an array
- Minimum **2** movies, maximum **5**
- IMDb IDs must match `tt` + 7–8 digits
- No duplicate IDs

Responses:

- **200** returns a normalized list of movies + computed comparison summary + `comparedAt` + `movieCount`
- **404** when one or more movies are missing (includes `missing` array)
- **500** on unexpected failures fetching movie data

### Recent comparisons

- **GET** `/api/comparisons/recent`
- **Response 200**
  - When empty: `{ message, data: [] }`
  - When available: `{ message: "Comparisons found", data: [...] }`

## Test Docs

Run all tests:

```bash
yarn test
```

Run unit tests only:

```bash
yarn test:unit
```

Run integration tests only:

```bash
yarn test:integration
```

Coverage:

```bash
yarn test:coverage
```

Notes:

- Tests use Jest with Node environment and ESM (`--experimental-vm-modules`).
- Integration tests exercise the Koa app via Supertest (`app.callback()`), while external calls (OMDb/DB layer) are mocked where needed.
