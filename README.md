# ContentCraft AI

> 🚧 **Work in progress — actively being built**

ContentCraft AI — an AI-powered content generator for blog posts, social captions, product descriptions, and newsletters.

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
<!-- - [Live Demo](#live-demo) (Placeholder: To be added before final submission) -->
<!-- - [Screenshots](#screenshots) (Placeholder: To be added before final submission) -->

---

## Tech Stack

* **Frontend**: React + Vite + TypeScript + Tailwind CSS, React Router
* **Backend**: Node.js + Express + TypeScript
* **Database**: MongoDB with Mongoose
* **Auth**: Custom JWT (bcrypt + jsonwebtoken)
* **AI**: OpenRouter API (model: `openai/gpt-oss-20b:free` — *Note: OpenRouter's free model lineup changes over time, verify current free models at [openrouter.ai/models](https://openrouter.ai/models) if content generation fails*).

---

## Features

* **Authentication & Authorization**: Secure user registration and login using encrypted passwords (bcrypt) and JSON Web Tokens (JWT).
* **AI Content Generation**: Dynamic generator supporting 4 content types (blog posts, social media captions, product descriptions, and newsletters) customized by tone, length, and target audience.
* **Daily Credit System**: Self-healing credit scheduler giving users 5 free generations daily. Resets automatically upon the user's first request on a new day (aligned to midnight local time).
* **Content Management**: Save generated assets, list history with built-in pagination, toggle favorite items, and safely delete documents with ownership authorization guards.

---

## Project Structure

```text
ContentCraft-AI/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable layout and guard components
│   │   ├── context/        # Auth and Session state context providers
│   │   ├── lib/            # Axios API configuration
│   │   ├── pages/          # Login, Signup, and Dashboard components
│   │   └── types/          # TypeScript interfaces
├── server/                 # Backend Node.js Express application
│   ├── src/
│   │   ├── config/         # Database and OpenRouter AI connections
│   │   ├── controllers/    # Route handler controller functions
│   │   ├── middlewares/    # Auth token verification & error middlewares
│   │   ├── models/         # Mongoose User and Content schemas
│   │   ├── routes/         # Express endpoint route mapping
│   │   └── utils/          # Prompt compilation templates
```

---

## Setup & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database cluster
* An [OpenRouter](https://openrouter.ai/) account and API key

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AbirhossenCSE/ContentCraft-AI.git
   cd ContentCraft-AI
   ```

2. **Configure Backend Environment**
   Navigate to the `server/` directory, create a `.env` file based on `.env.example`, and fill in your credentials:
   ```bash
   cd server
   cp .env.example .env
   ```
   Configure the following variables inside `server/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
   JWT_SECRET=your_jwt_signature_secret
   OPENROUTER_API_KEY=your_openrouter_api_key
   SITE_URL=http://localhost:5173
   ```
   Install backend dependencies:
   ```bash
   npm install
   ```

3. **Configure Frontend Environment**
   Navigate to the `client/` directory and configure the environment:
   ```bash
   cd ../client
   ```
   Optionally create a `.env` file to specify the API backend target (defaults to `http://localhost:5000/api` if left blank):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Install frontend dependencies:
   ```bash
   npm install
   ```

### Running the Application

* **Start Backend Server**:
  From the `server/` directory, run:
  ```bash
  npm run dev
  ```
  The backend will listen on `http://localhost:5000`.

* **Start Frontend Dev Server**:
  From the `client/` directory, run:
  ```bash
  npm run dev
  ```
  The client web interface will be available at `http://localhost:5173`.

---

## API Endpoints

All endpoints except authentication require the JWT token to be attached as a Bearer token in the `Authorization` header (`Authorization: Bearer <JWT_TOKEN>`).

| Method | Path | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| **POST** | `/api/auth/register` | No | Creates a new user account with 5 free initial credits. |
| **POST** | `/api/auth/login` | No | Authenticates credentials and returns a session JWT. |
| **POST** | `/api/generate` | Yes | Calls OpenRouter AI to generate content and deducts 1 credit. |
| **GET** | `/api/user/credits` | Yes | Retrieves current user credit balance (runs daily reset hook). |
| **POST** | `/api/contents/save` | Yes | Persists a generated content item to the database. |
| **GET** | `/api/contents` | Yes | Retrieves user's history sorted by newest, with pagination support. |
| **PATCH** | `/api/contents/:id/favorite` | Yes | Flips `isFavorite` true/false status for the specified item. |
| **DELETE**| `/api/contents/:id` | Yes | Permanently deletes a content item belonging to the active user. |

---
