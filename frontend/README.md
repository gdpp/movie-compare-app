# MovieScope Frontend

This is the frontend for the MovieScope App. It provides a user interface to:

- Search for movies
- View movie details
- Compare up to 5 movies with visual charts
- View recent comparisons

The app is built with React and uses Vite for development and building.

## Project structure

```text
frontend/
  src/
    api/                    # Axios API client
    components/             # Reusable UI components
      comparison/           # Movie comparison components
      comparisons/          # Recent comparisons components
      header/               # Header component
      hero/                 # Hero section components
      movie/                # Movie detail components
      movies/               # Movie list components
    config/                 # Environment configuration
    context/                # React contexts (theme, compare, modal)
    hooks/                  # Custom React hooks
    layouts/                # Layout components
    pages/                  # Page components
    router/                 # React Router configuration
    services/               # API service functions
    theme/                  # Theme configuration
    App.jsx                 # Main app component
    main.jsx                # App entry point
  tests/
    unit/                   # Unit tests (components/hooks/services)
    integration/            # Integration tests (pages/components)
  .env.example
  eslint.config.js
  package.json
  vite.config.js
```

## Tech stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: React 19
- **Build tool**: Vite
- **UI Library**: Material-UI (@mui/material, @emotion/react)
- **Routing**: React Router v7
- **State management**: React Context + TanStack React Query
- **HTTP client**: Axios
- **Charts**: Recharts
- **Utilities**: Lodash (debounce)
- **Testing**: Vitest + React Testing Library + jsdom
- **Tooling**: ESLint, Prettier

## Set up project configuration

### 1) Install dependencies

```bash
yarn
```

### 2) Environment variables

Create a `.env` file in `frontend/` with at least:

```bash
# API Base URL
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3) Run the development server

```bash
yarn dev
```

Production build:

```bash
yarn build
yarn preview
```

Notes:

- Ensure the **backend server is running** on the port specified in `VITE_API_BASE_URL`.
- The app will be available at `http://localhost:3000`.

## Features

### Search Movies

- Search movies by title with debounced input
- Display search results with movie posters and basic info
- Click on a movie to view details in a modal

### Compare Movies

- Add up to 5 movies to compare
- Visual comparison with rating charts
- Persist comparisons to view later

### Recent Comparisons

- View a list of recent movie comparisons
- Click to view details of past comparisons

## Test Docs

Run all tests:

```bash
yarn test
```

Run tests in watch mode:

```bash
yarn test -- --watch
```

Run tests with coverage:

```bash
yarn test -- --coverage
```

Notes:

- Tests use Vitest with jsdom environment.
- Unit tests focus on individual components, hooks, and services.
- Integration tests verify component interactions and page rendering.
