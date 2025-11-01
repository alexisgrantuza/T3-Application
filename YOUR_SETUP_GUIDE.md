# 🎯 Your Personalized Setup Guide

Based on your current `env` file structure, here's exactly how to get your app running with Docker.

## 📝 Your Current Environment File

You showed me this structure:

```env
DATABASE_URL=docker
DIRECT_URL=docker
GITHUB_TOKEN=githubapi
AUTH_SECRET=your_auth_secret_key
AUTH_GOOGLE_ID=google_id
AUTH_GOOGLE_SECRET=google_secret
BASE_URL=http://localhost:3000
```

## ⚠️ What Needs to Change

Your current `env` file has placeholder values. You need to update it with real credentials.

---

## 🚀 Step-by-Step Setup

### Step 1: Update Your Environment File

Replace the contents of your `env` file with this:

```env
# Database Configuration
# For full Docker setup (both app and database in containers)
DATABASE_URL=postgresql://postgres:postgres_password_change_me@postgres:5432/flashcards
DIRECT_URL=postgresql://postgres:postgres_password_change_me@postgres:5432/flashcards

# For local development with Docker database
# DATABASE_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards
# DIRECT_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards

# API Keys
GITHUB_TOKEN=your_actual_github_token_here

# Authentication
# Generate with: openssl rand -base64 32
AUTH_SECRET=your_auth_secret_minimum_32_characters

# OAuth Credentials
AUTH_GOOGLE_ID=your_google_client_id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-your_google_client_secret

# Application Settings
BASE_URL=http://localhost:3000
NODE_ENV=development
```

### Step 2: Get Your Credentials

#### 2.1 GitHub Token (for AI)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Flashcard AI"
4. No specific scopes needed for GitHub Models
5. Click "Generate token"
6. **Copy the token** and paste it in `GITHUB_TOKEN`

#### 2.2 Generate Auth Secret

```bash
# Run this command in your terminal
openssl rand -base64 32

# Copy the output and paste it in AUTH_SECRET
```

#### 2.3 Google OAuth Credentials

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Google+ API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Click "Create"
5. **Copy Client ID** → paste in `AUTH_GOOGLE_ID`
6. **Copy Client Secret** → paste in `AUTH_GOOGLE_SECRET`

### Step 3: Choose Your Setup Method

Now pick one of these three options:

---

## 🔵 Method A: Full Docker (Recommended for Production)

**What you get**: Both app and database running in Docker containers.

### Commands

```bash
# Make sure Docker Desktop is running

# Start everything
docker-compose up -d

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f

# Access the app
# Open browser: http://localhost:3000
```

### Environment Settings for This Method

Your `env` file should have:

```env
DATABASE_URL=postgresql://postgres:postgres_password_change_me@postgres:5432/flashcards
DIRECT_URL=postgresql://postgres:postgres_password_change_me@postgres:5432/flashcards
```

Note: Use `@postgres:5432` (Docker service name)

### Stopping

```bash
# Stop everything
docker-compose down

# Stop and delete database data
docker-compose down -v
```

---

## 🟢 Method B: Docker Database + Local App (Recommended for Development)

**What you get**: Database in Docker, app runs locally with hot-reload.

### Commands

```bash
# Start database only
docker-compose up -d postgres

# Check database is running
docker-compose ps

# Install dependencies (first time only)
npm install

# Setup database (first time only)
npm run db:generate
npm run db:push

# Start development server
npm run dev

# Open browser: http://localhost:3000
```

### Environment Settings for This Method

Your `env` file should have:

```env
DATABASE_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards
DIRECT_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards
```

Note: Use `@localhost:5432` (accessing from your machine)

### Stopping

```bash
# Stop database
docker-compose down

# Stop app (Ctrl+C in terminal running npm run dev)
```

---

## 🟡 Method C: Using start-database.sh Script

**What you get**: Automated database setup with the provided script.

### Commands

```bash
# Make script executable (first time only)
chmod +x start-database.sh

# Run the script
./start-database.sh

# Install dependencies (first time only)
npm install

# Setup database (first time only)
npm run db:generate
npm run db:push

# Start development server
npm run dev

# Open browser: http://localhost:3000
```

### Environment Settings for This Method

