Next Phase

Now we start the core business logic of HomeConnect.

Phase 4 — Job Module

This is where customers can post jobs and workers can apply.

We'll build the APIs in this exact order:

Step 1
POST /api/jobs

↓

Step 2
GET /api/jobs

↓

Step 3
GET /api/jobs/:id

↓

Step 4
PUT /api/jobs/:id

↓

Step 5
DELETE /api/jobs/:id

↓

Step 6
PATCH /api/jobs/:id/status

↓

Step 7
GET /api/jobs/my-jobs
Why start with POST /api/jobs?

Because everything else depends on it.

Customer creates Job

↓

Worker sees Job

↓

Worker applies

↓

Customer accepts application

↓

Payment

↓

Review

Without jobs, the rest of the workflow can't happen.

What We'll Build First
API
POST /api/jobs

Only CUSTOMER can create jobs.

Request
{
"title": "Fix Kitchen Sink",
"description": "Kitchen sink pipe is leaking.",
"category": "PLUMBING",
"location": "Noida",
"budget": 1500,
"requiredDate": "2026-08-15"
}
Flow
Client

↓

POST /api/jobs

↓

authenticateUser

↓

authorize("CUSTOMER")

↓

Job Controller

↓

Job Service

↓

Prisma

↓

Job Table

↓

Response
New Folder Structure

We'll create a dedicated Job module, just like the Worker module:

backend
│
├── routes
│ job.routes.js
│
├── controllers
│ job.controller.js
│
├── services
│ job.service.js
│
├── validations
│ job.validation.js (later)
│
└── app.js
Step 1 (Our Next Coding Task)

We'll begin by creating the files:

backend/routes/job.routes.js

backend/controllers/job.controller.js

backend/services/job.service.js

Then we'll connect the routes in app.js and implement POST /api/jobs.

📋 Updated Development Roadmap
✅ Phase 1 - Project Setup

✅ Phase 2 - Database Design

✅ Phase 3 - Prisma Database Implementation

──────────────────────────────

✅ Authentication Module

──────────────────────────────

✅ Worker Profile Module

──────────────────────────────

🔄 Job Module ← NEXT

    ⬜ POST   /api/jobs
    ⬜ GET    /api/jobs
    ⬜ GET    /api/jobs/:id
    ⬜ PUT    /api/jobs/:id
    ⬜ DELETE /api/jobs/:id
    ⬜ PATCH  /api/jobs/:id/status
    ⬜ GET    /api/jobs/my-jobs

──────────────────────────────

⬜ Job Application Module

⬜ Review Module

⬜ Payment Module

⬜ Notification Module

⬜ Message Module

⬜ React Frontend

⬜ Deployment

This is exactly how a real-world marketplace (like Urban Company or Upwork) is built—authentication first, user profiles next, then the core business entity (jobs), followed by applications, payments, and reviews. From here onward, you'll be implementing the central workflow of your application.

---

Project Flow
POST /api/jobs
│
▼
job.routes.js
│
▼
authenticateUser
│
▼
authorize("CUSTOMER")
│
▼
job.controller.js
│
▼
createJobService()
│
▼
Prisma ORM
│
▼
Job Table
│
▼
JSON Response

---

🚀 Next API
GET /api/jobs

This will be one of the most important APIs in your project.

Purpose

Return all available jobs for workers.

Example:

Worker Opens Dashboard

↓

GET /api/jobs

↓

Display all OPEN jobs
Why This API Is Important

In a real application, workers don't need all jobs. They usually want to:

Search by title
Filter by category
Filter by location
Sort by newest
Paginate results

Instead of first building a simple version and then rewriting it, I recommend building it the way a production application would.

Features We'll Build

Our GET /api/jobs API will support:

GET /api/jobs

✔ Pagination
✔ Search
✔ Category Filter
✔ Location Filter
✔ Status Filter
✔ Sort by Newest

Example:

GET /api/jobs?page=1&limit=10
GET /api/jobs?category=PLUMBING
GET /api/jobs?location=Noida
GET /api/jobs?search=kitchen
GET /api/jobs?status=OPEN

These can also be combined:

GET /api/jobs?search=kitchen&category=PLUMBING&page=1&limit=5
Files We'll Modify
backend/routes/job.routes.js

backend/controllers/job.controller.js

backend/services/job.service.js
Development Plan

We'll build it in this order:

Step 1

Create the route:

GET /api/jobs
Step 2

Create the controller:

getAllJobs()
Step 3

Create the service:

getAllJobsService(filters)
Step 4

Implement Prisma query with filters and pagination.

Step 5

Test in Postman.

Recommendation

