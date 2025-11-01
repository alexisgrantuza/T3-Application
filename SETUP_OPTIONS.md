# 🎯 Setup Options Comparison

Choose the setup that best fits your needs. Here's a comparison of all available options:

## 📊 Quick Comparison Table

| Feature              | Full Docker       | Database Docker + Local App | Local Everything | start-database.sh |
| -------------------- | ----------------- | --------------------------- | ---------------- | ----------------- |
| **Setup Complexity** | ⭐⭐ Medium       | ⭐⭐ Medium                 | ⭐⭐⭐ Complex   | ⭐ Easy           |
| **Hot Reload**       | ❌ No             | ✅ Yes                      | ✅ Yes           | ✅ Yes            |
| **Production Ready** | ✅ Yes            | ⚠️ Partial                  | ❌ No            | ❌ No             |
| **Isolation**        | ✅ Full           | ⚠️ Partial                  | ❌ None          | ⚠️ Partial        |
| **Startup Time**     | Slow              | Medium                      | Fast             | Fast              |
| **Resource Usage**   | High              | Medium                      | Low              | Medium            |
| **Best For**         | Production, CI/CD | Development                 | Quick testing    | Quick dev setup   |

---

## 🐳 Option 1: Full Docker Compose

### Overview

Both the application and database run in Docker containers.

### Architecture

```
┌─────────────────────────────────────────┐
│          Docker Network                  │
│  ┌────────────┐      ┌────────────┐    │
│  │   App      │ ───> │  Postgres  │    │
│  │ Container  │      │ Container  │    │
│  │ :3000      │      │ :5432      │    │
│  └────────────┘      └────────────┘    │
└─────────────────────────────────────────┘
         ↓
    localhost:3000
```

### Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

### Environment Configuration

```env
# Use Docker service name as host
DATABASE_URL=postgresql://postgres:password@postgres:5432/flashcards
```

### Pros ✅

- ✅ Complete isolation
- ✅ Production-ready
- ✅ Easy deployment
- ✅ Consistent environment
- ✅ No local dependencies needed

### Cons ❌

- ❌ No hot-reload (slower development)
- ❌ Must rebuild for code changes
- ❌ Higher resource usage
- ❌ Longer startup time

### Use When

- Deploying to production
- Setting up CI/CD pipelines
- Want production-like environment
- Multiple developers need same setup

---

## 💻 Option 2: Database Docker + Local App

### Overview

PostgreSQL runs in Docker, Next.js app runs locally with hot-reload.

### Architecture

```
┌─────────────────┐
│ Docker Network  │
│  ┌────────────┐ │
│  │  Postgres  │ │
│  │    :5432   │ │
│  └────────────┘ │
└─────────────────┘
         ↑
         │
    ┌────────────┐
    │  Next.js   │ (Local)
    │   :3000    │
    └────────────┘
         ↓
    localhost:3000
```

### Commands

```bash
# Start database
docker-compose up -d postgres

# Run app locally
npm run dev
```

### Environment Configuration

```env
# Use localhost as host
DATABASE_URL=postgresql://postgres:password@localhost:5432/flashcards
```

### Pros ✅

- ✅ Fast hot-reload
- ✅ Easy debugging
- ✅ Lower resource usage
- ✅ Database isolation
- ✅ Fast iteration

### Cons ❌

- ❌ Need local Node.js
- ❌ Less production-like
- ❌ Manual dependency management

### Use When

- Active development
- Debugging issues
- Testing new features
- Need fast feedback loop

---

## 🖥️ Option 3: Using start-database.sh Script

### Overview

Convenient bash script that manages a PostgreSQL Docker container.

### Architecture

Same as Option 2, but automated setup.

### Commands

```bash
# Make executable
chmod +x start-database.sh

# Start database
./start-database.sh

# Run app
npm run dev
```

### Script Features

- ✅ Auto-detects Docker/Podman
- ✅ Checks port availability
- ✅ Generates secure passwords
- ✅ Handles existing containers
- ✅ Validates environment

### Pros ✅

- ✅ Simplest database setup
- ✅ Automatic password generation
- ✅ Smart container management
- ✅ Cross-platform (WSL on Windows)

### Cons ❌

