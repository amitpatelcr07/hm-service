# 🏠 HomeConnect - Home Service Marketplace

A Full Stack Home Service Marketplace where:

- 👤 Customers can post home service jobs.
- 👷 Workers can browse and apply for jobs.

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Redux Toolkit
- React Query

## Backend

- Node.js
- Express.js
- JWT Authentication
- Prisma ORM

## Database

- PostgreSQL (Neon)

## Image Upload

- Cloudinary

## Deployment

Frontend → Vercel

Backend → Render

Database → Neon

---

# 📌 Project Phases

## Phase 1

✔ Project Planning

✔ Create GitHub Repository

✔ Setup React

✔ Setup Express

✔ Setup PostgreSQL

✔ Connect Prisma

---

## Phase 2

Authentication

- Register
- Login
- JWT
- Password Hashing
- Protected Routes
- Role Based Login

---

## Phase 3

Customer Dashboard

- Create Job
- Edit Job
- Delete Job
- View Applicants

---

## Phase 4

Worker Dashboard

- Complete Profile
- Browse Jobs
- Apply Jobs
- View Applied Jobs

---

## Phase 5

Real Time Chat

Socket.io

---

## Phase 6

Payments

Stripe / Razorpay

---

## Phase 7

Deployment

Frontend

Backend

Database

CI/CD

---

# 📂 Folder Structure

```
HomeConnect

frontend/

backend/
```

---

# Step 1 : Create Repository

```
HomeConnect
```

Inside it

```
frontend

backend
```

---

# Step 2 : React Setup

Open terminal

```
cd frontend
```

Create React App using Vite

```bash
npm create vite@latest .
```

Choose

```
React

JavaScript
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

You should see

```
http://localhost:5173
```

---

# Step 3 : Backend Setup

Go back

```
cd ..
```

Move inside backend

```bash
cd backend
```

Initialize Node

```bash
npm init -y
```

Install Express

```bash
npm install express
```

Install Development Dependency

```bash
npm install -D nodemon
```

Create

```
server.js
```

Example

```js
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```

Update package.json

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

Run

```bash
npm run dev
```

Open

```
http://localhost:5000
```

Output

```
Backend Running
```

---

# Step 4 : Create Neon Account

Visit

https://neon.tech

Create account using GitHub.

Create Project

```
HomeConnect
```

Create Database

```
homeconnect
```

Copy Connection String

Example

```
postgresql://username:password@host.neon.tech/homeconnect?sslmode=require
```

Don't share this with anyone.

---

# Step 5 : Install Prisma

Inside backend

```bash
npm install prisma --save-dev
```

Install Prisma Client

```bash
npm install @prisma/client
```

Initialize Prisma

```bash
npx prisma init
```

New folders

```
prisma/

