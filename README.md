# Weekly Report Generator & Team Dashboard

A full-stack web application that enables team members to submit structured weekly work reports and allows managers to monitor, review, and analyze team activity through a centralized dashboard.

This project was developed as a Software Engineering technical assignment focusing on:

* Role-based authentication
* Multi-user workflow management
* REST API development
* Database modeling
* Responsive frontend architecture
* Clean backend service architecture

---

# Project Overview

The **Weekly Report Generator & Team Dashboard** provides a structured platform for managing weekly team reports.

The system supports two main user roles:

## Team Member

Team members can:

* Register and login securely
* Create weekly reports
* Manage draft reports
* Submit completed reports
* View personal report history

## Manager

Managers can:

* View reports from all team members
* Monitor submission status
* Filter reports by member, project, and status
* Review submitted reports
* Lock completed reports
* Manage project categories

The application ensures every report follows a fixed structure, allowing consistent reporting and easier comparison across the team.

---

# Repository Structure

This repository follows a **monorepo architecture** where both frontend and backend applications are maintained together.

```text
weekly-report-generator/

│
├── frontend/
│   ├── React application
│   └── README.md
│       # Frontend setup and implementation documentation
│
│
├── backend/
│   ├── Express REST API
│   └── README.md
│       # Backend setup and implementation documentation
│
│
└── README.md
    # Main project overview and monorepo documentation
```

---

# Documentation

Both frontend and backend folders contain their own detailed README files covering implementation details and setup instructions.

## Frontend Documentation

The frontend README covers:

* React application architecture
* Project folder structure
* Component organization
* Routing implementation
* Authentication flow
* Role-based UI protection
* API service integration
* Environment configuration
* Installation instructions
* Development commands

Frontend documentation:

```
frontend/README.md
```

---

## Backend Documentation

The backend README covers:

* Backend architecture
* REST API design
* Controller-service structure
* Authentication implementation
* Role-based access control
* Database design
* Prisma ORM configuration
* Environment setup
* Database migrations
* API endpoints
* Running instructions

Backend documentation:

```
backend/README.md
```

For complete technical details, configuration steps, and development instructions, refer to the README file inside the respective application folder.

---

# System Architecture

The application follows a client-server architecture.

```text
                    User

                     |

                     |

              React Frontend

                     |

                     |

              REST API Layer

                     |

                     |

          Node.js + Express Backend

                     |

                     |

              Prisma ORM

                     |

                     |

             PostgreSQL Database

```

---

# Technology Stack

## Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS
* React Hook Form

## Backend

* Node.js
* Express.js
* JavaScript (ES Modules)
* Prisma ORM

## Database

* PostgreSQL

## Security

* JWT Authentication
* bcrypt Password Hashing
* Role-Based Access Control

## Development Tools

* Postman
* Prisma Migrations
* Git & GitHub

---

# Implemented Features

## Authentication & Authorization

Implemented:

* User registration
* User login
* Logout functionality
* Password hashing
* JWT authentication
* Protected routes
* Role-based authorization

Supported roles:

| Role    | Access                                |
| ------- | ------------------------------------- |
| MEMBER  | Personal report management            |
| MANAGER | Team dashboard and project management |

---

# Weekly Report Management

Weekly reports follow a fixed structure to maintain consistency across all team members.

Report fields include:

* Week number
* Year
* Project/category
* Tasks completed
* Tasks planned
* Blockers/challenges
* Hours worked
* Additional notes

Report lifecycle:

```text
DRAFT

   ↓

SUBMITTED

   ↓

LOCKED
```

Team members can edit reports while they remain in draft state.

Once submitted, reports become available for manager review.

---

# Manager Dashboard

Managers have access to a centralized dashboard for monitoring team activity.

Implemented features:

* View all team reports
* View team member information
* View project information
* Track submission status
* Review report details
* Lock submitted reports

Filtering support:

* Team member
* Project/category
* Submission status

---

# Project Management

Managers can manage project categories attached to reports.

Available operations:

* Create projects
* Update projects
* Deactivate projects

Examples:

* Client Projects
* Internal Tools
* Research & Development

---

# Database Overview

The system uses PostgreSQL with Prisma ORM.

Main entities:

## User

Stores:

* User information
* Authentication credentials
* User role

## Project

Stores:

* Project/category information
* Active status

## Report

Stores:

* Weekly submissions
* Project association
* Work details
* Submission lifecycle

## ProjectMember

Handles relationships between users and projects.

Database relationship overview:

```text
User

 |

 | 1:N

 |

Report

 |

 | N:1

 |

Project

```

---

# Installation & Setup

## Prerequisites

Install:

* Node.js
* npm
* PostgreSQL

---

# Clone Repository

```bash
git clone <repository-url>

cd weekly-report-generator
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure environment variables and database settings.

Detailed instructions are available in:

```
backend/README.md
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure frontend environment variables.

Detailed instructions are available in:

```
frontend/README.md
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Communication Flow

The frontend communicates with backend services through an Axios-based service layer.

```text
React Components

        ↓

Frontend Services

        ↓

Axios API Client

        ↓

Backend REST API

        ↓

Database

```

This separation keeps UI components independent from backend communication logic.

---

# Security Implementation

Implemented security measures:

## Authentication

* JWT token authentication
* Secure password hashing
* Protected API endpoints

## Authorization

* Role-based route protection
* Manager-only resources
* User ownership validation

## Data Protection

* Passwords are never stored in plain text
* Users can only modify authorized resources

---

# Assignment Requirement Coverage

| Requirement               | Status               |
| ------------------------- | -------------------- |
| User Authentication       | ✅ Implemented        |
| Role-Based Access Control | ✅ Implemented        |
| Weekly Report Management  | ✅ Implemented        |
| Manager Dashboard         | ✅ Implemented        |
| Project Management        | ✅ Implemented        |
| REST API                  | ✅ Implemented        |
| Database Design           | ✅ Implemented        |
| Responsive UI             | ✅ Implemented        |
| AI Chat Assistant         | ⏳ Future Enhancement |

---

# Future Improvements

Possible enhancements:

* Dashboard charts and advanced analytics
* AI-powered team assistant
* Automated weekly summaries
* Email notifications
* Report deadline reminders
* PDF/Excel report export
* Advanced workload analysis
* Project member assignment management

---

# Project Resources

## Frontend Documentation

```
frontend/README.md
```

## Backend Documentation

```
backend/README.md
```


# Author

Safwan

Software Engineering Undergraduate

Weekly Report Generator & Team Dashboard

Software Engineering Assignment Project
