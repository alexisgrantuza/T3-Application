# Docker Setup Guide

This guide provides instructions for running the AI Flashcard Generator application using Docker.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- Environment variables configured (see below)

## 🔧 Environment Configuration

1. **Copy the environment template**:

   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your actual credentials:

   ```env
   # Database Configuration (for Docker Compose)
   DATABASE_URL=postgresql://postgres:postgres_password_change_me@postgres:5432/flashcards
   DIRECT_URL=postgresql://postgres:postgres_password_change_me@postgres:5432/flashcards

   # API Keys
   GITHUB_TOKEN=your_github_token_here

   # Authentication (generate a secure random string)
   AUTH_SECRET=your_auth_secret_minimum_32_characters

   # Google OAuth Credentials
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

   > **Note**: For local development without Docker, change the database host from `postgres` to `localhost`:
   >
   > ```
   > DATABASE_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards
   > ```

## 🚀 Running the Application

### Option 1: Using Docker Compose (Recommended)

This starts both the PostgreSQL database and the Next.js application.

```bash
# Start all services (database + app)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

The application will be available at: **http://localhost:3000**

### Option 2: Database Only (Development Mode)

Run only the PostgreSQL database in Docker, and run the Next.js app locally for development.

#### Using the provided script:

```bash
# Make the script executable
chmod +x start-database.sh

# Run the script
./start-database.sh
```

#### Or using Docker Compose with selective services:

```bash
# Start only the database
docker-compose up -d postgres

# Run the app locally
npm run dev
```

**Update your `.env` for this setup**:

```env
DATABASE_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards
DIRECT_URL=postgresql://postgres:postgres_password_change_me@localhost:5432/flashcards
```

## 🗄️ Database Management

### Run Migrations

When starting fresh or after schema changes:

```bash
# If using Docker Compose (app container)
docker-compose exec app npx prisma migrate deploy

# If using local development with Docker database
npm run db:generate
npm run db:push
```

### Access Prisma Studio

```bash
# Local development
npm run db:studio

# Docker environment (ensure database is running)
docker-compose exec app npx prisma studio
```

### Reset Database

```bash
# Docker Compose
docker-compose down -v
docker-compose up -d postgres

# Local development
npm run db:reset
```

## 🏗️ Building for Production

### Build Docker Image Manually

```bash
# Build the image
docker build -t flashcard-app:latest \
  --build-arg DATABASE_URL=$DATABASE_URL \
  --build-arg GITHUB_TOKEN=$GITHUB_TOKEN \
  --build-arg AUTH_SECRET=$AUTH_SECRET \
  --build-arg AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID \
  --build-arg AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET \
  .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL=$DATABASE_URL \
  -e GITHUB_TOKEN=$GITHUB_TOKEN \
  flashcard-app:latest
```

### Using Docker Compose

```bash
# Build and start
docker-compose up -d --build

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

## 🔍 Troubleshooting

### Issue: Port Already in Use

If port 3000 or 5432 is already in use:

1. **Change the port** in `docker-compose.yml`:

   ```yaml
   ports:
     - "3001:3000" # Change host port to 3001
   ```

2. **Or stop the conflicting service**:

   ```bash
   # Find process using port 3000
   lsof -i :3000  # macOS/Linux
   netstat -ano | findstr :3000  # Windows

   # Kill the process
   kill -9 <PID>  # macOS/Linux
   ```

### Issue: Database Connection Failed

1. **Check if PostgreSQL is running**:

   ```bash
   docker-compose ps
   ```

2. **View database logs**:

   ```bash
   docker-compose logs postgres
   ```

3. **Verify environment variables**:

   ```bash
   docker-compose config
   ```

4. **Test database connection**:
   ```bash
   docker-compose exec postgres psql -U postgres -d flashcards
   ```

### Issue: Build Failures

1. **Clear Docker cache**:

   ```bash
   docker-compose down
   docker system prune -a
   docker-compose up -d --build
   ```

2. **Check build logs**:

   ```bash
   docker-compose logs app
   ```

3. **Verify Node modules**:
   ```bash
   # Remove local node_modules
   rm -rf node_modules
   docker-compose build --no-cache
   ```

### Issue: Prisma Client Issues

```bash
# Regenerate Prisma Client
docker-compose exec app npx prisma generate

# Or rebuild the container
docker-compose up -d --build app
```

## 📊 Docker Commands Reference

### Container Management

```bash
# List running containers
docker-compose ps

# Start services
docker-compose start

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Remove containers
docker-compose down
```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs app
docker-compose logs postgres

# Execute commands in containers
docker-compose exec app sh
docker-compose exec postgres psql -U postgres
```

### Resource Management

```bash
# View resource usage
docker stats

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Clean up everything
docker system prune -a --volumes
```

## 🌐 Environment-Specific Configurations

### Development

```yaml
# docker-compose.override.yml (auto-loaded in dev)
version: "3.8"
services:
  app:
    command: npm run dev
    volumes:
      - .:/app
      - /app/node_modules
```

### Production

```bash
# Use production-specific compose file
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🔒 Security Notes

1. **Never commit `.env` files** to version control
2. **Use strong passwords** for production databases
3. **Rotate secrets regularly** in production
4. **Use Docker secrets** for sensitive data in production:
   ```yaml
   secrets:
     db_password:
       file: ./secrets/db_password.txt
   ```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)

## 💡 Tips

1. **Use Docker Compose profiles** for different environments:

   ```yaml
   profiles: ["dev", "prod"]
   ```

2. **Mount volumes for development** to enable hot-reload:

   ```yaml
   volumes:
     - ./src:/app/src
   ```

3. **Optimize build times** with multi-stage builds (already configured)

4. **Monitor container health**:
   ```bash
   docker-compose ps
   docker inspect --format='{{.State.Health.Status}}' flashcard-postgres
   ```

---

For more information, see the main [README.md](./README.md) file.
