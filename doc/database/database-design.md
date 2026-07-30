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
