Step 3 - Build APIs in Order

We'll not write all APIs together.

We'll complete one API fully before moving to the next.

1️⃣ Create Worker Profile

↓

2️⃣ Get My Worker Profile

↓

3️⃣ Update Worker Profile

↓

4️⃣ Get Worker By Id

↓

5️⃣ Update Availability
API 1
POST /api/worker/profile
Purpose

When a user registers as a WORKER, only basic information is stored in the User table.

User

↓

id
name
email
password
role

A worker still needs to complete their professional profile.

That information belongs in the WorkerProfile table.

Request
POST /api/worker/profile

Headers

Authorization: Bearer <token>

Body

{
"bio": "MERN Stack Developer with 4 years experience",
"skills": [
"React",
"Node.js",
"Express",
"PostgreSQL"
],
"experience": 4,
"hourlyRate": 500
}
Validation Rules
User must be logged in
Role must be WORKER
A worker can have only one profile
experience >= 0
hourlyRate > 0
Code Files

We'll implement this API across three files.

1. Route

Create

src/routes/worker.routes.js

Responsibilities:

Define endpoint
Attach middleware
Call controller 2. Controller

Create

src/controllers/worker.controller.js

Responsibilities:

Receive request
Call service
Return response 3. Service

Create

src/services/worker.service.js

Responsibilities:

Check whether the worker already has a profile.
Insert a new row into the WorkerProfile table.
Return the created profile.

This is where all database logic should live.

Connect the Route

In src/app.js, add:

import workerRoutes from "./routes/worker.routes.js";

app.use("/api/worker", workerRoutes);
How the Request Will Flow
React/Postman
│
▼
POST /api/worker/profile
│
▼
authenticateUser
│
▼
authorize("WORKER")
│
▼
worker.routes.js
│
▼
worker.controller.js
│
▼
worker.service.js
│
▼
Prisma
│
▼
WorkerProfile Table
Git Commit Plan

When all five Worker Profile APIs are finished:

git add .
git commit -m "feat(worker): implement worker profile APIs"
git push origin feature/worker-profile

Then:

feature/worker-profile
│
▼
develop
Our Learning Plan

I won't give you all five APIs at once.

We'll implement them exactly as a real project would:

Step 1 (Current)
Create worker.routes.js
Create worker.controller.js
Create worker.service.js
Connect the route in app.js
Step 2

Write the complete POST /api/worker/profile API and test it in Postman.

Step 3

Implement GET /api/worker/profile.

Step 4

Implement PUT /api/worker/profile.

Step 5

Implement GET /api/worker/:id.

Step 6

Implement PATCH /api/worker/availability.

This incremental approach makes it much easier to understand the flow, test each feature, and debug issues before adding the next API.

Excellent! 🎉 Congratulations.

This is a significant milestone. You have successfully built your first protected business API.

Your project status is now:

✅ Phase 1 - Project Setup

✅ Phase 2 - Database Design

✅ Phase 3 - Prisma Database Implementation

✅ Authentication Module
✅ Register
✅ Login
✅ JWT
✅ Authentication Middleware
✅ Role Middleware
✅ Current User API

🔄 Worker Profile Module

    ✅ POST /api/worker/profile

    ⏳ GET /api/worker/profile
    ⏳ PUT /api/worker/profile
    ⏳ GET /api/worker/:id
    ⏳ PATCH /api/worker/availability

Next API
GET /api/worker/profile
Purpose

Return the logged-in worker's profile.

Instead of creating a profile, we'll fetch it.

Route
GET /api/worker/profile
Middleware
authenticateUser

↓

authorize("WORKER")
Request

No request body.

Only Bearer Token.

Expected Response
{
"success": true,
"data": {
"id": "...",
"bio": "MERN Stack Developer",
"skills": [
"React",
"Node.js",
"Express",
"PostgreSQL"
],
"experience": 4,
"hourlyRate": "500",
"isAvailable": true
}
}
Files to modify

Only three files.

Route
router.get(
"/profile",
authenticateUser,
authorize("WORKER"),
getMyProfile
);
Controller

Create a new controller function:

getMyProfile()

Responsibilities:

Read req.user.userId
Call service
Return response
Service

Create:

getWorkerProfile(userId)

Business logic:

Find WorkerProfile

WHERE userId = JWT userId

If not found

↓

Return

404 Not Found

Otherwise

↓

Return worker profile.

Prisma Query

Internally you'll write something like:

prisma.workerProfile.findUnique({
where: {
userId
}
});

Equivalent SQL:

SELECT \*
FROM "WorkerProfile"
WHERE "userId" = 'JWT_USER_ID';
Why this API?

Imagine your React dashboard.

Worker Dashboard

When the page loads

↓

React calls

GET /api/worker/profile

↓

Backend returns

Bio

Skills

Experience

Hourly Rate

Availability

↓

React fills the form automatically.

Test Cases
Test 1

Valid Worker

200 OK
Test 2

Customer Token

403 Forbidden
Test 3

No Token

401 Unauthorized
Test 4

Worker Profile Doesn't Exist

404 Not Found
After GET Works

We'll implement:

PUT /api/worker/profile

This will update:

Bio
Skills
Experience
Hourly Rate
Small suggestion before continuing

Since you've completed the first Worker Profile API successfully, this is a good checkpoint to commit your work on the feature branch:

git add .
git commit -m "feat(worker): implement create worker profile API"
git push origin feature/worker-profile

Then continue with the remaining Worker Profile APIs on the same branch. When all five Worker Profile APIs are complete and tested, merge feature/worker-profile into develop. This gives you a clean, professional Git history with one feature per branch.
