# Netflix-GPT Frontend

React frontend for a Netflix-clone project — browsing UI, AI-powered movie search, a conversational chat assistant, and JWT-based auth. Fully backed by a custom Spring Boot API; no direct calls to Firebase or any third-party movie API from the browser.

**Backend repo:** [netflix-gpt-backend](https://github.com/404ShubhamYadav/netflix-gpt-backend)

## Features

- **Authentication** — sign up / login against the backend's JWT-based auth (originally built on Firebase Auth, fully migrated to a custom Spring Boot + MySQL backend). Session persists across page refresh via a `/users/me` check on load.
- **Movie browsing** — five distinct rows (Popular, Trending, Top Rated, Now Playing, Upcoming), each sourced from the backend's movie service. Clicking any card updates the hero banner and plays that title's trailer.
- **AI-powered search** — natural-language movie search ("sci-fi movies with time travel") returning a structured list of titles, powered by Gemini via the backend.
- **Chat assistant** — a floating, toggleable chat widget for open-ended conversation about movies/shows, with multi-turn memory (the backend remembers earlier messages in the conversation).
- **Multi-language UI** — language selector for the search interface (English, Hindi, Spanish, Portuguese).

## Tech Stack

React · Redux Toolkit · React Router · Tailwind CSS · Axios

## Setup

### Prerequisites
- Node.js and npm
- The [backend](https://github.com/404ShubhamYadav/netflix-gpt-backend) running locally (this app has no functionality without it — no data source works standalone)

### Install and run
```bash
npm install
npm start
```
Runs on `http://localhost:3000`.

### Configuration

`src/utils/apiClient.js` currently points to `http://localhost:9191/api` for local development. When pointing this app at a deployed backend, update the `baseURL` there (or move it to an environment variable such as `REACT_APP_API_BASE_URL`, read via `process.env`) rather than hardcoding the production URL directly in source.

## Architecture Notes

- All API calls go through a single `apiClient.js` axios instance, which automatically attaches the JWT (`Authorization: Bearer <token>`) from `localStorage` to every request — no component manually handles auth headers.
- Movie data fields (`posterUrl`, `title`, `overview`, etc.) are defined entirely by the backend's response shape — this app has zero knowledge of Watchmode (the backend's actual movie data provider), by design, so the data source could change again without any frontend changes.

## Known Limitations / Next Steps

- No "My List" / favorites feature yet
- No search-history view for past AI searches