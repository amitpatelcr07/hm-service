🚀 After the Job Module (Next Major Feature)

We'll start the Job Application Module, which is the heart of the marketplace.

APIs we'll build
Worker Side
──────────────
POST /api/jobs/:id/apply
GET /api/applications/my-applications

Customer Side
──────────────
GET /api/jobs/:id/applications
PATCH /api/applications/:id/status

Shared
──────────────
GET /api/applications/:id

This module introduces important concepts like:

Preventing duplicate job applications.
Allowing only workers to apply.
Allowing only the job owner to accept or reject applications.
Updating application and job status together when an application is accepted.

This is where your HomeConnect application starts behaving like a real-world marketplace such as Urban Company or Upwork.

---

Job Application Module Roadmap

We'll build it exactly like the previous modules.

Job Application Module

Step 1 ✅
POST /api/jobs/:id/apply

Step 2
GET /api/applications/my-applications

Step 3
GET /api/jobs/:id/applications

Step 4
PATCH /api/applications/:id/status

Step 5
GET /api/applications/:id
Business Flow
Customer

↓

Creates Job

↓

Worker sees Job

↓

Worker clicks Apply

↓

Application Created

↓

Customer sees Applications

↓

Accept / Reject

↓

Job Starts
Today's API
POST /api/jobs/:id/apply
Business Rules

Only

WORKER

can apply.

Worker must have

Worker Profile

Job must exist.

Worker

cannot apply twice

to the same job.

Application Status

starts with

PENDING
Folder Structure

We'll create a new module just like Job and Worker.

backend
│
├── routes
│ application.routes.js
│
├── controllers
│ application.controller.js
│
├── services
│ application.service.js
Step 1

Create these files.

backend/routes/application.routes.js

backend/controllers/application.controller.js

backend/services/application.service.js

---

Business Flow
Worker

↓

Finds Job

↓

Clicks Apply

↓

POST /api/jobs/:id/apply

↓

Authentication

↓

Role Check (WORKER)

↓

Find Worker Profile

↓

Find Job

↓

Already Applied?

↓

Create Application

↓

Return Response

---

🚀 Next API

We'll implement:

GET /api/applications/my-applications
Why do we need this?

Imagine the worker dashboard.

Worker Dashboard

↓

My Applications

↓

Kitchen Sink Repair

Status : Pending

↓

Bathroom Painting

Status : Accepted

↓

Electrical Repair

Status : Rejected

The worker should be able to see every job they've applied to.

Workflow
Worker

↓

GET /api/applications/my-applications

↓

Authentication

↓

Role Check (WORKER)

↓

Find Worker Profile

↓

Find Applications

↓

Include Job Details

↓

Return Response
Prisma Query

We'll write something like:

await prisma.jobApplication.findMany({
where:{
workerProfileId
},

    include:{
        job:true
    }

})

This will return:

JobApplication

↓

Related Job

↓

Customer

so the frontend can show

Job Title

Location

Budget

Application Status

Applied Date
Expected Response
{
"success": true,
"data": [
{
"id": "application1",
"status": "PENDING",
"expectedPrice": "1400",
"job": {
"title": "Fix Kitchen Sink",
"location": "Noida",
"budget": "1500"
}
},
{
"id": "application2",
"status": "ACCEPTED",
"expectedPrice": "2500",
"job": {
"title": "Bathroom Painting",
"location": "Delhi",
"budget": "3000"
}
}
]
}
📚 After That

Then we'll implement the customer side APIs:

GET /api/jobs/:id/applications

Customer can see all workers who applied.

↓

PATCH /api/applications/:id/status

Customer accepts or rejects a worker.

↓

GET /api/applications/:id

View a single application in detail.

🗺️ Updated Roadmap
Authentication ✅
Worker Profile ✅
Job Module ✅

Job Application Module

✅ POST /api/jobs/:id/apply
⬜ GET /api/applications/my-applications
⬜ GET /api/jobs/:id/applications
⬜ PATCH /api/applications/:id/status
⬜ GET /api/applications/:id

Review Module
Notification Module
Message Module
Payment Module
Frontend (React)
Deployment
🎯 Next Session

We'll start with:

GET /api/applications/my-applications

This API is straightforward and introduces Prisma's include feature to fetch application data together with related job details, which is a common pattern you'll use throughout the rest of the project.

---

API
GET /api/applications/my-applications
Business Flow
Worker

↓

Login

↓

GET /api/applications/my-applications

↓

Authentication Middleware

↓

Role Middleware (WORKER)

↓

Application Controller

↓

