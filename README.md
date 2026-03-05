# Movie Comparison App

Build a full-stack application that allows users to search for movies and compare them
side-by-side. The application should fetch data from the OMDB API and present a clear,
visual comparison of movie details.

## Features

- Search movies by title using OMDB API
- View detailed movie metadata
- Compare up to 5 movies side-by-side
- Visualize IMDb rating comparisons
- View recent comparisons
- Responsive UI built with Material UI
- Backend proxy to protect API keys
- Persistent comparison history

## Architecture Overview

![alt text](diagArch.png)

This project follows a monorepo structure with separated frontend and backend applications to maintain clear boundaries and scalability.

```
movie-compare-app/
│
├── backend/           → Node.js + Koa + Sequelize + MySQL
├── frontend/          → React + Zustand + MUI
├── docker-compose.yml → MySQL container for local development
└── README.md          → General documentation
```

### High-Level Architecture

Client → Backend API → OMDB API
Client → Backend API → MySQL Database

### Architectural Decisions

- The frontend does not call OMDB directly.
- The backend acts as a proxy and integration layer.
- The database stores only persistent application data (watchlist).

### Why this architecture?

- Centralized API integration
- Better security (API keys not exposed)
- Easier future scalability (caching, logging, rate limiting)
- Cleaner separation of concerns

## Tech Stack

### Backend

- Node.js
- Koa
- Sequelize (ORM)
- MySQL
- Jest (unit & integration testing)
- ESLint + Prettier

### Frontend

- React (Hooks, ES6)
- Zustand (state management)
- MUI (styling)
- Vitest (unit testing)

### Tooling

- Docker (for MySQL containerized setup)
- Git
- VS Code
- Yarn

## Local Development Setup (From Zero to Running)

> Nothing installed. Nothing configured. Just willingness and coffee.

If you're starting from a completely clean machine, follow this guide step by step.

If you already have Node.js, Git, and Docker installed, you can skip to **Step 5 – Clone and Run the Project.**

### 1. Install Git

Required to clone the repository.

Download and install:

https://git-scm.com/downloads

Verify installation:

```bash
git --version
```

### 2. Install Node.js

This project uses Node.js 18+ (recommended: latest LTS).

Download from:

https://nodejs.org/

Verify installation:

```bash
node --version
npm --version
```

### 3. Install Yarn (Package Manager)

We use Yarn instead of npm for consistency.

Install globally:

```bash
npm install -g yarn
```

Verify:

```bash
yarn --version
```

### 4. Database Setup (Choose One Option)

The backend requires MySQL.

You have two options:

##### Option A (Recommended): Use Docker

This ensures consistent environment across machines.

Install Docker:

https://www.docker.com/products/docker-desktop/

Verify:

```bash
docker --version
```

##### Option B: Install MySQL Locally

Download:

https://dev.mysql.com/downloads/mysql/

During installation:

Set root password

Create a database named: **movie_compare**

You can verify with:

```bash
mysql -u root -p
```

### 5. Clone the Repository

```bash
git clone https://github.com/gdpp/movie-compare-app.git
cd movie-compare-app
```

### 6. Backend Setup

```bash
cd backend
yarn
```

Create .env file based on .env.example.

```env
PORT=8000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=movie_compare
DB_USER=root
DB_PASSWORD=root or your_password
DB_DIALECT=mysql

FRONTEND_URL=http://localhost:3000

OMDB_API_KEY=your_api_key_here
OMDB_BASE_URL=https://www.omdbapi.com/
```

You must obtain and activate a free API key from:

https://www.omdbapi.com/apikey.aspx

### 7. Run Backend

Run the docker-compose file

```bash
docker compose up -d
```

Run the server

```bash
yarn dev
```

Verify:

```code
http://localhost:8000/api/health
```

### 8. Frontend Setup

TBD
