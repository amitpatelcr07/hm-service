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

---

Excellent! 🎉 Your PUT /api/worker/profile API is working correctly. The response looks good, and the architecture follows a proper Route → Controller → Service → Prisma pattern.

You can add the following documentation to your README.md or project documentation.

Worker Profile Update API
Endpoint
PUT /api/worker/profile
Purpose

Allows a logged-in worker to update their profile information.

A worker can update:

Bio
Skills
Experience
Hourly Rate

This API is protected using JWT Authentication and Role Authorization.

Authentication Flow
Client
│
▼
PUT /api/worker/profile
│
▼
JWT Bearer Token
│
▼
authenticateUser
│
▼
Token Verification
│
▼
req.user
│
▼
authorize("WORKER")
│
▼
Worker Controller
│
▼
Worker Service
│
▼
Prisma ORM
│
▼
Neon PostgreSQL
Request
Method
PUT
URL
/api/worker/profile
Headers
Authorization: Bearer <JWT_TOKEN>

Content-Type: application/json
Request Body
{
"bio":"Senior MERN Stack Developer",

    "skills":[
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Service Now",
        "Teaching"
    ],

    "experience":5,

    "hourlyRate":800

}
Route Flow
worker.routes.js

↓

authenticateUser

↓

authorize("WORKER")

↓

updateWorkerProfile()
Controller Flow

Responsibilities

Receive Request

↓

Extract userId from JWT

↓

Read Request Body

↓

Call Service

↓

Return Response

Example

const userId = req.user.userId;

const profileData = req.body;

await updateWorkerProfile(userId, profileData);
Service Flow

Responsibilities

Receive userId

↓

Find Worker Profile

↓

If profile doesn't exist

↓

Return 404

↓

Update Profile

↓

Return Updated Profile
Prisma Query

Find Worker

await prisma.workerProfile.findUnique({
where:{
userId
}
});

Update Worker

await prisma.workerProfile.update({

    where:{
        userId
    },

    data:{
        bio,
        skills,
        experience,
        hourlyRate
    }

});
SQL Generated by Prisma

Find Worker

SELECT \*
FROM "WorkerProfile"
WHERE "userId" = 'JWT_USER_ID';

Update Worker

UPDATE "WorkerProfile"

SET

bio = ...,

skills = ...,

experience = ...,

hourlyRate = ...

WHERE userId = 'JWT_USER_ID';
Success Response
{
"success":true,

    "message":"Worker profile updated successfully",

    "data":{

        "id":"cms....",

        "bio":"Senior MERN Stack Developer",

        "skills":[
            "React",
            "Next.js",
            "Node.js",
            "Express",
            "PostgreSQL"
        ],

        "experience":5,

        "hourlyRate":"800",

        "isAvailable":true
    }

}
Possible Responses
200 OK

Profile updated successfully.

401 Unauthorized

JWT token missing or invalid.

403 Forbidden

Logged-in user is not a WORKER.

404 Not Found

Worker profile doesn't exist.

500 Internal Server Error

Unexpected server error.

Business Rules
✓ User must be logged in.

✓ User role must be WORKER.

✓ Worker profile must already exist.

✓ userId is always taken from JWT.

✓ Client cannot update another worker's profile.

✓ Only profile fields are updated.
Complete Request Flow
React Frontend
│
▼
PUT /api/worker/profile
│
▼
Express Route
│
▼
Authentication Middleware
│
▼
Role Middleware
│
▼
Worker Controller
│
▼
Worker Service
│
▼
Prisma ORM
│
▼
Neon PostgreSQL
│
▼
Updated Worker Profile
│
▼
JSON Response

---

Perfect. This API is slightly different from the previous ones because it is a public profile API.

Until now we have built APIs where the logged-in worker manages their own profile using the JWT.

Now we'll build an API where any user (Customer or Worker) can view a worker's profile using the worker's ID.

Phase 5
API 4
GET /api/worker/:id
Purpose

Suppose a customer is searching for workers.

Customer Dashboard

↓

Search Workers

↓

Click "Amit Patel"

↓

GET /api/worker/cmsbudnre00018i3s1i7sdidu

↓

Display Worker Profile
Request Flow
Client

↓

GET /api/worker/:id

↓

Express Route

↓

Worker Controller

↓

Worker Service

↓

Prisma ORM

↓

Neon PostgreSQL

↓

JSON Response

Notice:

❌ No request body

✅ Worker ID comes from URL

Endpoint
GET /api/worker/:id

Example

GET /api/worker/cmsbudnre00018i3s1i7sdidu
Authorization

For our project, I recommend requiring login but allowing both roles.

authenticateUser

↓

authorize("CUSTOMER","WORKER")

Later, if you want the profile to be publicly visible without login, you can simply remove the middleware.

Business Rules
Rule 1

User must be logged in.

Rule 2

Role

CUSTOMER

or

WORKER
Rule 3

Read Worker ID

req.params.id
Rule 4

Find Worker Profile

WHERE id = req.params.id
Rule 5

If Worker not found

Return

404
Rule 6

Return profile

Files to Modify
worker.routes.js

↓

worker.controller.js

↓

worker.service.js
Step 1
Route

Add this below your existing routes:

router.get(
"/:id",
authenticateUser,
authorize("CUSTOMER", "WORKER"),
getWorkerById
);

Important: Place this route after GET /profile.

Correct order:

router.post("/profile", ...);

router.get("/profile", ...);

router.put("/profile", ...);

router.patch("/availability", ...);

router.get("/:id", ...);

If /:id comes before /profile, Express will treat "profile" as an id, causing routing issues.