- ❌ Requires bash shell
- ❌ Windows users need WSL
- ❌ Database only (app runs separately)

### Use When

- First time setup
- Quick development start
- Want automated DB management
- Don't need full containerization

---

## 🏠 Option 4: Fully Local (No Docker)

### Overview

Everything runs directly on your machine.

### Architecture

```
    ┌────────────┐
    │  Next.js   │
    │   :3000    │
    └────────────┘
         ↓
    ┌────────────┐
    │ PostgreSQL │ (Local)
    │   :5432    │
    └────────────┘
```

### Setup

```bash
# Install PostgreSQL locally
# macOS: brew install postgresql
# Ubuntu: apt-get install postgresql
# Windows: Download from postgresql.org

# Create database
createdb flashcards

# Run app
npm install
npm run db:generate
npm run dev
```

### Pros ✅

- ✅ Fastest performance
- ✅ No Docker overhead
- ✅ Direct database access
- ✅ Traditional setup

### Cons ❌

- ❌ Manual PostgreSQL install
- ❌ Platform-specific setup
- ❌ Harder to replicate
- ❌ Potential version conflicts

### Use When

- Already have PostgreSQL installed
- Don't want Docker
- Need maximum performance
- Comfortable with local DB management

---

## 🎯 Recommended Setup by Use Case

### For Beginners

```bash
# Use start-database.sh script
./start-database.sh
npm run dev
```

**Why**: Automated, simple, gets you started quickly.

### For Development

```bash
# Use Database Docker + Local App
docker-compose up -d postgres
npm run dev
```

**Why**: Best developer experience with hot-reload.

### For Production Testing

```bash
# Use Full Docker Compose
docker-compose up -d
```

**Why**: Matches production environment exactly.

### For CI/CD

```bash
# Use Full Docker Compose
docker-compose -f docker-compose.yml up -d
```

**Why**: Reproducible builds and deployments.

---

## 🔄 Switching Between Options

You can easily switch between setups:

### From Script to Docker Compose

```bash
# Stop script-created container
docker stop flashcards-postgres

# Start with Docker Compose
docker-compose up -d postgres
```

### From Local App to Full Docker

```bash
# Update .env database host
# Change: @localhost:5432 → @postgres:5432

# Start everything in Docker
docker-compose up -d
```

### From Full Docker to Local Dev

```bash
# Stop app container, keep database
docker-compose stop app

# Update .env
# Change: @postgres:5432 → @localhost:5432

# Run locally
npm run dev
```

---

## 📋 Environment File Templates

### For Full Docker (docker-compose up -d)

```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/flashcards
DIRECT_URL=postgresql://postgres:password@postgres:5432/flashcards
GITHUB_TOKEN=your_token
AUTH_SECRET=your_secret
AUTH_GOOGLE_ID=your_id
AUTH_GOOGLE_SECRET=your_secret
```

### For Local Development (npm run dev)

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/flashcards
DIRECT_URL=postgresql://postgres:password@localhost:5432/flashcards
GITHUB_TOKEN=your_token
AUTH_SECRET=your_secret
AUTH_GOOGLE_ID=your_id
AUTH_GOOGLE_SECRET=your_secret
NODE_ENV=development
```

**Key Difference**: `@postgres:5432` vs `@localhost:5432`

- `postgres` = Docker service name (container-to-container)
- `localhost` = Your machine (local-to-container)

---

## 🆘 Quick Troubleshooting

| Issue                       | Solution                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------- |
| Can't connect to database   | Check if host is `postgres` or `localhost` based on your setup                     |
| Port 5432 already in use    | Stop existing PostgreSQL: `docker-compose down` or `brew services stop postgresql` |
| Hot reload not working      | Use Option 2 (local app) instead of full Docker                                    |
| Database data lost          | Use Docker volumes: `docker-compose down` (without `-v` flag)                      |
| Permission denied on script | Run: `chmod +x start-database.sh`                                                  |

---

## 📚 Related Documentation

- [QUICK_START.md](./QUICK_START.md) - 5-minute setup guide
- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Detailed Docker documentation
- [README.md](./README.md) - Complete project documentation

---

**Still unsure? Start with the `start-database.sh` script for the easiest experience!** 🚀
