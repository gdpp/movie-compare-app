# Movie Comparison App

A full-stack application that allows users to search movies using the OMDB API, compare them side-by-side, and save selected movies into a persistent watchlist.

## Architecture Overview

![alt text](diagArch.png)

This project follows a monorepo structure with separated frontend and backend applications to maintain clear boundaries and scalability.

```
movie-compare-app/
│
├── backend/      → Node.js + Koa + Sequelize + MySQL
├── frontend/     → React + Zustand + MUI
└── README.md     → General documentation
```

#### High-Level Architecture

Client → Backend API → OMDB API
Client → Backend API → MySQL Database

#### Architectural Decisions

- The frontend does not call OMDB directly.
- The backend acts as a proxy and integration layer.
- The database stores only persistent application data (watchlist).

#### Why this architecture?

- Centralized API integration
- Better security (API keys not exposed)
- Easier future scalability (caching, logging, rate limiting)
- Cleaner separation of concerns

## Tech Stack

#### Backend

- Node.js
- Koa
- Sequelize (ORM)
- MySQL
- Jest (unit & integration testing)
- ESLint + Prettier

#### Frontend

- React (Hooks, ES6)
- Zustand (state management)
- MUI (styling)
- Vitest (unit testing)

#### Tooling

- Docker (for MySQL containerized setup)
- Git
- VS Code
- Yarn
- ChatGPT

## Local Development Setup

### From Zero to Running

> Nothing installed. Nothing configured. Just willingness and coffee.

If you're starting from a completely clean machine, follow this guide step by step.

If you already have Node.js, Git, and Docker installed, you can skip to **Step 5 – Clone and Run the Project.**

#### 1. Install Git

Required to clone the repository.

Download and install:

https://git-scm.com/downloads

Verify installation:

```bash
git --version
```

#### 2. Install Node.js

This project uses Node.js 18+ (recommended: latest LTS).

Download from:

https://nodejs.org/

Verify installation:

```bash
node --version
npm --version
```

#### 3. Install Yarn (Package Manager)

We use Yarn instead of npm for consistency.

Install globally:

```bash
npm install -g yarn
```

Verify:

```bash
yarn --version
```

#### 4. Database Setup (Choose One Option)

The backend requires MySQL.

You have two options:

###### Option A (Recommended): Use Docker

This ensures consistent environment across machines.

Install Docker:

https://www.docker.com/products/docker-desktop/

Verify:

```bash
docker --version
```

run the docker-compose file

```bash
docker compose up -d
```

###### Option B: Install MySQL Locally

Download:

https://dev.mysql.com/downloads/mysql/

During installation:

Set root password

Create a database named: **movie_compare**

You can verify with:

```bash
mysql -u root -p
```

#### 5. Clone the Repository

```bash
git clone <repository-url>
cd movie-compare-app
```

#### 6. Backend Setup

Create .env file based on .env.example.

```env
PORT=8000
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=movie_app
DB_USER=root
DB_PASSWORD=root || your_password

OMDB_API_KEY=your_api_key_here
```

You must obtain a free API key from:

https://www.omdbapi.com/apikey.aspx