Step 2
Controller

Create a new controller function:

const getWorkerById = async (req, res) => {
try {
const workerId = req.params.id;

    const worker = await getWorkerProfileById(workerId);

    return res.status(200).json({
      success: true,
      data: worker,
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
registerWorker,
getMyProfile,
updateWorkerProfile,
getWorkerById,
};
Step 3
Service

Create:

const getWorkerProfileById = async (workerId) => {

};

Business logic:

Receive workerId

↓

Find WorkerProfile

↓

Include User Details

↓

Return Worker Profile
Prisma Query

This is the important part.

We don't only need the WorkerProfile.

We also need information from the User table.

WorkerProfile

↓

belongs to

↓

User

So we'll use Prisma's include.

The query should look conceptually like this:

await prisma.workerProfile.findUnique({
where: {
id: workerId,
},
include: {
user: {
select: {
fullName: true,
email: true,
},
},
},
});

This fetches:

Worker profile
User's full name
User's email

all in one query.

SQL Generated by Prisma
SELECT
wp.\*,
u.fullName,
u.email
FROM WorkerProfile wp
JOIN User u
ON wp.userId = u.id
WHERE wp.id = ?;

This is a great interview point because it demonstrates how Prisma handles SQL joins.

Expected Response
{
"success": true,
"data": {
"id": "cmsbudnre00018i3s1i7sdidu",
"bio": "Senior MERN Stack Developer",
"skills": [
"React",
"Next.js",
"Node.js",
"Express",
"PostgreSQL"
],
"experience": 5,
"hourlyRate": "800",
"isAvailable": true,
"user": {
"fullName": "Amit Patel",
"email": "amit@gmail.com"
}
}
}
Postman Test
Request
GET http://localhost:8000/api/worker/cmsbudnre00018i3s1i7sdidu

Authorization

Bearer Token
Expected Status Codes
Status Meaning
200 Worker found
401 JWT missing
403 Invalid role
404 Worker not found
500 Server error
Next API

Once this API is complete and tested, we'll finish the Worker Profile module with:

PATCH /api/worker/availability

This will let a worker toggle their availability (true ↔ false) without updating the rest of their profile. It's a nice example of using PATCH for a partial update.ss

---

Yes. Let's implement it exactly like we've done for the previous Worker Profile APIs. Since you've been following a clean layered architecture (Routes → Controller → Service → Prisma), we'll continue with the same pattern.

API
PATCH /api/worker/availability
Purpose

A worker can change only their availability.

Example:

Available

↓

Unavailable

↓

Available

Instead of updating the whole profile (PUT), we update only one field (PATCH).

Project Structure

You'll modify only these three files:

backend/
│
├── routes/
│ worker.routes.js
│
├── controllers/
│ worker.controller.js
│
└── services/
worker.service.js
Step 1 - Route
File
backend/routes/worker.routes.js

Add this route after your PUT /profile route.

router.patch(
"/availability",
authenticateUser,
authorize("WORKER"),
updateAvailability
);

Don't forget to import it:

const {
registerWorker,
getMyProfile,
updateWorkerProfile,
getWorkerById,
updateAvailability,
} = require("../controllers/worker.controller");
Step 2 - Controller
File
backend/controllers/worker.controller.js

Add:

const updateAvailability = async (req, res) => {
try {
const userId = req.user.userId;
const { isAvailable } = req.body;

    const worker = await updateWorkerAvailability(userId, isAvailable);

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: worker,
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
registerWorker,
getMyProfile,
updateWorkerProfile,
getWorkerById,
updateAvailability,
};
Step 3 - Service
File
backend/services/worker.service.js

Add:

const updateWorkerAvailability = async (userId, isAvailable) => {
const profile = await prisma.workerProfile.findUnique({
where: {
userId,
},
});

if (!profile) {
const error = new Error("Worker profile not found");
error.statusCode = 404;
throw error;
}

const updatedProfile = await prisma.workerProfile.update({
where: {
userId,
},
data: {
isAvailable,
},
select: {
id: true,
isAvailable: true,
updatedAt: true,
},
});

return updatedProfile;
};

Export it:

module.exports = {
createWorkerProfile,
getWorkerProfile,
updateWorkerProfile,
getWorkerProfileById,
updateWorkerAvailability,
};
Step 4 - Test in Postman
URL
PATCH http://localhost:8000/api/worker/availability
Authorization
Bearer Token

Use a WORKER JWT.

Body
{
"isAvailable": false
}

or

{
"isAvailable": true
}
Expected Response
{
"success": true,
"message": "Availability updated successfully",
"data": {
"id": "cmsbudnre00018i3s1i7sdidu",
"isAvailable": false,
"updatedAt": "2026-08-05T10:30:00.000Z"
}
}
What Happens Internally
PATCH /api/worker/availability
│
▼
authenticateUser
│
▼
authorize("WORKER")
│
▼
worker.controller.js
│
▼
worker.service.js
│
▼
Prisma ORM
│
▼
UPDATE WorkerProfile
SET isAvailable = false
WHERE userId = JWT_USER_ID
│
▼
JSON Response
After this API

The Worker Profile Module will be fully complete:

✅ POST /api/worker/profile
✅ GET /api/worker/profile
✅ PUT /api/worker/profile
✅ GET /api/worker/:id
✅ PATCH /api/worker/availability

At that point, create a commit on feature/worker-profile:

git add .
git commit -m "feat(worker): complete worker profile module"
git push origin feature/worker-profile

Then we'll create the feature/jobs branch and begin the Job Module with POST /api/jobs, which is the core feature of your HomeConnect application.
