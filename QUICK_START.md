# 🚀 Quick Start Guide

Get your AI Flashcard Generator running in 5 minutes!

## 🎯 Choose Your Setup

### Option A: Docker (Everything Containerized) ⭐ Recommended for Production

**Perfect if you want**: Everything in containers, easy deployment, isolated environment

```bash
# 1. Set up environment
cp .env.example .env
# Edit .env with your credentials

# 2. Start everything
docker-compose up -d

# 3. Open browser
http://localhost:3000
```

**That's it!** ✨ The database and app are running.

---

### Option B: Database in Docker + Local Development

**Perfect if you want**: Fast development with hot-reload, easier debugging

```bash
# 1. Set up environment
cp .env.example .env
# Edit .env (use localhost:5432 for database)

# 2. Start database only
docker-compose up -d postgres

# 3. Install dependencies
npm install

# 4. Setup database
npm run db:generate
npm run db:push

# 5. Start development server
npm run dev

# 6. Open browser
http://localhost:3000
```

---

### Option C: Using the Database Script

**Perfect if you want**: Simple database setup with automatic configuration

```bash
# 1. Make script executable
chmod +x start-database.sh

# 2. Start database
./start-database.sh

# 3. Install and run
npm install
npm run db:generate
npm run dev
```

## 🔑 Required Environment Variables

| Variable             | Where to Get It                                                    | Required |
| -------------------- | ------------------------------------------------------------------ | -------- |
| `GITHUB_TOKEN`       | [GitHub Personal Access Token](https://github.com/settings/tokens) | ✅ Yes   |
| `AUTH_SECRET`        | Generate: `openssl rand -base64 32`                                | ✅ Yes   |
| `AUTH_GOOGLE_ID`     | [Google Cloud Console](https://console.cloud.google.com/)          | ✅ Yes   |
| `AUTH_GOOGLE_SECRET` | [Google Cloud Console](https://console.cloud.google.com/)          | ✅ Yes   |
| `DATABASE_URL`       | Auto-configured if using Docker                                    | ✅ Yes   |

## 🎨 Sample .env File

```env
# Database (Docker setup)
DATABASE_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards
DIRECT_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards

# AI Service
GITHUB_TOKEN=ghp_your_github_personal_access_token

# Auth
AUTH_SECRET=generate_this_with_openssl_rand_base64_32
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-your-google-client-secret

# Optional
BASE_URL=http://localhost:3000
NODE_ENV=development
```

## 📝 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

## 🔧 Common Commands

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Access database
docker-compose exec postgres psql -U postgres -d flashcards
```

### Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Database operations
npm run db:studio      # Open Prisma Studio
npm run db:push        # Push schema changes
npm run db:generate    # Run migrations
npm run db:reset       # Reset database

# Code quality
npm run lint           # Run linter
npm run typecheck      # Check types
npm run format:write   # Format code
```

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Navigate to `http://localhost:3000`
- [ ] Click "Sign In" and authenticate with Google
- [ ] Upload a test file (PDF, DOCX, or TXT)
- [ ] Verify flashcards are generated
- [ ] Check that flashcards are saved and displayed

## 🐛 Quick Troubleshooting

| Problem                    | Solution                                                |
| -------------------------- | ------------------------------------------------------- |
| Port 3000 in use           | Change port: `docker-compose.yml` or kill process       |
| Database connection failed | Check `.env` DATABASE_URL, ensure postgres is running   |
| Auth not working           | Verify Google OAuth credentials and redirect URI        |
| File upload fails          | Check GITHUB_TOKEN is valid                             |
| Build errors               | Clear cache: `rm -rf .next node_modules && npm install` |

## 📖 Next Steps

- 📚 Read the full [README.md](./README.md) for architecture details
- 🐳 See [DOCKER_SETUP.md](./DOCKER_SETUP.md) for advanced Docker usage
- 🔒 Configure production environment variables for deployment
- 🚀 Deploy to [Vercel](https://vercel.com), [Railway](https://railway.app), or your preferred platform

## 💬 Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review [DOCKER_SETUP.md](./DOCKER_SETUP.md) for Docker-specific issues
- Join the [T3 Discord](https://t3.gg/discord) community

---

**Happy coding! 🎉**