Your `env` file should have:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/flashcards
DIRECT_URL=postgresql://postgres:password@localhost:5432/flashcards
```

Note: The script reads from your `.env` file

---

## ✅ Verification Steps

After starting your app, verify everything works:

1. **Check if app is running**

   ```bash
   # Method A (Docker)
   docker-compose ps
   # Should show app and postgres containers running

   # Method B/C (Local)
   # Terminal should show "Ready in X seconds" or similar
   ```

2. **Access the application**
   - Open browser: http://localhost:3000
   - You should see the flashcard app

3. **Test authentication**
   - Click "Sign In" or "Login"
   - Choose "Sign in with Google"
   - Complete Google OAuth flow
   - You should be redirected back logged in

4. **Test file upload**
   - Upload a test .txt file with some text
   - Wait for processing
   - Verify flashcards are generated

5. **Check database**

   ```bash
   # Connect to database
   docker-compose exec postgres psql -U postgres -d flashcards

   # Inside psql, run:
   \dt  # List tables
   SELECT * FROM "FlashcardSet";  # View flashcard sets
   \q   # Quit
   ```

---

## 🐛 Troubleshooting Your Setup

### Issue: "docker-compose: command not found"

**Solution**: Install Docker Desktop:

- Windows: https://docs.docker.com/desktop/install/windows-install/
- Mac: https://docs.docker.com/desktop/install/mac-install/
- Linux: https://docs.docker.com/desktop/install/linux-install/

### Issue: "Port 5432 already in use"

**Solution**: Stop existing PostgreSQL

```bash
# Check what's using the port
lsof -i :5432  # Mac/Linux
netstat -ano | findstr :5432  # Windows

# Stop Docker containers
docker-compose down

# Or stop local PostgreSQL
# Mac: brew services stop postgresql
# Linux: sudo systemctl stop postgresql
# Windows: Stop PostgreSQL service in Services
```

### Issue: "Port 3000 already in use"

**Solution**:

```bash
# Find and kill process using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # Replace <PID> with actual process ID
```

### Issue: "Database connection failed"

**Solution**:

1. Check if database is running: `docker-compose ps`
2. Verify DATABASE_URL in your `env` file
3. Check if you're using correct host (`postgres` vs `localhost`)
4. Restart database: `docker-compose restart postgres`

### Issue: "Google OAuth error"

**Solution**:

1. Verify redirect URI in Google Console matches: `http://localhost:3000/api/auth/callback/google`
2. Check `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are correct
3. Ensure Google+ API is enabled

### Issue: "Flashcard generation fails"

**Solution**:

1. Verify `GITHUB_TOKEN` is valid
2. Check token hasn't expired
3. View app logs: `docker-compose logs app` or check terminal

---

## 📊 Quick Reference

### Common Commands

```bash
# Docker Commands
docker-compose up -d              # Start all services
docker-compose up -d postgres     # Start database only
docker-compose down               # Stop all services
docker-compose logs -f            # View logs
docker-compose ps                 # Check running containers
docker-compose restart            # Restart services

# Development Commands
npm run dev                       # Start dev server
npm run build                     # Build for production
npm run start                     # Run production build
npm run db:studio                 # Open database GUI
npm run db:push                   # Push schema changes
npm run db:generate               # Run migrations

# Database Commands
docker-compose exec postgres psql -U postgres -d flashcards  # Access database
docker-compose exec postgres pg_dump -U postgres flashcards  # Backup
```

---

## 🎓 What Each File Does

- **`env`**: Environment variables (credentials, config)
- **`docker-compose.yml`**: Defines how Docker containers work together
- **`Dockerfile`**: Instructions to build the app container
- **`start-database.sh`**: Automated script to start database
- **`.dockerignore`**: Files to exclude from Docker build

---

## 📚 Next Steps

Once everything is running:

1. ✅ Test uploading different file types (PDF, DOCX, TXT)
2. ✅ Review the generated flashcards
3. ✅ Test the flip animation
4. ✅ Try deleting flashcard sets
5. ✅ Check Prisma Studio: `npm run db:studio`

---

## 💡 My Recommendation

Based on your setup, I recommend:

**For your first run**: Use **Method B** (Docker Database + Local App)

- Easy to debug
- Fast hot-reload
- See changes immediately
- Best learning experience

**For deployment**: Switch to **Method A** (Full Docker)

- Production-ready
- Easy to deploy anywhere
- Consistent environment

---

## 🆘 Still Stuck?

1. Check all documentation files:
   - [QUICK_START.md](./QUICK_START.md)
   - [DOCKER_SETUP.md](./DOCKER_SETUP.md)
   - [SETUP_OPTIONS.md](./SETUP_OPTIONS.md)
   - [README.md](./README.md)

2. Verify your `env` file has real values (not placeholders)

3. Make sure Docker Desktop is running

4. Check container logs for errors:
   ```bash
   docker-compose logs -f
   ```

---

**Good luck! You've got this! 🚀**
