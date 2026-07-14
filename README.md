# ContentCraft AI

ContentCraft AI is a full-stack application designed to generate blog posts, social captions, and product descriptions using the Groq API (powered by the `openai/gpt-oss-120b` model).

## Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Router
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose
- **Auth**: Custom JWT (bcrypt, jsonwebtoken)
- **AI**: Groq SDK (`openai/gpt-oss-120b` model)

## Project Structure
- `client/`: React + Vite + TypeScript frontend.
- `server/`: Express + TypeScript backend.

## Getting Started

Follow the instructions below to run the client and backend servers in development mode.

### Client Setup & Run

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The client will be running at `http://localhost:5173`.

### Server Setup & Run

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the backend development server:
   ```bash
   npm run dev
   ```
   The server will be running at `http://localhost:5000`.
