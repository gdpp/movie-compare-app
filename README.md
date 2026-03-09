# Movie Comparison App

## Project Description

Build a full-stack application that allows users to search for movies and compare them side-by-side. The application fetches data from the OMDB API and presents a clear, visual comparison of movie details.

### Features

- Search movies by title using OMDB API
- View detailed movie metadata
- Compare up to 5 movies side-by-side
- Visualize IMDb rating comparisons with charts
- View recent comparisons history
- Responsive UI built with Material UI
- Backend proxy to protect API keys
- Persistent comparison history stored in MySQL

## Setup Instructions

> Nothing installed. Nothing configured. Just willingness and coffee.

If you're starting from a completely clean machine, follow this guide step by step.

If you already have Node.js, Git, and Docker installed, you can skip to **Step 5 – Clone and Run the Project.**

### 1. Install Git

Required to clone the repository.

Download and install: https://git-scm.com/downloads

Verify installation: `git --version`

### 2. Install Node.js

This project uses Node.js 18+ (recommended: latest LTS).

Download from: https://nodejs.org/

Verify installation: `node --version` and `npm --version`

### 3. Install Yarn (Package Manager)

We use Yarn instead of npm for consistency.

Install globally: `npm install -g yarn`

Verify: `yarn --version`

### 4. Database Setup (Choose One Option)

The backend requires MySQL.

#### Option A (Recommended): Use Docker

This ensures consistent environment across machines.

Install Docker: https://www.docker.com/products/docker-desktop/

Verify: `docker --version`

#### Option B: Install MySQL Locally

Download: https://dev.mysql.com/downloads/mysql/

During installation: Set root password and create a database named `movie_compare`.

Verify with: `mysql -u root -p`

### 5. Clone the Repository

```bash
git clone https://github.com/gdpp/movie-compare-app.git
cd movie-compare-app
```

## How to Run

### Backend

See [backend/README.md](backend/README.md) for detailed backend setup and running instructions.

### Frontend

See [frontend/README.md](frontend/README.md) for detailed frontend setup and running instructions.

## Architecture Explanation (Technical Decision Log)

![alt text](diagArch.png)

This project follows a monorepo structure with separated frontend and backend applications to maintain clear boundaries and scalability.

### High-Level Architecture

```
Client → Backend API → OMDB API
Client → Backend API → MySQL Database
```

### Architectural Decisions

- **Monorepo Structure**: Chose a monorepo to keep frontend and backend in the same repository for easier dependency management and shared tooling, while maintaining separate packages for clear separation of concerns.

- **Backend as API Proxy**: The frontend does not call OMDB directly. The backend acts as a proxy and integration layer. This decision was made for:
  - Centralized API integration
  - Better security (API keys not exposed to client)
  - Easier future scalability (caching, logging, rate limiting)
  - Cleaner separation of concerns

- **Database Usage**: MySQL with Sequelize ORM stores only persistent application data (comparison history). OMDB data is not cached in DB to avoid stale data and respect API terms.

- **Frontend State Management**: Used React Context + TanStack React Query instead of a global state library like Zustand (initially considered) because the app's state is mostly server-state driven, and RQ provides excellent caching and synchronization.

- **Testing Strategy**: Implemented both unit and integration tests. Unit tests for isolated components/hooks/services, integration for full page interactions. Used Vitest for frontend (faster than Jest for Vite projects) and Jest for backend.

- **UI Framework**: Material-UI chosen for consistent, accessible components and rapid development. Recharts for data visualization due to its React integration and simplicity.

### Why This Architecture?

- **Security**: API keys protected on server-side
- **Performance**: Client-side caching with React Query
- **Maintainability**: Clear separation between concerns
- **Scalability**: Easy to add features like user accounts, advanced search, etc.
- **Developer Experience**: Hot reloading, ESLint, Prettier, Docker for consistent dev environment

## Assumptions Made

- Users have stable internet connection for OMDB API calls
- OMDB API will remain free and available (used free tier)
- MySQL is acceptable for the scale (small app, no high concurrency expected)
- Browser support: Modern browsers with ES6+ support
- No user authentication required (comparisons are anonymous)
- English language only (OMDB data is primarily in English)
- No offline functionality needed

## Graph Library Choice

For data visualization, we chose **Recharts** over alternatives like Chart.js or D3.js because:

- **React Integration**: Built specifically for React, uses JSX for chart configuration
- **Simplicity**: Easy to use for basic charts without complex D3 learning curve
- **Customization**: Sufficient for our needs (bar charts for ratings)
- **Lightweight**: Smaller bundle size compared to D3
- **Community**: Active maintenance and good documentation

Alternatives considered:

- Chart.js: More flexible but requires Canvas manipulation
- D3.js: Extremely powerful but overkill for simple charts and steeper learning curve

## LLM Prompts Used During Development

During development, GitHub Copilot (Grok Code Fast 1 model) was used extensively. Here are key prompts for architecture, decisions, testing, and code generation:

### Architecture & Project Setup

- "Create a new workspace for a movie comparison app with React frontend and Node.js backend"
- "Set up project structure for monorepo with separate frontend and backend packages"
- "Configure Docker Compose for MySQL development environment"

### Technical Decisions

- "Should I use Zustand or React Query for state management in this movie app?"
- "Decide between Chart.js and Recharts for rating visualization"
- "Choose between Koa and Express for the backend API"

### Testing

- "Generate unit tests for React hooks using Vitest and React Testing Library"
- "Create integration tests for API endpoints with Supertest"
- "Set up test configuration for frontend with jsdom environment"

### Code Generation

- "Implement a movie search hook with debouncing using React Query"
- "Create a reusable chart component for comparing movie ratings"
- "Build error handling middleware for Koa backend"
- "Generate Sequelize models for comparison history"

These prompts helped accelerate development while ensuring best practices and consistency.

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
