Step 2 - Create database-design.md

Inside docs/

docs/
database-design.md

This file is your design document.

Step 3 - Write Project Overview

Inside database-design.md

# Database Design

## Project Name

HomeConnect

---

## Project Overview

HomeConnect is a marketplace where two types of users interact.

### Customer

- Can register
- Can login
- Can post jobs
- Can hire workers
- Can chat
- Can review workers

### Worker

- Can register
- Can login
- Can browse jobs
- Can apply for jobs
- Can chat
- Can receive reviews

This is called Requirement Analysis.

Step 4 - Identify Entities

Now ask yourself:

"What things exist in this system?"

Don't think about tables.

Think about nouns.

Example:

User

Job

Application

Review

Payment

Message

Notification

Worker Profile

Write this.

## Entities

1. User
2. Worker Profile
3. Job
4. Job Application
5. Review
6. Payment
7. Message
8. Notification

These will become database tables later.

Step 5 - Define Fields

Now we design one table at a time.

User

Ask:

What information do I need about a user?

Answer:

## User

- id
- fullName
- email
- password
- phone
- role
- profileImage
- createdAt
- updatedAt
  Job

Ask:

"What information should a job have?"

## Job

- id
- title
- description
- category
- budget
- location
- status
- customerId
- createdAt
- updatedAt
  Worker Profile

## Worker Profile

- id
- userId
- experience
- skills
- address
- hourlyRate
- about
  Job Application

## Job Application

- id
- jobId
- workerId
- proposal
- expectedPrice
- status
- createdAt

Continue for:

Review
Message
Payment
Notification
Step 6 - Define Relationships

Now ask:

Can one customer create many jobs?

Yes.

Write

One User

↓

Many Jobs

Can one worker apply to many jobs?

Yes.

One Worker

↓

Many Job Applications

Can one Job receive many applications?

Yes.

One Job

↓

Many Job Applications

Write all relationships.

Step 7 - Draw ER Diagram

Don't worry about making it beautiful.

Just write.

               User
           ------------
            id
            name
            email
            role
           ------------
                 |
        -------------------
        |                 |
        |                 |

WorkerProfile Job
| |
| |
| JobApplication
| |
| |
Review Payment
\
 \
 Message

Later we'll use a proper ER diagram tool.

Step 8 - Review the Design

Now ask:

Does every table have:

✅ Primary Key

✅ Foreign Key

✅ createdAt

✅ updatedAt

Step 9 - Only Now Write Prisma

Now open

backend/prisma/schema.prisma

and convert the design into Prisma models.

Not before.

Folder Structure
HomeConnect

│

├── frontend

├── backend

│ └── prisma

│ schema.prisma

│

├── docs

│ database-design.md

│

└── README.md
What We're Building
Requirement Analysis
│
▼
Identify Entities
│
▼
Define Fields
│
▼
Define Relationships
│
▼
Draw ER Diagram
│
▼
Review Database
│
▼
Prisma Schema
│
▼
Migration
│
▼
Backend Coding
Your Task (Today)

Don't write any Prisma code yet.

Create this file:

docs/database-design.md

And complete these sections:

Project Overview
User Roles
Features
Entities
Fields for each entity
Relationships (text format)

Don't worry about the ER diagram yet.

What we'll do together next

In the next step, I'll help you design each table like a senior backend architect. We'll discuss questions such as:

Should WorkerProfile be a separate table or part of User?
Should Job.status be a string or an enum?
Should Payment reference Job or JobApplication?
How do we model chat messages efficiently?
Which fields should be indexed?
Which fields should be unique?

job --->

give me job model so that i can create a sql table

Perfect. Since we're designing this as a production-ready HomeConnect application, let's create a proper Job model.

Step 1: What is the Job table?

This table stores every service request posted by a customer.

Example:

Customer Title Budget Status
Amit Fix AC ₹500 OPEN
Rahul House Painting ₹8000 IN_PROGRESS
Priya Plumbing Repair ₹1200 COMPLETED
Step 2: Add a JobCategory Enum

In backend/prisma/schema.prisma, above your models, add:

enum JobCategory {
PLUMBING
ELECTRICAL
PAINTING
CARPENTRY
CLEANING
APPLIANCE_REPAIR
OTHER
}

This avoids storing inconsistent values like "Plumbing", "plumber", "PLUMBING".

Step 3: Update the User Model

Add this relation:

jobs Job[]

Your User model will now have:

model User {
id String @id @default(cuid())
fullName String
email String @unique
password String
phone String?
role Role
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

workerProfile WorkerProfile?
jobs Job[]
}
Step 4: Create the Job Model

Below WorkerProfile, add:

model Job {
id String @id @default(cuid())

customerId String
customer User @relation(fields: [customerId], references: [id], onDelete: Cascade)

title String
description String

category JobCategory

location String

budget Decimal @db.Decimal(10,2)

status JobStatus @default(OPEN)

requiredDate DateTime?

createdAt DateTime @default(now())

updatedAt DateTime @updatedAt
}
Step 5: Understand Each Field
Primary Key
id String @id @default(cuid())

