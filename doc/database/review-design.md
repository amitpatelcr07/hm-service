Perfect! 🚀

We're now starting the Review Module.

This module is a little different because it contains business validation, not just CRUD.

API
POST /api/reviews
Real Life Flow
Customer

↓

Job Posted

↓

Worker Applied

↓

Customer Accepted Worker

↓

Worker Completed Job

↓

Customer Gives Review ⭐⭐⭐⭐⭐

↓

Worker Rating Updated
Business Rules

Before creating a review we must validate:

Rule 1

User must be logged in.

✅ Authentication Middleware

Rule 2

Only CUSTOMER can review.

✅ Role Middleware

Rule 3

Job must exist.

Rule 4

Job status must be

COMPLETED

Cannot review a job that is still

OPEN

or

IN_PROGRESS
Rule 5

Customer must own that job.

Customer A

created Job

↓

Can Review

---

Customer B

↓

Cannot Review
Rule 6

Customer can review only once.

Your Prisma schema already has

@@unique([jobId, customerId])

We'll still check it manually so we can return a friendly error instead of a database exception.

Rule 7

Rating must be

1

2

3

4

5
Development Flow
POST /api/reviews

↓

Authentication

↓

Role Check

↓

Controller

↓

Service

↓

Find Job

↓

Job Completed?

↓

Customer Owns Job?

↓

Already Reviewed?

↓

Find Accepted Worker

↓

Create Review

↓

Return Response
Folder Structure

You should create these files:

backend/routes/review.routes.js

backend/controllers/review.controller.js

backend/services/review.service.js

Then register the route in your main app (or wherever you mount routes):

app.use("/api/reviews", reviewRoutes);
Step 1 — Route
backend/routes/review.routes.js
const express = require("express");

const router = express.Router();

const { createReview } = require("../controllers/review.controller");

const {
authenticateUser,
} = require("../middlewares/auth.middleware");

const authorize = require("../middlewares/role.middleware");

router.post(
"/",
authenticateUser,
authorize("CUSTOMER"),
createReview
);

module.exports = router;
Step 2 — Controller
backend/controllers/review.controller.js
const {
createReviewService,
} = require("../services/review.service");

const createReview = async (req, res) => {
try {

    const customerId = req.user.userId;

    const review = await createReviewService(
      customerId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });

} catch (error) {

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });

}
};

module.exports = {
createReview,
};
Step 3 — Service

Create the file:

backend/services/review.service.js

We'll build this step by step because it's the most complex service so far.

The first part will:
Validate rating.
Find the job.
Verify the customer owns the job.
Verify the job is completed.
Check for an existing review.
Find the accepted application to determine which worker should receive the review.
Create the review.

We'll implement that logic in the next step so it's easier to understand and test.

Expected Request
{
"jobId": "cmsgd98ot00018ij4njayfl7c",
"rating": 5,
"comment": "Excellent work. Very professional and completed on time."
}
Expected Response
{
"success": true,
"message": "Review created successfully",
"data": {
"id": "review_id",
"rating": 5,
"comment": "Excellent work. Very professional and completed on time.",
"jobId": "cmsgd98ot00018ij4njayfl7c",
"customerId": "customer_id",
"workerProfileId": "worker_profile_id"
}
}

---

Next API

The logical next API is:

GET /api/workers/:id/reviews

This API will show all reviews received by a worker.

Example frontend:

Worker Profile

⭐⭐⭐⭐⭐ 4.8 (32 Reviews)

John D.
★★★★★
Excellent service.

---

Amit Patel
★★★★★
Very professional.

---

Rahul Sharma
★★★★☆
Good work.
Development Flow
GET /api/workers/:id/reviews

↓

Worker Profile ID

↓

Find Reviews

↓

Include Customer Name

↓

Sort Latest First

↓

Return Array
Folder Structure

We'll continue using the same Review module.

routes/
review.routes.js

controllers/
review.controller.js

services/
review.service.js
Route
router.get(
"/workers/:id",
getWorkerReviews
);

or

router.get(
"/worker/:id",
getWorkerReviews
);

Both are acceptable, but I recommend:

GET /api/reviews/worker/:id

because all review-related APIs stay under /api/reviews.

Service Logic

The service will:

Worker ID

↓

Find all reviews

↓

Include customer details

↓

Newest first

↓

Return

Example Prisma query:

await prisma.review.findMany({
where: {
workerProfileId,
},
include: {
customer: {
select: {
fullName: true,
},
},
},
orderBy: {
createdAt: "desc",
},
});
Response
{
"success": true,
"data": [
{
"id": "...",
"rating": 5,
"comment": "Excellent work",
"customer": {
"fullName": "Amit Patel"
},
"createdAt": "2026-08-06T16:08:22.939Z"
}
]
}
After That

Once this API is complete, we'll build:

GET /api/reviews/:id

↓

PUT /api/reviews/:id

↓

DELETE /api/reviews/:id

After finishing those, the Review Module will be 100% complete.

---

API
GET /api/reviews/:id
Purpose

Return a single review by its ID.

Example:

GET /api/reviews/cmshpmzad00018irkd84bptqj
Workflow
Client

↓

GET /api/reviews/:id

↓

Review Route

↓

Review Controller

↓

Review Service

↓

Find Review

↓

Include Customer

↓

Include Worker

↓

Include Job

↓

---

Perfect! We're almost done with the Review Module.

This API will allow a customer to edit their own review.

API
PUT /api/reviews/:id
Purpose

Update an existing review.

Example:

PUT /api/reviews/cmshpmzad00018irkd84bptqj
Business Rules

Before updating a review:

✅ User must be logged in.
✅ Only CUSTOMER can update a review.
✅ Review must exist.
✅ Customer must own the review.
✅ Rating must be between 1 and 5.
Workflow
Customer

↓

PUT /api/reviews/:id

↓

Authenticate User

↓

Role Check (CUSTOMER)

↓

Find Review

↓

Review Exists?

↓

Review Belongs To Customer?

↓

Validate Rating

↓

Update Review

↓

Return Response

---

Perfect! 🎉 This is the last API of the Review Module.

After this, your Review module will be 100% complete.

API
DELETE /api/reviews/:id
Business Rules

Before deleting a review:

✅ User must be logged in.
✅ Only CUSTOMER can delete a review.
✅ Review must exist.
✅ Customer must own the review.
Workflow
Customer

↓

DELETE /api/reviews/:id

↓

Authenticate User

↓

Role Check (CUSTOMER)

↓

Find Review

↓

Review Exists?

↓

Owner Check

↓

Delete Review

↓

Success Response
