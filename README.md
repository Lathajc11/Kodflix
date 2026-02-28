# KodFlix Full-Stack Application

KodFlix is a production-ready full-stack application with a React frontend and Node.js/Express backend.

## Architecture & Security
- **Frontend & Backend Separation**: The project uses two distinct folders (`frontend` and `backend`). They do not share code and are designed to be deployed separately.
- **Secure Authentication**: Uses JWT (JSON Web Tokens) stored in HTTP-only cookies to prevent XSS attacks. Passwords are hashed using `bcryptjs`.
- **API Protection**: TMDB API key is kept exclusively on the backend. The frontend only communicates with our protected backend routes.
- **Environment Variables**: Sensitive data is managed through `.env` files and never hardcoded or committed to version control.

## Prerequisites
- Node.js installed
- Aiven MySQL Database (SSL specified)
- TMDB API Key

## Local Setup

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```
DB_HOST=your_aiven_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port
JWT_SECRET=your_super_secret_key
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```
Start the backend:
```bash
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```
REACT_APP_API_URL=http://localhost:5000
```
Start the frontend:
```bash
npm start
```

## GitHub Push Steps (Separate Repositories)

You must push the frontend and backend to **two separate repositories**.

**For Backend:**
```bash
cd backend
git init
git add .
git commit -m "Initial backend setup"
git branch -M main
git remote add origin <backend-repo-url>
git push -u origin main
```

**For Frontend:**
```bash
cd frontend
git init
git add .
git commit -m "Initial frontend setup"
git branch -M main
git remote add origin <frontend-repo-url>
git push -u origin main
```

## Vercel Deployment

### Deploy Backend First
1. Go to Vercel and import your backend repository.
2. In the "Environment Variables" section, add all variables from your backend `.env` file.
3. Deploy.
4. Copy the generated Vercel URL for the backend.

### Deploy Frontend
1. Go to Vercel and import your frontend repository.
2. Add the environment variable: `REACT_APP_API_URL=<Your Vercel Backend URL>`
3. Ensure the Build Command is `npm run build` and Output Directory is `build`.
4. Deploy.

**Note on Redeployment**: If you change the frontend URL or backend environment variables, you might need to redeploy the respective service to apply the configuration.