Unique Job ID.

Customer Relation
customerId String

customer User @relation(...)

Example:

## User

id = abc123

↓

## Job

customerId = abc123

One customer can create many jobs.

Title
title String

Example:

Fix AC
Description
description String

Example:

My LG split AC is not cooling properly.
Category
category JobCategory

Allowed values:

PLUMBING

ELECTRICAL

PAINTING

CARPENTRY

CLEANING

APPLIANCE_REPAIR

OTHER
Location
location String

Example:

Noida Sector 62
Budget
budget Decimal @db.Decimal(10,2)

Example:

500.00

1500.00

8000.00

Using Decimal avoids precision issues with money.

Status
status JobStatus @default(OPEN)

Possible values:

OPEN

IN_PROGRESS

COMPLETED

CANCELLED

When a customer creates a job, it starts as OPEN.

Required Date
requiredDate DateTime?

Optional.

Example:

05 Aug 2026
createdAt

Automatically stores creation time.

updatedAt

Automatically updates whenever the record changes.

Step 6: Relationship Diagram
User

---

id
fullName
role
│
│ 1
│
▼
Job

---

id
customerId
title
description
category
budget
status
Step 7: Validate
npx prisma validate
Step 8: Create Migration
npx prisma migrate dev --name add-job-model
Step 9: Verify
npx prisma studio

You should now see:

User

WorkerProfile

Job
💡 A production improvement

This model is a solid Version 1. As the application grows, we can enhance it with fields like:

estimatedDuration Int? // Estimated work duration in hours
address String // Full service address
latitude Float? // For map support
longitude Float?
images String[] // Photos uploaded by the customer

For now, I recommend keeping the model simple. It's enough to support creating jobs, browsing jobs, applying for jobs, payments, and reviews, while leaving room for future enhancements without overcomplicating the initial version.

Job Application -->

Excellent! You're following a good development process.

Current Progress
✅ Phase 1 - Project Setup

✅ Phase 2 - Database Design

🔄 Phase 3 - Prisma Database Implementation

    ✅ User
    ✅ WorkerProfile
    ✅ Job
    ⏳ JobApplication
    ⏳ Review
    ⏳ Message
    ⏳ Payment
    ⏳ Notification

Next Model: JobApplication

This is the most important table after Job.

Why do we need it?

Suppose the customer creates this job:

Title: Fix AC
Budget: ₹1000

Now multiple workers can apply.

Example:

Worker Proposed Price Status
Rahul ₹900 PENDING
Aman ₹850 PENDING
Priya ₹950 ACCEPTED

This information doesn't belong in the Job table because one job can have many applications.

That's why we create a separate JobApplication table.

Database Relationship
User (Customer)
│
│
creates
│
▼
Job
│
One Job has many Applications
│
▼
JobApplication
▲
│
applied by
│
WorkerProfile
│
▲
User (Worker)
Fields for JobApplication
Field Type Description
id String Primary key (cuid())
jobId String Foreign key → Job
workerProfileId String Foreign key → WorkerProfile
proposal String Worker's message/proposal
expectedPrice Decimal Worker's quoted price
estimatedDays Int Estimated completion time
status ApplicationStatus PENDING, ACCEPTED, REJECTED
createdAt DateTime Auto timestamp
updatedAt DateTime Auto timestamp
Relationships
Job
Job

1 -------- N JobApplication

One job can receive many applications.

WorkerProfile
WorkerProfile

1 -------- N JobApplication

One worker can apply to many jobs.

Workflow
Customer creates Job
│
▼
Worker browses Jobs
│
▼
Worker submits Application
│
▼
Application stored in JobApplication
│
▼
Customer accepts one application
│
▼
Application status = ACCEPTED
│
▼
Job status = IN_PROGRESS
After JobApplication

We'll continue with:

1. ✅ User
2. ✅ WorkerProfile
3. ✅ Job
4. ⏳ JobApplication
5. ⏳ Review
6. ⏳ Message
7. ⏳ Payment
8. ⏳ Notification
   After All Models

Once every table is created and migrated, we'll start Phase 4.

Phase 4 - Authentication

User Registration
↓
Password Hashing (bcrypt)
↓
Login
↓
JWT Token
↓
Authentication Middleware
↓
Role-Based Authorization

Only after authentication will we build the API endpoints.

My recommendation

Before we write the JobApplication model, let's spend 10–15 minutes designing it properly.

We'll answer questions like:

