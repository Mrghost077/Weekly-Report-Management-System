# Weekly Report Management System - Frontend

A modern React-based frontend application for the **Weekly Report Generator & Team Dashboard** system.

This application provides a role-based user interface where team members can create and manage weekly reports, while managers can review, analyze, and manage team submissions through a centralized dashboard.

---

# Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technology Stack](#technology-stack)
* [Application Architecture](#application-architecture)
* [Project Structure](#project-structure)
* [User Roles & Workflows](#user-roles--workflows)
* [Frontend Implementation](#frontend-implementation)
* [API Communication](#api-communication)
* [Installation & Setup](#installation--setup)
* [Available Scripts](#available-scripts)
* [Environment Configuration](#environment-configuration)
* [Security & Access Control](#security--access-control)
* [Future Improvements](#future-improvements)

---

# Overview

The Weekly Report Management System frontend is built using **React.js** and provides a responsive, component-based user interface for managing weekly work reports.

The application supports two main user roles:

* **Team Member**

  * Create weekly reports
  * Edit draft reports
  * Submit reports
  * View personal report history

* **Manager**

  * View reports from all team members
  * Analyze submission status
  * Filter reports
  * Manage projects/categories
  * Lock submitted reports

The frontend communicates with a REST API backend for authentication, report management, and project management operations.

---

# Features

## Authentication & Role Management

Implemented features:

* User registration
* User login
* Logout functionality
* Role-based route protection
* Session persistence
* Protected navigation based on user role

Supported roles:

| Role    | Access                                   |
| ------- | ---------------------------------------- |
| MEMBER  | Personal dashboard and report management |
| MANAGER | Team dashboard and project management    |

---

# Team Member Features

## Personal Dashboard

Team members have access to their own dashboard containing:

* Personal report overview
* Navigation to report management pages
* Quick access to create reports

---

## Weekly Report Management

Team members can:

### Create Reports

Reports contain a fixed structure to ensure consistency across the organization.

Report fields:

* Week number
* Year
* Project/category
* Tasks completed
* Tasks planned
* Blockers/challenges
* Hours worked
* Additional notes

### Edit Reports

Members can update their reports before final submission.

Editable information includes:

* Project
* Tasks completed
* Tasks planned
* Blockers
* Hours worked
* Notes

Week and year values remain fixed to maintain report consistency.

### Submit Reports

Members can submit completed reports.

Report lifecycle:

```
DRAFT
  |
  ↓
SUBMITTED
  |
  ↓
LOCKED
```

---

## Report History

Members can:

* View previously created reports
* Check submission status
* Manage draft reports

---

# Manager Features

## Team Dashboard

Managers have access to a centralized dashboard for monitoring team activity.

Features include:

* View all team reports
* View member details
* Track report status
* View submission dates
* Lock submitted reports

---

## Report Filtering

Managers can filter reports based on:

* Team member
* Project/category
* Submission status

---

## Project Management

Managers can manage project categories.

Available operations:

* Create projects
* Edit projects
* Deactivate projects

Projects are attached to weekly reports to categorize team activities.

---

# Technology Stack

## Frontend

| Technology      | Purpose                                |
| --------------- | -------------------------------------- |
| React.js        | UI development                         |
| Vite            | Development environment and build tool |
| React Router    | Client-side routing                    |
| Axios           | API communication                      |
| React Hook Form | Form handling                          |
| Tailwind CSS    | Styling and responsive UI              |

---

# Application Architecture

The frontend follows a modular component-based structure.

High-level architecture:

```
React Application

        |
        |

Routes

        |
        |

Layouts

        |
        |
-------------------------
|                       |
Member Layout      Manager Layout

|                       |

Reports             Dashboard
Projects            Analytics
```

---

# Project Structure

```
src
│
├── components
│
├── context
│   └── AuthContext.jsx
│
├── layouts
│   ├── MemberLayout.jsx
│   └── ManagerLayout.jsx
│
├── pages
│   │
│   ├── auth
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── member
│   │   ├── MemberDashboard.jsx
│   │   ├── MyReports.jsx
│   │   ├── CreateReport.jsx
│   │   └── EditReport.jsx
│   │
│   └── manager
│       ├── ManagerDashboard.jsx
│       ├── Projects.jsx
│       └── ViewReport.jsx
│
├── routes
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services
│   ├── api.js
│   ├── authService.js
│   ├── reportService.js
│   ├── projectService.js
│   └── managerService.js
│
└── App.jsx
```

---

# API Communication

The frontend communicates with the backend through Axios service layers.

Example:

```
Component

   ↓

Service Layer

   ↓

Axios API Client

   ↓

Backend REST API
```

Services available:

## Authentication Service

Handles:

* Login
* Registration
* User session management

## Report Service

Handles:

* Creating reports
* Retrieving reports
* Updating reports
* Submitting reports

## Manager Service

Handles:

* Fetching team reports
* Locking reports

## Project Service

Handles:

* Creating projects
* Updating projects
* Managing project categories

---

# Installation & Setup

## Prerequisites

Make sure you have:

* Node.js installed
* npm installed
* Backend API running

## Clone Repository

```bash
git clone <frontend-repository-url>

cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the frontend root directory.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Update the URL according to the backend deployment environment.

---

## Run Development Server

```bash
npm run dev
```

Application will start on:

```
http://localhost:5173
```

---

# Available Scripts

## Development

```bash
npm run dev
```

Starts the Vite development server.

---

## Production Build

```bash
npm run build
```

Creates an optimized production build.

---

## Preview Production Build

```bash
npm run preview
```

Runs the production build locally.

---

# Security & Access Control

Frontend security measures include:

* Protected routes based on user roles
* Restricted navigation access
* Authentication state management
* Role validation before rendering pages

Example:

```
MEMBER

/member/*
        |
        ✓ Allowed


MANAGER

/manager/*
        |
        ✓ Allowed
```

Unauthorized users are redirected to the login page.

---

# Responsive UI

The application uses Tailwind CSS to provide:

* Responsive layouts
* Mobile-friendly components
* Consistent styling
* Reusable UI patterns

---

# AI Assistant

The AI Chat Assistant feature was not implemented in the current version.

Possible future implementation:

* Manager query assistant
* Automated weekly summaries
* Blocker analysis
* Workload insights

---

# Future Improvements

Possible enhancements:

* Dashboard charts using Recharts/Chart.js
* Advanced analytics
* AI-powered report summaries
* Email notifications
* Real-time updates
* Project member assignment management
* Export reports as PDF/Excel

---

# Related Repositories

Backend Repository:

```
<backend-repository-link>
```

---

# Author
Safwan 
Software Engineering Undergraduate Project

Weekly Report Generator & Team Dashboard
