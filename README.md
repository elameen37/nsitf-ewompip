# NSITF EWOMPIP
> **Nigeria Social Insurance Trust Fund** — Electronic Workplace Operations & Medical Operations Management Platform

[![CI Pipeline](https://github.com/elameen37/nsitf-ewompip/actions/workflows/ci.yml/badge.svg)](https://github.com/elameen37/nsitf-ewompip/actions)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

---

## 📌 Project Overview

**NSITF EWOMPIP** is a state-of-the-art web platform engineered for managing employee workplace operations, attendance, productivity metrics, performance management system (PMS) appraisals, organizational hierarchy, audit logging, and AI-assisted operational analytics for the Nigeria Social Insurance Trust Fund.

### Key Modules:
- **Executive Dashboard**: High-level organizational statistics, regional operational status, and real-time metrics.
- **Attendance Management**: Digital attendance tracking, check-ins, leave approvals, and roster scheduling.
- **Productivity & PMS**: Employee performance appraisal system, task completion rates, and goal tracking.
- **AI Operational Analytics**: Intelligent Insights Copilot, predictive telemetry, and analytics visualization.
- **Organization & Audit**: Hierarchy management, role-based access control, and tamper-evident audit logs.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, Framer Motion, Lucide Icons
- **State & Data**: React Context (Telemetry & Theme), Recharts, Zod
- **Containerization & Hosting**: Docker (Multi-stage build), Nginx (Alpine), Docker Compose
- **CI/CD & Tooling**: GitHub Actions, ESLint, Prettier

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/elameen37/nsitf-ewompip.git
   cd nsitf-ewompip
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 🐳 Running with Docker

### Production Docker Container

Build and launch the optimized production Nginx container:

```bash
# Using Docker Compose
docker-compose up --build -d

# OR using npm scripts / standard Docker CLI
npm run docker:build
npm run docker:run
```
Access the application at `http://localhost:8080` (Healthcheck endpoint available at `http://localhost:8080/health`).

### Local Development in Docker (Hot Reload)

To run in a container with live code reload attached:

```bash
docker-compose -f docker-compose.dev.yml up --build
# OR
npm run docker:dev
```
Access the dev instance at `http://localhost:3000`.

---

## 🧪 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server on port `3000` |
| `npm run build` | Compiles TypeScript and builds Vite bundle for production |
| `npm run preview` | Previews production build locally |
| `npm run lint` | Runs TypeScript static type checking without emitting files |
| `npm run format` | Formats all code files using Prettier |
| `npm run docker:build` | Builds production Docker image `nsitf-ewompip:latest` |
| `npm run docker:run` | Runs container mapping `8080:80` |
| `npm run docker:dev` | Spawns local development environment in Docker |

---

## 📂 Project Structure

```
nsitf-ewompip/
├── .github/workflows/    # CI/CD pipeline automation
│   └── ci.yml
├── public/               # Public static assets
├── src/                  # Source files
│   ├── components/       # Layout, modules, and common UI components
│   ├── context/          # React Context providers (Telemetry, Theme)
│   ├── mock/             # Mock datasets for offline development
│   ├── types/            # TypeScript interfaces & domain models
│   ├── App.tsx           # Main Application Layout & Tab Router
│   ├── main.tsx          # React Root DOM Mount
│   └── index.css         # Tailwind & Custom CSS styles
├── Dockerfile            # Multi-stage production container setup
├── Dockerfile.dev        # Development container setup
├── docker-compose.yml    # Production Compose orchestration
├── docker-compose.dev.yml# Dev Compose orchestration
├── nginx.conf            # Nginx web server configuration & security headers
├── tailwind.config.js    # Tailwind styling design tokens
├── tsconfig.json         # TypeScript compiler configuration
└── vite.config.ts        # Vite bundler configuration
```

---

## 🛡️ License & Ownership

Developed for **Nigeria Social Insurance Trust Fund (NSITF)**. All rights reserved.
