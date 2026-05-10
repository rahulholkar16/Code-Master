# Code-Master 🚀

A modern full-stack LeetCode-style coding platform built with Next.js, TypeScript, Prisma, and Judge0.

Code-Master allows users to solve coding problems, track submissions, manage playlists, monitor coding progress, and practice coding interview questions in a real online judge environment.

---

# ✨ Features

## 🔐 Authentication

* Secure authentication system
* Sign up / Sign in flow
* Session management
* Protected routes
* Role-based access support

## 💻 Online Judge System

* Real-time code execution using Judge0
* Multiple programming language support
* Test case execution
* Runtime and memory tracking
* Submission history
* Compilation error handling

## 📚 Problem Management

* Create coding problems
* Add examples and constraints
* Add hidden/public test cases
* Difficulty-based filtering
* Problem descriptions and explanations
* Pagination and search

## 📂 Playlists

* Create custom playlists
* Add/remove problems
* Public/private playlist support
* Curated interview preparation sets

## 👤 User Profile

* Submission calendar
* Coding streak tracking
* Accepted submission stats
* Language usage analytics
* Recent activity tracking

## 🎨 Modern UI

* Responsive design
* Dark/light mode
* Modular component architecture
* Accessible UI components
* Optimized developer experience

---

# 🏗️ Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Zustand
* TanStack Query

## Backend

* Next.js Route Handlers
* Server Actions
* Prisma ORM
* PostgreSQL

## Authentication

* Better Auth

## Code Execution

* Judge0

## Infrastructure

* Docker
* Docker Compose
* Bun Runtime

## Planned Scalable Infrastructure

* Redis
* BullMQ
* Queue Workers
* Background Jobs
* Event-Driven Architecture

---

# 📁 Project Architecture

```txt
app/
 ├── (auth)/
 ├── (protected)/
 ├── (root)/
 └── api/

modules/
 ├── auth/
 ├── problem/
 ├── profile/
 ├── create-playlist/
 └── home/

components/
 ├── ui/
 └── provider/

lib/
 ├── auth.ts
 ├── db.ts
 ├── judge0.ts
 └── utils.ts

prisma/
 ├── schema.prisma
 └── migrations/
```

---

# 🧠 Architecture Philosophy

This project follows a feature-based modular architecture.

Each module contains:

* API layer
* Actions
* Hooks
* Components
* Validation
* State management
* Business logic

This structure improves:

* scalability
* maintainability
* separation of concerns
* team collaboration
* code organization

---

# ⚡ Planned Large Scale Architecture

Code-Master is evolving toward a distributed event-driven system.

Future architecture:

```txt
Submission Created
        ↓
Redis Queue
        ↓
BullMQ Worker
        ↓
Background Processors
        ↓
Aggregated User Statistics
        ↓
Fast Profile Reads
```

## Planned Optimizations

* Queue workers
* Background jobs
* Cached profile statistics
* Incremental aggregation
* Event-driven updates
* Distributed processing
* Read-optimized profile system

---

# 🗄️ Database Models

Core models include:

* User
* Problem
* Submission
* TestCase
* ProblemSolved
* Playlist
* ProblemsInPlaylist
* ReferenceSolution
* Tag

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/rahulholkar16/Code-Master.git
cd Code-Master
```

## 2. Install dependencies

Using Bun:

```bash
bun install
```

---

# ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
JUDGE0_API_URL=
```

---

# 🛢️ Database Setup

## Generate Prisma Client

```bash
bunx prisma generate
```

## Run Migrations

```bash
bunx prisma migrate dev
```

---

# ▶️ Run Development Server

```bash
bun run dev
```

Application will run on:

```txt
http://localhost:3000
```

---

# 🐳 Docker Setup

## Start services

```bash
docker compose up --build
```

---

# 📌 Future Roadmap

## Core Features

* Contest system
* Real-time multiplayer coding
* Discussion forums
* AI hints and explanations
* Problem recommendation engine
* Company-wise problem sheets

## Infrastructure

* Redis caching
* BullMQ workers
* WebSocket submissions
* Microservice extraction
* Kubernetes deployment
* Distributed judging system

## Performance

* Cached aggregations
* Optimized queries
* Incremental updates
* Edge-ready APIs

---

# 🧪 Development Goals

This project is designed to explore:

* scalable system design
* distributed architecture
* event-driven processing
* online judge systems
* modern full-stack development
* high-performance profile analytics

---

# 🤝 Contributing

Contributions are welcome.

Feel free to:

* open issues
* suggest improvements
* submit pull requests
* optimize architecture
* improve UI/UX

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built by Rahul.

GitHub:
[https://github.com/rahulholkar16](https://github.com/rahulholkar16)

---

# ⭐ Support

If you like this project, consider giving it a star on GitHub.