This API is more advanced than the previous ones because it introduces dynamic queries, pagination, and filtering—skills that are frequently discussed in backend interviews. Instead of rushing through it, we'll build it carefully so you understand not only what the code does, but also why it's designed that way and how Prisma translates it into SQL. Once this API is complete, you'll have a strong example of a production-style listing endpoint in your portfolio.

---

Perfect. We'll build this API exactly like a production application.

API 2
GET /api/jobs
Flow
Client

↓

GET /api/jobs?page=1&limit=10&search=kitchen&category=PLUMBING

↓

job.routes.js

↓

job.controller.js

↓

job.service.js

↓

Prisma

↓

PostgreSQL

↓

JSON Response
Step 1 - Route
backend/routes/job.routes.js

Add this below your POST route.

router.get("/", getAllJobs);

Import it:

const {
createJob,
getAllJobs,
} = require("../controllers/job.controller");

Note: This route is public. Anyone can browse jobs, so do not add authenticateUser or authorize middleware.

Step 2 - Controller
backend/controllers/job.controller.js

Import the service:

const {
createJobService,
getAllJobsService,
} = require("../services/job.service");

Now add this controller:

const getAllJobs = async (req, res) => {
try {
const jobs = await getAllJobsService(req.query);

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: jobs,
    });

} catch (error) {
return res.status(error.statusCode || 500).json({
success: false,
message: error.message,
});
}
};

Export it:

module.exports = {
createJob,
getAllJobs,
};
Step 3 - Service
backend/services/job.service.js

Add this function.

const getAllJobsService = async (query) => {
const {
page = 1,
limit = 10,
search,
category,
location,
status,
} = query;

const where = {};

// Search by title
if (search) {
where.title = {
contains: search,
mode: "insensitive",
};
}

// Filter by category
if (category) {
where.category = category;
}

// Filter by location
if (location) {
where.location = {
contains: location,
mode: "insensitive",
};
}

// Filter by status
if (status) {
where.status = status;
}

const jobs = await prisma.job.findMany({
where,

    orderBy: {
      createdAt: "desc",
    },

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),

    include: {
      customer: {
        select: {
          fullName: true,
          email: true,
        },
      },
    },

});

const totalJobs = await prisma.job.count({
where,
});

return {
jobs,
pagination: {
total: totalJobs,
page: Number(page),
limit: Number(limit),
totalPages: Math.ceil(totalJobs / Number(limit)),
},
};
};

Export it:

module.exports = {
createJobService,
getAllJobsService,
};
Why are we creating where?

Instead of writing many different queries, we build one dynamic filter object.

Example:

If the request is:

GET /api/jobs?category=PLUMBING

The where object becomes:

{
category: "PLUMBING"
}

If the request is:

GET /api/jobs?location=Noida

Then:

{
location: {
contains: "Noida",
mode: "insensitive"
}
}

If multiple filters are provided:

GET /api/jobs?category=PLUMBING&status=OPEN

The where object becomes:

{
category: "PLUMBING",
status: "OPEN"
}

Prisma automatically combines these conditions with AND.

Step 4 - Test
URL
GET http://localhost:8000/api/jobs

Expected response:

{
"success": true,
"message": "Jobs fetched successfully",
"data": {
"jobs": [
{
"id": "...",
"title": "Fix Kitchen Sink",
"category": "PLUMBING",
"location": "Noida",
"budget": "1500",
"status": "OPEN",
"customer": {
"fullName": "Amit Patel",
"email": "amit@gmail.com"
}
}
],
"pagination": {
"total": 1,
"page": 1,
"limit": 10,
"totalPages": 1
}
}
}
Test These URLs

Basic:

GET /api/jobs

Pagination:

GET /api/jobs?page=1&limit=5

Search:

GET /api/jobs?search=kitchen

Category:

GET /api/jobs?category=PLUMBING

Location:

GET /api/jobs?location=Noida

Status:

GET /api/jobs?status=OPEN

Combined:

GET /api/jobs?category=PLUMBING&location=Noida&page=1&limit=5

---

Next API

Now let's build:

GET /api/jobs/:id
Purpose

When a worker clicks on a job card, they should see the full details.

Flow:

Worker Dashboard

↓

Clicks "Fix Kitchen Sink"

↓

GET /api/jobs/cmsgd5yc400018izwk90dpskj

↓

Complete Job Details
Files We'll Modify
routes/job.routes.js

controllers/job.controller.js

services/job.service.js
Route
router.get("/:id", getJobById);
Controller
const getJobById = async (req, res) => {
try {
const { id } = req.params;

    const job = await getJobByIdService(id);

    return res.status(200).json({
      success: true,
      data: job,
    });

} catch (error) {
return res.status(error.statusCode || 500).json({
success: false,
message: error.message,
});
}
};
Service

