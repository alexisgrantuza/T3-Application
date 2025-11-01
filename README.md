# AI-Powered Flashcard Generator

An intelligent flashcard generation application that transforms your study materials into interactive flashcards using artificial intelligence. Built with the modern T3 Stack for type-safety, performance, and developer experience.

## 📋 Overview

This application allows users to upload documents (PDF, DOCX, TXT) and automatically generates comprehensive flashcards using AI. The system extracts content from uploaded files, processes it through an AI model, and creates categorized flashcards with difficulty levels to enhance learning and retention.

### Key Features

- 🤖 **AI-Powered Generation**: Leverages GPT-4 via GitHub Models to create intelligent, context-aware flashcards
- 📄 **Multi-Format Support**: Upload PDF, DOCX, and TXT files for processing
- 🔐 **Secure Authentication**: Google OAuth integration via NextAuth.js
- 💾 **Persistent Storage**: Save and manage your flashcard sets with PostgreSQL
- 🎯 **Difficulty Levels**: Flashcards categorized as Easy, Medium, or Hard
- 🔄 **Interactive UI**: Flip cards with smooth animations to reveal answers
- 📱 **Responsive Design**: Beautiful, modern interface built with Tailwind CSS
- 🚀 **Type-Safe API**: End-to-end type safety with tRPC and TypeScript

## 🏗️ System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js 15 App Router (React 19)                        │  │
│  │  - Server Components (page.tsx)                          │  │
│  │  - Client Components (FileUpload, Flashcard)             │  │
│  │  - TailwindCSS + Framer Motion                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕️ tRPC (Type-Safe API)
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  tRPC Routers                                             │  │
│  │  ├─ flashcardRouter (CRUD operations)                    │  │
│  │  │  ├─ createFlashcards (mutation)                       │  │
│  │  │  ├─ getFlashcardSets (query)                          │  │
│  │  │  ├─ getFlashcardSetById (query)                       │  │
│  │  │  └─ deleteFlashcardSet (mutation)                     │  │
│  │  └─ postRouter (demo/examples)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↕️                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware & Authentication                              │  │
│  │  - NextAuth.js (Google OAuth)                            │  │
│  │  - Protected Procedures                                  │  │
│  │  - Session Management                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Business Logic Services                                  │  │
│  │  ├─ file-processor.ts                                    │  │
│  │  │  ├─ PDF Processing (pdf-parse)                        │  │
│  │  │  ├─ DOCX Processing (mammoth)                         │  │
│  │  │  └─ TXT Processing (native)                           │  │
│  │  └─ ai-services.ts                                       │  │
│  │     └─ OpenAI Client (GitHub Models API)                │  │
│  │        └─ GPT-4 Flashcard Generation                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Prisma ORM                                               │  │
│  │  └─ PostgreSQL Database                                  │  │
│  │     ├─ Users & Authentication (NextAuth tables)          │  │
│  │     ├─ FlashcardSets                                     │  │
│  │     └─ Flashcards                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Authentication**: User signs in with Google OAuth via NextAuth.js
2. **File Upload**: User uploads a document through the React Dropzone interface
3. **File Processing**: Server extracts text content based on file type
4. **AI Generation**: Extracted text is sent to GPT-4 to generate flashcards
5. **Data Persistence**: Flashcards are stored in PostgreSQL with user associations
6. **Display**: Client fetches and displays flashcards with interactive UI

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ email               │
│ emailVerified       │
│ image               │
└─────────────────────┘
         │
         │ 1:N
         ├─────────────────────────┐
         │                         │
         ↓                         ↓
┌─────────────────────┐   ┌─────────────────────┐
│  FlashcardSet       │   │   Account/Session   │
├─────────────────────┤   │  (NextAuth tables)  │
│ id (PK)             │   └─────────────────────┘
│ title               │
│ description         │
│ fileName            │
│ fileType            │
│ fileData            │
│ userId (FK)         │
│ createdAt           │
│ updatedAt           │
└─────────────────────┘
         │
         │ 1:N
         ↓
