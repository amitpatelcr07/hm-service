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