Application Service

↓

Find Worker Profile

↓

Find All Applications

↓

Include Job Details

↓

Return Response
Step 1 - Route
File
backend/routes/application.routes.js

Import controller

const {
getMyApplications,
} = require("../controllers/application.controller");

Add route

router.get(
"/my-applications",
authenticateUser,
authorize("WORKER"),
getMyApplications
);

Your application.routes.js should look like:

const express = require("express");

const router = express.Router();

const {
getMyApplications,
} = require("../controllers/application.controller");

const {
authenticateUser,
} = require("../middlewares/auth.middleware");

const authorize = require("../middlewares/role.middleware");

router.get(
"/my-applications",
authenticateUser,
authorize("WORKER"),
getMyApplications
);

module.exports = router;
Step 2 - Controller
File
backend/controllers/application.controller.js

Import service

const {
applyForJobService,
getMyApplicationsService,
} = require("../services/application.service");

Add controller

const getMyApplications = async (req, res) => {
try {
const userId = req.user.userId;

    const applications = await getMyApplicationsService(userId);

    return res.status(200).json({
      success: true,
      data: applications,
    });

} catch (error) {
return res.status(error.statusCode || 500).json({
success: false,
message: error.message,
});
}
};

Export it

module.exports = {
applyForJob,
getMyApplications,
};
Step 3 - Service
File
backend/services/application.service.js

Add this function