.env
```

---

# Step 6 : Configure Database

Open

```
.env
```

Replace

```
DATABASE_URL=""
```

with your Neon URL

Example

```
DATABASE_URL="postgresql://username:password@host.neon.tech/homeconnect?sslmode=require"
```

Save.

---

# Step 7 : Test Database Connection

Run

```bash
npx prisma db pull
```

If successful

```
Introspected database successfully
```

Congratulations 🎉

Backend is connected to Neon.

---

# Step 8 : Generate Prisma Client

```bash
npx prisma generate
```

---

# Step 9 : Verify Everything

Frontend

```
npm run dev
```

Backend

```
npm run dev
```

Database

```
Neon Connected
```

Everything should now be ready for development.

---

# 📌 Current Status Checklist

- [ ] GitHub Repository Created
- [ ] React Setup Completed
- [ ] Express Setup Completed
- [ ] Neon Database Created
- [ ] Prisma Installed
- [ ] Prisma Connected
- [ ] Backend Running
- [ ] Frontend Running

---

# 🚀 Next Phase

Phase 2

Authentication

- User Registration
- Login
- JWT
- Bcrypt
- Prisma User Model
- Role Based Authentication
- Protected Routes

Start working Day 1-->
Project Structure
HomeConnect/
│
├── frontend/
│
├── backend/
│
├── docs/
│ ├── api/
│ ├── architecture/
│ └── database/
│
├── .gitignore
├── README.md
└── LICENSE

frontend structure

frontend/
│
├── public/
│
├── src/
│
│ ├── api/
│ │ axios.js
│ │
│ ├── assets/
│ │ images/
│ │ icons/
│ │
│ ├── components/
│ │ common/
│ │ forms/
│ │ navbar/
│ │ sidebar/
│ │ cards/
│ │ modals/
│ │
│ ├── layouts/
│ │ MainLayout.jsx
│ │ DashboardLayout.jsx
│ │
│ ├── pages/
│ │
│ │ auth/
│ │ Login.jsx
│ │ Register.jsx
│ │ ForgotPassword.jsx
│ │
│ │ customer/
│ │ Dashboard.jsx
│ │ CreateJob.jsx
│ │ MyJobs.jsx
│ │ Applicants.jsx
│ │
│ │ worker/
│ │ Dashboard.jsx
│ │ BrowseJobs.jsx
│ │ AppliedJobs.jsx
│ │ Profile.jsx
│ │
│ │ shared/
│ │ Home.jsx
│ │ About.jsx
│ │ Contact.jsx
│ │ NotFound.jsx
│ │
│ ├── routes/
│ │ AppRoutes.jsx
│ │ ProtectedRoute.jsx
│ │
│ ├── redux/
│ │ store.js
│ │
│ │ slices/
│ │ authSlice.js
│ │ jobSlice.js
│ │ notificationSlice.js
│ │
│ ├── hooks/
│ │ useAuth.js
│ │
│ ├── context/
│ │
│ ├── utils/
│ │ constants.js
│ │ helpers.js
│ │
│ ├── services/
│ │ authService.js
│ │ jobService.js
│ │
│ ├── styles/
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── .env
├── package.json
└── vite.config.js

backend structure

backend/
│
├── prisma/
│ schema.prisma
│ migrations/
│
├── src/
│
│ ├── config/
│ │ db.js
│ │ cloudinary.js
│ │
│ ├── controllers/
│ │ auth.controller.js
│ │ user.controller.js
│ │ job.controller.js
│ │ application.controller.js
│ │
│ ├── routes/
│ │ auth.routes.js
│ │ user.routes.js
│ │ job.routes.js
│ │ application.routes.js
│ │
│ ├── middlewares/
│ │ auth.middleware.js
│ │ role.middleware.js
│ │ upload.middleware.js
│ │ error.middleware.js
│ │
│ ├── services/
│ │ auth.service.js
│ │ job.service.js
│ │
│ ├── repositories/
│ │ user.repository.js
│ │ job.repository.js
│ │
│ ├── validations/
│ │ auth.validation.js
│ │ job.validation.js
│ │
│ ├── sockets/
│ │ socket.js
│ │
│ ├── utils/
│ │ jwt.js
│ │ bcrypt.js
│ │
│ ├── app.js
│ └── server.js
│
├── .env
├── package.json
└── README.md

database we will use neon + prisma

React

↓

Axios

↓

Express

↓

Prisma

↓

Neon PostgreSQL

Git Branch Strategy

Instead of committing everything to main, we'll follow a professional workflow.

main

develop

feature/auth

feature/jobs

feature/profile

feature/chat

feature/payment

One suggestion

Since this is a long-term project, I also recommend creating a docs/ folder from day one. We'll keep:

docs/
│
├── architecture.md
├── database-design.md
├── api-documentation.md
├── deployment.md
└── project-roadmap.md

phase 2-->

# 📌 Phase 2 - Database Design & Planning

## 🎯 Objective

The goal of Phase 2 is to design the entire database before writing any backend code.

A well-designed database is the foundation of every application. Once the database structure is finalized, implementing APIs, authentication, and frontend features becomes much easier.

At the end of this phase, no business logic or APIs will be written. We will only design and validate the database.

---

# Why Database Design First?

Changing the database after building APIs and frontend is expensive.

Correct Development Flow:

Requirements
↓
Database Design
↓
API Design
↓
Backend Development
↓
Frontend Development
↓
Testing
↓
Deployment

---

# Deliverables

By the end of Phase 2 we should have:

- Complete Requirement Analysis
- User Roles
- Feature List
- Entity List
- Entity Relationship Diagram (ERD)
- Database Relationships
- Prisma Schema
- Database Migration
- PostgreSQL Tables created in Neon
- Prisma Client Generated

---

# Step 1 - Requirement Analysis

Identify what the application should do.

## Customer

- Register
- Login
- Update Profile
- Post Jobs
- Edit Jobs
- Delete Jobs
- View Applicants
- Hire Worker
- Chat with Worker
- Review Worker
- Make Payment

---

## Worker

- Register
- Login
- Update Profile
- Browse Jobs
- Search Jobs
- Apply for Jobs
- Accept Job
- Mark Job as Completed
- Chat with Customer
- Receive Payment
- View Reviews

---

## System Features

- JWT Authentication
- Role Based Authorization
- Notifications
- Search & Filters
- Image Upload
- Email Notifications

---

# Step 2 - Identify Entities

Convert business requirements into database tables.

Entities:

- User
- WorkerProfile
- Job
- JobApplication
- Review
- Payment
- Message
- Notification

---

# Step 3 - Design Each Entity

Before writing Prisma models, define the fields for every table.

Example:

User

- id
- name
- email
- password
- phone
- role
- profileImage
- createdAt
- updatedAt

Do the same for every entity.

---

# Step 4 - Define Relationships

Determine how tables are connected.

Examples:

One Customer
↓
Many Jobs

One Worker
↓
Many Job Applications

One Job
↓
Many Job Applications

One Worker
↓
Many Reviews

One Customer
↓
Many Payments

---

# Step 5 - Create ER Diagram

Draw a visual representation of the database.

Example:

User
│
├──────────────┐
│ │
WorkerProfile Job
│
│
JobApplication
│
┌──────────┴──────────┐
│ │
Payment Review
│
Message

This diagram becomes the blueprint for the backend.

---

# Step 6 - Database Normalization

Verify the database follows good relational design.

Check:

- Duplicate data
- Proper Foreign Keys
- Proper Primary Keys
- Required Constraints
- Nullable Fields
- One-to-One Relationships
- One-to-Many Relationships
- Many-to-Many Relationships

---

# Step 7 - Write Prisma Schema

Only after the design is finalized.

Create Prisma models for:

- User
- WorkerProfile
- Job
- JobApplication
- Review
- Payment
- Message
- Notification

Add:

- Relations
- Constraints
- Default Values
- Enums
- Indexes

---

# Step 8 - Run Database Migration

Generate PostgreSQL tables.

Commands:

npx prisma migrate dev --name init

Then generate Prisma Client.

Command:

npx prisma generate

---

# Step 9 - Verify Database

Verify:

- Tables are created in Neon
- Migration completed successfully
- Prisma Client generated successfully
- Prisma Studio opens correctly

Command:

npx prisma studio

---

# Best Practices

- Never start backend coding before database design.
- Use meaningful table names.
- Use UUID/CUID IDs.
- Store passwords as hashes only.
- Use Foreign Keys for relationships.
- Avoid duplicate data.
- Add timestamps to every table.
- Keep database normalized.

---

# Interview Topics Covered

During this phase you should understand:

- Database Design
- ER Diagram
- Entity Identification
- Primary Key
- Foreign Key
- One-to-One Relationship
- One-to-Many Relationship
- Many-to-Many Relationship
- Normalization
- Prisma ORM
- Prisma Relations
- Database Migrations
- PostgreSQL Relational Design

---

# Completion Checklist

- [ ] Requirements finalized
- [ ] Features listed
- [ ] Entities identified
- [ ] Fields finalized
- [ ] Relationships finalized
- [ ] ER Diagram created
- [ ] Prisma schema completed
- [ ] Migration executed
- [ ] Tables created in Neon
- [ ] Prisma Client generated
- [ ] Prisma Studio verified

---

# Next Phase

Phase 3

Authentication & Authorization

- User Registration
- Login
- Password Hashing (bcrypt)
- JWT Authentication
- Role Based Authorization
- Protected Routes
- Refresh Token (Optional)