┌─────────────────────┐
│    Flashcard        │
├─────────────────────┤
│ id (PK)             │
│ question            │
│ answer              │
│ difficulty          │
│ flashcardSetId (FK) │
│ createdAt           │
└─────────────────────┘
```

### Key Relationships

- **User** → **FlashcardSet**: One-to-Many (a user can have multiple flashcard sets)
- **FlashcardSet** → **Flashcard**: One-to-Many (a set contains multiple flashcards)
- **User** → **Account/Session**: One-to-Many (NextAuth.js authentication)

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript 5.8**: Type safety
- **Tailwind CSS 4**: Utility-first styling
- **Framer Motion**: Animations
- **React Dropzone**: File upload handling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

### Backend

- **tRPC 11**: End-to-end type-safe APIs
- **NextAuth.js 5**: Authentication
- **Prisma 6**: Database ORM
- **Zod**: Schema validation
- **PostgreSQL**: Primary database

### AI & Processing

- **OpenAI SDK**: AI integration via GitHub Models
- **GPT-4**: Flashcard generation
- **pdf-parse**: PDF text extraction
- **mammoth**: DOCX text extraction

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📁 Project Structure

```
T3-Application/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth endpoints
│   │   │   └── trpc/         # tRPC endpoints
│   │   ├── login/            # Login page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── flashcard/        # Flashcard components
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # UI primitives (buttons, inputs, etc.)
│   │   ├── FileUploadDemo.tsx
│   │   ├── FlashcardList.tsx
│   │   └── Navbar.tsx
│   ├── server/               # Server-side code
│   │   ├── api/
│   │   │   ├── routers/      # tRPC routers
│   │   │   │   ├── flashcard.ts
│   │   │   │   └── post.ts
│   │   │   ├── root.ts       # Root router
│   │   │   └── trpc.ts       # tRPC setup
│   │   ├── auth/             # Authentication config
│   │   ├── server/
│   │   │   └── services/     # Business logic
│   │   │       ├── ai-services.ts
│   │   │       └── file-processor.ts
│   │   └── db.ts             # Prisma client
│   ├── trpc/                 # tRPC client setup
│   │   ├── react.tsx         # React hooks
│   │   ├── server.ts         # Server-side caller
│   │   └── query-client.ts   # React Query config
│   ├── types/                # TypeScript type definitions
│   ├── lib/                  # Utility functions
│   ├── styles/               # Global styles
│   └── env.js                # Environment variable validation
├── docker-compose.yml        # Docker configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

> **Quick Start**: See [QUICK_START.md](./QUICK_START.md) for a 5-minute setup guide!

### Prerequisites

