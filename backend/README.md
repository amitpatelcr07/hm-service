# HomeConnect Backend

## Cash payment API

- `POST /api/payments` (customer): create a `CASH_PENDING` payment for a completed job.
- `POST /api/payments/:id/cash/customer-confirm` (customer): records cash handover and starts the 7-day worker deadline.
- `GET /api/payments/worker` (worker): list cash payments for accepted jobs.
- `POST /api/payments/:id/cash/worker-confirm` (accepted worker): confirms receipt and marks the payment successful.
- `POST /api/payments/:id/cash/dispute` (accepted worker): requires `disputeReason` and moves the payment to review.
- `GET /api/payments/:id/receipt` (customer, accepted worker, or admin): returns a successful cash receipt and audit trail.
- `GET /api/payments/admin/review` (admin): lists expired or disputed cash payments.
- `POST /api/payments/:id/cash/resolve` (admin): requires `resolution` (`SUCCESS`, `FAILED`, or `REFUNDED`) and `resolutionNote`.

Set a user's `role` to `ADMIN` through a controlled database/admin provisioning process; public registration cannot create admins. Run `npm test` for cash state-transition checks. Apply Prisma migrations before deploying.