const getMyApplicationsService = async (userId) => {

// Find Worker Profile
const workerProfile = await prisma.workerProfile.findUnique({
where: {
userId,
},
});

if (!workerProfile) {
const error = new Error("Worker profile not found");
error.statusCode = 404;
throw error;
}

// Find Applications
const applications = await prisma.jobApplication.findMany({
where: {
workerProfileId: workerProfile.id,
},

    include: {
      job: {
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          location: true,
          budget: true,
          status: true,
          requiredDate: true,

          customer: {
            select: {
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

});

return applications;
};

Export it

module.exports = {
applyForJobService,
getMyApplicationsService,
};
Prisma Query
await prisma.jobApplication.findMany({

    where:{
        workerProfileId: workerProfile.id
    },

    include:{
        job:true
    }

});

Equivalent SQL

SELECT \*
FROM "JobApplication"
WHERE workerProfileId='worker_profile_id';

Then Prisma automatically joins the related Job and Customer records because of the include.

Postman Test
URL
GET http://localhost:8000/api/applications/my-applications
Authorization
Bearer Token

Use the WORKER JWT token.

Request Body

No body.

Expected Response
{
"success": true,
"data": [
{
"id": "cmshh6pu600018iq85q9m0c6n",
"proposal": "I have 5 years of plumbing experience and can complete this job efficiently.",
"expectedPrice": "1400",
"estimatedDays": 2,
"status": "PENDING",
"createdAt": "2026-08-06T12:11:47.277Z",
"job": {
"id": "cmsgd98ot00018ij4njayfl7c",
"title": "Fix Kitchen Sink",
"description": "Kitchen sink pipe is leaking",
"category": "PLUMBING",
"location": "Noida",
"budget": "1500",
"status": "OPEN",
"requiredDate": "2026-08-15T00:00:00.000Z",
"customer": {
"fullName": "Amit Patel",
"email": "amit@gmail.com",
"phone": "9876543210"
}
}
}
]
}
Error Response

If the worker has no profile:

404 Not Found
{
"success": false,
"message": "Worker profile not found"
}
What You'll Learn

This API introduces an important Prisma concept:

include

With include, you can fetch related records in a single query. Here you're returning:

Job Application
Related Job
Customer details

This avoids multiple database calls and is a common pattern in production applications.

---

Next API

Now we'll switch to the Customer Side.

The customer wants to see who applied for his job.

We'll build:

GET /api/jobs/:id/applications
Real Life Flow

Imagine you're the customer.

You posted this job:

Fix Bathroom Sink

Now 4 workers applied.

Customer Dashboard

Job

↓

Fix Bathroom Sink

↓

Applications

↓

Rahul

⭐⭐⭐⭐☆

₹1400

2 Days

Pending

---

Mayank

⭐⭐⭐⭐⭐

₹1500

1 Day

Pending

---

Ravi

⭐⭐⭐⭐

₹1300

3 Days

Pending

The customer should be able to see all applications for that specific job.

Workflow
Customer

↓

GET /api/jobs/:id/applications

↓

JWT Authentication

↓

Role Check (CUSTOMER)

↓

Find Job

↓

Ownership Check

↓

Find Applications

↓

Include Worker Profile

↓

Include User Details

↓

Return Response
Business Rules
Rule 1

Job must exist.

Rule 2

Only the customer who created the job can view its applications.

Customer A

↓

Owns Job

✔ Can View

---

Customer B

↓

Doesn't Own Job

❌ Forbidden
Rule 3

Return all applications.

Each application should include:

Application

↓

Proposal

↓

Expected Price

↓

Estimated Days

↓

Worker Profile

↓

User
Expected Response
{
"success": true,
"data": [
{
"id": "application1",
"proposal": "I have 5 years experience.",
"expectedPrice": "1400",
"estimatedDays": 2,
"status": "PENDING",
"workerProfile": {
"bio": "Plumber",
"experience": 5,
"hourlyRate": "500",
"user": {
"fullName": "Rahul Kumar",
"email": "rahul@gmail.com",
"phone": "9876543210"
}
}
}
]
}
What You'll Learn

This API introduces nested Prisma includes.

Instead of:

include: {
job: true
}

We'll use:

include: {
workerProfile: {
include: {
user: true
}
}
}

This lets us retrieve:

JobApplication

↓

WorkerProfile

↓

User

in a single Prisma query.

🗺️ Remaining Roadmap
Job Application Module

✅ POST /api/jobs/:id/apply

✅ GET /api/applications/my-applications

⬜ GET /api/jobs/:id/applications

⬜ PATCH /api/applications/:id/status

⬜ GET /api/applications/:id
💡 My recommendation

The implementation order should be:

GET /api/jobs/:id/applications – Customer views all applicants.
PATCH /api/applications/:id/status – Customer accepts or rejects an application.
GET /api/applications/:id – View a single application's details.

The PATCH endpoint is the most interesting one because that's where you'll implement the business logic for accepting/rejecting applications and controlling the application lifecycle. That's a pattern interviewers often ask about, so we'll spend extra time on it when we get there.

---

Perfect. This is the third API of the Job Application Module.

This API is for the Customer to view all the workers who have applied for a specific job.

API
GET /api/jobs/:id/applications

Example:

GET /api/jobs/cmsgd98ot00018ij4njayfl7c/applications
Business Flow
Customer

↓

Login

↓

GET /api/jobs/:id/applications

↓

Authentication Middleware

↓

Role Middleware (CUSTOMER)

↓

Application Controller

↓

Application Service

↓

Find Job

↓

Ownership Check

↓

Find All Applications

↓

Include Worker Profile

↓

Include User Details

↓

Return Response
Business Rules

✅ Job must exist.

✅ Only the customer who created the job can view its applications.

✅ Return every application for that job.

Step 1 - Route
File
backend/routes/job.routes.js

Import

const {
applyForJob,
getJobApplications,
} = require("../controllers/application.controller");

Add the route

router.get(
"/:id/applications",
authenticateUser,
authorize("CUSTOMER"),
getJobApplications
);
Step 2 - Controller
File
backend/controllers/application.controller.js

Import service

const {
applyForJobService,
getMyApplicationsService,
getJobApplicationsService,
} = require("../services/application.service");

Add controller

const getJobApplications = async (req, res) => {
try {
const jobId = req.params.id;
const customerId = req.user.userId;

    const applications = await getJobApplicationsService(
      jobId,
      customerId
    );

    return res.status(200).json({
      success: true,
      data: applications,
    });

} catch (error) {
return res.status(error.statusCode || 500).json({
success: false,
message: error.message,
});
}
};

Export it

module.exports = {
applyForJob,
getMyApplications,
getJobApplications,
};
Step 3 - Service
File
backend/services/application.service.js

Add this function

const getJobApplicationsService = async (
jobId,
customerId
) => {

// Find Job
const job = await prisma.job.findUnique({
where: {
id: jobId,
},
});

if (!job) {
const error = new Error("Job not found");
error.statusCode = 404;
throw error;
}

// Ownership Check
if (job.customerId !== customerId) {
const error = new Error(
"You are not authorized to view applications for this job"
);
error.statusCode = 403;
throw error;
}

// Get Applications
const applications = await prisma.jobApplication.findMany({
where: {
jobId,
},

    include: {
      workerProfile: {
        select: {
          id: true,
          bio: true,
          skills: true,
          experience: true,
          hourlyRate: true,
          isAvailable: true,

          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

});

return applications;
};

Export it

module.exports = {
applyForJobService,
getMyApplicationsService,
getJobApplicationsService,
};
Prisma Query
await prisma.jobApplication.findMany({
where: {
jobId,
},

include: {
workerProfile: {
include: {
user: true,
},
},
},
});

Equivalent SQL

SELECT \*
FROM "JobApplication"
WHERE jobId = 'job_id';

Prisma automatically joins the related WorkerProfile and User records because of the nested include.

Postman Test
URL
GET http://localhost:8000/api/jobs/<JOB_ID>/applications
Authorization
Bearer Token

Use the CUSTOMER JWT token of the customer who created the job.

Body

No request body.

Success Response
{
"success": true,
"data": [
{
"id": "cmshh6pu600018iq85q9m0c6n",
"proposal": "I have 5 years of plumbing experience and can complete this job efficiently.",
"expectedPrice": "1400",
"estimatedDays": 2,
"status": "PENDING",
"createdAt": "2026-08-06T12:11:47.277Z",
"workerProfile": {
"id": "cmsbudnre00018i3s1i7sdidu",
"bio": "Senior MERN Stack Developer",
"skills": [
"React",
"Node.js",
"Express"
],
"experience": 5,
"hourlyRate": "800",
"isAvailable": true,
"user": {
"id": "cmsbm5zvn00008ickra4mt9tj",
"fullName": "Mayank Maurya",
"email": "mayank@gmail.com",
"phone": "9876543210"
}
}
}
]
}
Error Responses
Job Not Found
404 Not Found
{
"success": false,
"message": "Job not found"
}
Customer Doesn't Own the Job
403 Forbidden
{
"success": false,
"message": "You are not authorized to view applications for this job"
}
Flow Diagram
GET /api/jobs/:id/applications
│
▼
Authentication
│
▼
Role Check
│
▼
Find Job
│
▼
Ownership Check
│
▼
Find Applications
│
▼
Include WorkerProfile
│
▼
Include User
│
▼
Return Response
✅ Next API

Once you've tested this successfully, we'll implement the most important API in the Job Application Module:

PATCH /api/applications/:id/status

---

🚀 Next API (Most Important)

We'll now implement:

PATCH /api/applications/:id/status

This is the core business logic of the marketplace.

Real-Life Flow
Customer Posts Job

↓

Workers Apply

↓

Customer Opens Applications

↓

Selects One Worker

↓

Accept

↓

Job Status → IN_PROGRESS

↓

Other Applications → (Optional) REJECTED

↓

Worker Starts Working
Business Rules
Rule 1

Only the customer who owns the job can change the application status.

Rule 2

Allowed values:

ACCEPTED

REJECTED

(Not PENDING, because the application is already created in that state.)

Rule 3

Application must exist.

Rule 4

When a worker is ACCEPTED, update the related job status to:

IN_PROGRESS
Rule 5 (Recommended)

If one application is accepted, automatically reject all other pending applications for the same job.

Example:

Job

↓

Applications

Rahul PENDING

Mayank PENDING

Ravi PENDING

↓

Customer Accepts Rahul

↓

Rahul ACCEPTED

Mayank REJECTED

Ravi REJECTED

This prevents multiple workers from being accepted for a single job.

Workflow
PATCH /api/applications/:id/status

↓

Authentication

↓

Role Check

↓

Find Application

↓

Find Job

↓

Ownership Check

↓

Validate Status

↓

Update Application

↓

If ACCEPTED

↓

Update Job Status

↓

Reject Other Pending Applications (Recommended)

↓

Return Response
What You'll Learn

This API introduces several important backend concepts:

Multi-table business logic
Database transactions (so related updates succeed or fail together)
Updating related records
Enforcing business rules beyond simple CRUD

These are common topics in backend interviews.

---

Perfect. This is the most important API in your HomeConnect backend because it contains real business logic rather than just CRUD operations.

We'll build it exactly as it would be done in a production application.

API
PATCH /api/applications/:id/status

Example

PATCH /api/applications/cmshh6pu600018iq85q9m0c6n/status
Business Flow
Customer

↓

Select Application

↓

Accept / Reject

↓

Authentication

↓

Role Check (CUSTOMER)

↓

Find Application

↓

Find Job

↓

Ownership Check

↓

Validate Status

↓

Transaction

    ↓

Update Application

↓

If ACCEPTED

↓

Update Job Status

↓

Reject Other Pending Applications

↓

Commit

↓

Return Response
Business Rules
Rule 1

Application must exist.

Rule 2

Only the job owner can update status.

Rule 3

Allowed values

ACCEPTED
REJECTED
Rule 4

If accepted

Job

OPEN

↓

IN_PROGRESS
Rule 5

Reject remaining pending applications.