- Node.js 20+
- npm 11+
- PostgreSQL database (or use Docker)
- Google OAuth credentials
- GitHub Token (for AI API access)
- Docker & Docker Compose (optional, for containerized setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd T3-Application
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/flashcards"
   DIRECT_URL="postgresql://user:password@localhost:5432/flashcards"

   # NextAuth
   AUTH_SECRET="your-secret-key"
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"

   # AI Service
   GITHUB_TOKEN="your-github-token"
   ```

4. **Set up the database**

   ```bash
   # Run migrations
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

### Docker Setup (Recommended) 🐳

We provide **three Docker deployment options**:

#### Option 1: Full Docker Compose (App + Database)

```bash
# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start everything
docker-compose up -d

# Access at http://localhost:3000
```

#### Option 2: Database Only (Local Development)

```bash
# Start database container
docker-compose up -d postgres

# Run app locally with hot-reload
npm install
npm run db:generate
npm run dev
```

#### Option 3: Using the Database Script

```bash
# Make executable and run
chmod +x start-database.sh
./start-database.sh

# Then run app locally
npm run dev
```

📖 **For detailed Docker instructions**, see [DOCKER_SETUP.md](./DOCKER_SETUP.md)

## 🔑 Environment Variables

| Variable             | Description                                 | Required |
| -------------------- | ------------------------------------------- | -------- |
| `DATABASE_URL`       | PostgreSQL connection string                | ✅       |
| `DIRECT_URL`         | Direct database connection (for migrations) | ✅       |
| `AUTH_SECRET`        | NextAuth.js secret key                      | ✅       |
| `AUTH_GOOGLE_ID`     | Google OAuth Client ID                      | ✅       |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret                  | ✅       |
| `GITHUB_TOKEN`       | GitHub API token for AI models              | ✅       |
| `NODE_ENV`           | Environment (development/production)        | ❌       |

## 📖 API Documentation

### tRPC Endpoints

#### Flashcard Router

**`flashcard.createFlashcards`** (Protected Mutation)

- **Input**: `{ fileData: string, fileName: string, fileType: string, title?: string, description?: string }`
- **Output**: `FlashcardSet` with nested flashcards
- **Description**: Processes uploaded file and generates flashcards using AI

**`flashcard.getFlashcardSets`** (Protected Query)

- **Input**: None
- **Output**: `FlashcardSet[]` with nested flashcards
- **Description**: Retrieves all flashcard sets for the authenticated user

**`flashcard.getFlashcardSetById`** (Protected Query)

- **Input**: `{ id: string }`
- **Output**: `FlashcardSet` with nested flashcards
- **Description**: Retrieves a specific flashcard set by ID

**`flashcard.deleteFlashcardSet`** (Protected Mutation)

- **Input**: `{ id: string }`
- **Output**: `{ success: boolean }`
- **Description**: Deletes a flashcard set and all associated flashcards

## 🔄 Application Workflow

### 1. Authentication Flow

```
User → Google OAuth → NextAuth.js → Session Created → Access Granted
```

### 2. Flashcard Generation Flow

```
File Upload → Base64 Encoding → tRPC Mutation → File Processing
     ↓
Extract Text (PDF/DOCX/TXT)
     ↓
Send to GPT-4 via GitHub Models API
     ↓
Receive JSON Array of Flashcards
     ↓
Validate with Zod Schema
     ↓
Save to PostgreSQL via Prisma
     ↓
Return to Client
     ↓
Display in UI
```

### 3. AI Prompt Structure

```
System: "You are a helpful assistant that creates educational flashcards"
User: "Generate flashcards from the following text..."
Response: JSON array with questions, answers, and difficulty levels
```

## 🎨 UI Components

### Core Components

- **Flashcard**: Interactive flip card with 3D animations
- **FileUploadDemo**: Drag-and-drop file upload interface
- **FlashcardList**: Grid display of user's flashcard sets
- **Navbar**: Navigation with authentication state
- **UI Primitives**: Reusable components (buttons, inputs, dropdowns, etc.)

### Styling Approach

- **Utility-First**: Tailwind CSS for rapid development
- **Component Variants**: Class Variance Authority (CVA)
- **Animations**: Framer Motion for smooth transitions
- **Dark Mode**: Next-themes for theme switching
- **Responsive**: Mobile-first design principles

## 📊 Development Scripts

```bash
# Development
npm run dev              # Start dev server with Turbo
npm run build            # Build for production
npm run start            # Start production server
npm run preview          # Build and start production

# Database
npm run db:generate      # Generate Prisma client and run migrations
npm run db:migrate       # Deploy migrations to production
npm run db:push          # Push schema without migrations
npm run db:studio        # Open Prisma Studio GUI
npm run db:reset         # Reset database and run migrations

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format:check     # Check code formatting
npm run format:write     # Format code with Prettier
npm run typecheck        # Check TypeScript types
npm run check            # Run lint and typecheck
```

## 🔒 Security Features

- **Authentication**: Secure Google OAuth with NextAuth.js
- **Authorization**: Protected tRPC procedures require authentication
- **Data Validation**: Zod schemas validate all inputs
- **Type Safety**: End-to-end TypeScript prevents runtime errors
- **Environment Validation**: Type-safe env vars with T3 Env
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **CSRF Protection**: Built into NextAuth.js

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### Docker

```bash
# Build image
docker build -t flashcard-app .

# Run container
docker run -p 3000:3000 flashcard-app
```

### Database Hosting

- **Vercel Postgres**: Integrated PostgreSQL
- **Neon**: Serverless PostgreSQL
- **Supabase**: Open-source Firebase alternative
- **Railway**: Simple deployment platform

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is built with the T3 Stack. See individual package licenses for details.

## 🔗 Resources

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💬 Support

For questions and support:

- [T3 Discord](https://t3.gg/discord)
- [GitHub Issues](https://github.com/t3-oss/create-t3-app)

---

**Built with ❤️ using the T3 Stack**