Can a worker apply to the same job more than once? (Probably no → we'll enforce this with a unique constraint.)
Can a customer accept more than one application for the same job? (Probably no → we'll enforce this in business logic.)
What happens to the remaining applications after one is accepted? (Usually they become REJECTED.)

Thinking through these rules first leads to a cleaner database and simpler backend code. After that, we'll implement the Prisma model together and migrate it.

Absolutely. Since we're building a production-level HomeConnect (Urban Company + Upwork style) application, here's a complete backend API roadmap. This is the set of APIs I'd expect for an MVP with good architecture.

Phase 1 - Authentication APIs

Base URL

/api/auth
Method Endpoint Description Auth
POST /register Register Customer/Worker ❌
POST /login Login & Generate JWT ❌
GET /me Get Logged-in User ✅
PUT /profile Update Profile ✅
PUT /change-password Change Password ✅
Phase 2 - Worker Profile APIs

Base URL

/api/worker
Method Endpoint Description Auth
POST /profile Create Worker Profile ✅ Worker
GET /profile My Worker Profile ✅ Worker
PUT /profile Update Worker Profile ✅ Worker
GET /:id View Worker Profile ❌
GET /top-workers Top Rated Workers ❌
Phase 3 - Job APIs

Base URL

/api/jobs
Method Endpoint Description Auth
POST / Create Job ✅ Customer
GET / Browse Jobs ❌ / ✅
GET /:id Job Details ❌ / ✅
GET /my-jobs Customer Jobs ✅ Customer
PUT /:id Update Job ✅ Customer
DELETE /:id Delete Job ✅ Customer
PATCH /:id/status Update Job Status ✅ Customer
Phase 4 - Job Application APIs

Base URL

/api/applications
Method Endpoint Description Auth
POST /jobs/:jobId Apply for Job ✅ Worker
GET /my-applications My Applications ✅ Worker
GET /jobs/:jobId View Applications for Job ✅ Customer
PATCH /:id/accept Accept Application ✅ Customer
PATCH /:id/reject Reject Application ✅ Customer
Phase 5 - Review APIs

Base URL

/api/reviews
Method Endpoint Description Auth
POST / Add Review ✅ Customer
GET /worker/:workerId Worker Reviews ❌
GET /job/:jobId Job Reviews ❌
Phase 6 - Payment APIs

Base URL

/api/payments
Method Endpoint Description Auth
POST /create-order Create Payment Order ✅ Customer
POST /verify Verify Payment ✅ Customer
GET /history Payment History ✅
GET /:id Payment Details ✅
Phase 7 - Message APIs

Base URL

/api/messages
Method Endpoint Description Auth
POST / Send Message ✅
GET /job/:jobId Get Job Conversation ✅
PATCH /:id/read Mark as Read ✅
Phase 8 - Notification APIs

Base URL

/api/notifications
Method Endpoint Description Auth
GET / My Notifications ✅
PATCH /:id/read Mark Read ✅
PATCH /read-all Mark All Read ✅
Phase 9 - Dashboard APIs
Customer Dashboard
/api/dashboard/customer
Method Endpoint Description
GET /stats Customer Dashboard Stats

Example response:

{
"totalJobs": 12,
"activeJobs": 2,
"completedJobs": 10,
"totalSpent": 25000
}
Worker Dashboard
/api/dashboard/worker
Method Endpoint Description
GET /stats Worker Dashboard Stats

Example:

{
"completedJobs": 50,
"rating": 4.8,
"earnings": 180000,
"pendingApplications": 5
}
Phase 10 - Admin APIs (Optional)
/api/admin
Method Endpoint
GET /users
GET /jobs
GET /payments
DELETE /users/:id
PATCH /users/:id/block
Authentication Flow
Register

↓

Login

↓

JWT

↓

Auth Middleware

↓

Role Middleware

↓

Protected APIs
Customer Flow
Register

↓

Login

↓

Create Job

↓

View Applications

↓

Accept Worker

↓

Payment

↓

Review
Worker Flow
Register

↓

Create Worker Profile

↓

Login

↓

Browse Jobs

↓

Apply

↓

Chat

↓

Complete Job

↓

Receive Review
Final Project Structure
Authentication (5 APIs)

Worker Profile (5 APIs)

Jobs (7 APIs)

Applications (5 APIs)

Reviews (3 APIs)

Payments (4 APIs)

Messages (3 APIs)

Notifications (3 APIs)

Dashboard (2 APIs)

Admin (Optional 5 APIs)
Total
Core APIs : 37

Optional Admin : 5

---

Total : 42 APIs
Recommended Development Order

This is the order I'd follow to build the backend:

1. ✅ Register
2. ✅ Login
3. JWT Middleware
4. Role Middleware
5. GET /auth/me

---

6. Worker Profile APIs

---

7. Create Job
8. Get Jobs
9. Get Job Details
10. Update Job
11. Delete Job

---

12. Apply for Job
13. View Applications
14. Accept Application
15. Reject Application

---

16. Reviews

---

17. Payments

---

18. Notifications

---

19. Messages (Socket.IO can be added later)

---

20. Dashboard APIs

---

21. Frontend Integration

---

22. Testing

---

23. Deployment

This roadmap gives you a complete, interview-worthy backend while keeping the implementation incremental and manageable.