This service should:

Receive the id.
Find the job using prisma.job.findUnique().
Include the customer details.
Throw a 404 if the job doesn't exist.
After That

We'll implement:

PUT /api/jobs/:id

Only the customer who created the job should be able to edit it.

We'll compare:

JWT User ID

↓

Job.customerId

↓

Same?

↓

Yes → Update

No → 403 Forbidden

This is an important authorization pattern used in production systems.

---

Workflow
Client

↓

GET /api/jobs/:id

↓

job.routes.js

↓

job.controller.js

↓

job.service.js

↓

Prisma

↓

PostgreSQL

↓

JSON Response

---

Awesome! 🎉 You're moving at a great pace.

So far you've completed:

Authentication Module ✅

Worker Profile Module ✅

Job Module

✅ POST /api/jobs
✅ GET /api/jobs
✅ GET /api/jobs/:id

⬜ PUT /api/jobs/:id
⬜ DELETE /api/jobs/:id
⬜ PATCH /api/jobs/:id/status
⬜ GET /api/jobs/my-jobs
🚀 Next API

We'll now implement:

PUT /api/jobs/:id

This is the first API where we'll enforce resource ownership.

Business Rule

Only the customer who created the job should be able to update it.

Example:

Customer A creates Job

↓

Customer A
✔ Can Update

Customer B
❌ Cannot Update

Worker
❌ Cannot Update
Request
PUT /api/jobs/:id

Example:

PUT /api/jobs/cmsgd5yc400018izwk90dpskj

Headers

Authorization: Bearer <JWT>

Body

{
"title": "Fix Bathroom Sink",
"description": "Bathroom sink pipe is leaking",
"category": "PLUMBING",
"location": "Noida",
"budget": 2500,
"requiredDate": "2026-08-20"
}
Workflow
Client

↓

PUT /api/jobs/:id

↓

authenticateUser

↓

authorize("CUSTOMER")

↓

Controller

↓

Service

↓

Find Job

↓

Is job.customerId === JWT userId ?

        │

Yes │ No
│
▼
Update
│
▼
Return Response

        OR

403 Forbidden
Files We'll Modify
routes/job.routes.js

controllers/job.controller.js

services/job.service.js
What You'll Learn

This API introduces a pattern you'll reuse throughout the project:

Update only if the logged-in user owns the resource.
Return 403 Forbidden if they don't.
Return 404 Not Found if the resource doesn't exist.

You'll use this same authorization logic later for:

Updating jobs
Deleting jobs
Accepting/rejecting job applications
Posting reviews
Managing messages

---

Project Flow
Client

↓

PUT /api/jobs/:id

↓

authenticateUser

↓

authorize("CUSTOMER")

↓

job.controller.js

↓

job.service.js

↓

Find Job

↓

Is customerId == JWT userId ?

↓

Update Job

↓

Return Response

---

🚀 Next API
DELETE /api/jobs/:id

This API is very similar to the update API.

Business Rule
Customer A creates Job

↓

Customer A
✔ Can Delete

Customer B
❌ Cannot Delete

Worker
❌ Cannot Delete

The ownership check is exactly the same as in the update API.

Flow
Client

↓

DELETE /api/jobs/:id

↓

authenticateUser

↓

authorize("CUSTOMER")

↓

Controller

↓

Service

↓

Find Job

↓

Owner?

↓

Delete

↓

Success Response
Files to Modify
routes/job.routes.js

controllers/job.controller.js

services/job.service.js

After DELETE, we'll build:

PATCH /api/jobs/:id/status

This API will change the job lifecycle:

OPEN

↓

IN_PROGRESS

↓

COMPLETED

or

↓

CANCELLED

After that, we'll build:

GET /api/jobs/my-jobs

This will return only the jobs created by the logged-in customer, using the customerId from the JWT.

🎯 After the Job Module

Your roadmap will be:

✅ Authentication

✅ Worker Profile

🔄 Job Module (almost complete)

⬜ Job Application Module
• Worker applies to a job
• Customer views applications
• Customer accepts/rejects applications

⬜ Review Module

⬜ Notification Module

⬜ Message Module

⬜ Payment Module

⬜ React Frontend

⬜ Deployment
Recommendation

Implement the remaining Job APIs in this order:

DELETE /api/jobs/:id (reuses the ownership logic you already wrote).
PATCH /api/jobs/:id/status (introduces controlled state transitions).
GET /api/jobs/my-jobs (uses the authenticated user's ID to filter data).

Once those three are complete, your Job Module will be finished, and you'll be ready to move into the Job Application Module, where the interaction between customers and workers really begins.
