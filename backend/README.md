# Weekly Report Generator & Team Dashboard - Backend

Backend API for the **Weekly Report Generator & Team Dashboard** application.

This backend provides RESTful APIs for user authentication, role-based authorization, project management, weekly report management, and manager-level report analytics.

The system allows team members to submit structured weekly reports while enabling managers to monitor team activity through consolidated data.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* JavaScript (ES Modules)
* Prisma ORM

## Database

* PostgreSQL

## Security & Authentication

* JWT Authentication
* bcrypt Password Hashing
* Role-Based Access Control (RBAC)

## Development Tools

* Postman (API Testing)
* Prisma Migrations
* Morgan (Request Logging)
* Helmet (Security Headers)

---

# System Architecture

The backend follows a layered architecture:

```
Request

   ↓

Routes

   ↓

Controllers

   ↓

Services

   ↓

Prisma ORM

   ↓

PostgreSQL Database
```

## Folder Structure

```
backend/

src/
│
├── config/
│   └── prisma.js              # Prisma client configuration
│
├── controllers/
│   ├── auth.controller.js
│   ├── project.controller.js
│   └── report.controller.js
│
├── middleware/
│   ├── auth.middleware.js     # JWT verification
│   └── role.middleware.js     # Role authorization
│
├── routes/
│   ├── auth.routes.js
│   ├── project.routes.js
│   └── report.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── project.service.js
│   └── report.service.js
│
└── app.js

prisma/
│
├── schema.prisma
├── seed.js
└── migrations/
```

---

# Features Implemented

## Authentication & Authorization

Implemented:

* User registration
* User login
* Password hashing
* JWT token generation
* Protected API routes
* Role-based authorization

Supported roles:

```
MEMBER
MANAGER
```

---

## Member Features

Team members can:

* Create weekly reports
* View their previous reports
* Edit their reports
* Submit reports

Report lifecycle:

```
DRAFT

   ↓

SUBMITTED

   ↓

LOCKED
```

---

## Manager Features

Managers can:

* View all team reports
* Access report details with user and project information
* Monitor submission status

Manager-only endpoints are protected using role middleware.

---

# Database Design

The application uses PostgreSQL with Prisma ORM.

Main entities:

## User

Stores system users and authentication information.

Fields include:

* Name
* Email
* Password hash
* Role

---

## Project

Stores projects/categories that reports belong to.

Examples:

* Client Projects
* Internal Tools
* Research

---

## Report

Stores weekly work submissions.

Includes:

* Reporting week and year
* Project association
* Completed tasks
* Planned tasks
* Blockers
* Hours worked
* Notes
* Submission status

---

## ProjectMember

Handles project-user relationships.

---

# API Endpoints

## Authentication

### Register User

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

# Projects

### Create Project

```
POST /api/projects
```

### Get Projects

```
GET /api/projects
```

### Update Project

```
PUT /api/projects/:id
```

### Delete Project

```
DELETE /api/projects/:id
```

---

# Reports

## Member Endpoints

### Create Report

```
POST /api/reports
```

Creates a report with:

```
submissionStatus = DRAFT
```

---

### View Own Reports

```
GET /api/reports/my
```

---

### Update Report

```
PUT /api/reports/:id
```

Members can edit their own reports while they are not locked.

---

### Submit Report

```
PATCH /api/reports/:id/submit
```

Changes:

```
DRAFT → SUBMITTED
```

---

## Manager Endpoint

### View All Reports

```
GET /api/reports
```

Returns:

* Report details
* User information
* Project information
* Submission status

Only accessible by MANAGER users.

---

# Authentication Flow

1. User logs in with email and password.

2. Backend verifies password using bcrypt.

3. JWT token is generated.

4. Client sends token with protected requests.

Example:

```
Authorization: Bearer <token>
```

5. Middleware validates the token before allowing access.

---

# Validation & Security

Implemented:

## Password Security

Passwords are never stored directly.

bcrypt hashing is used before saving user credentials.

---

## Authorization

Users can only modify their own reports.

Manager-only resources are protected through role middleware.

---

## Duplicate Report Prevention

A user cannot create multiple reports for the same:

* Project
* Week
* Year

Database constraint:

```
(userId, projectId, reportWeek, reportYear)
```

---

# Environment Setup

## Requirements

Install:

* Node.js
* PostgreSQL

---

# Installation

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

JWT_SECRET="your_secret_key"

PORT=5000
```

---

# Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed initial data:

```bash
npm run seed
```

---

# Running the Backend

Development mode:

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# Demo Credentials

Seeded manager account:

```
Email:
manager@test.com

Password:
Manager@123
```

---

# Future Improvements

Possible enhancements:

* Password reset functionality
* Email notifications
* Refresh token authentication
* Advanced analytics
* AI-powered team assistant
* Report deadline automation
* Pagination for large datasets

---

# Author
Safwan
Software Engineering Internship Assignment Project
