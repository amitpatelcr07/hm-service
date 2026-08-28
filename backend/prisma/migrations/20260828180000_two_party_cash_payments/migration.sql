ALTER TYPE "public"."Role" ADD VALUE IF NOT EXISTS 'ADMIN';
ALTER TYPE "public"."PaymentStatus" ADD VALUE IF NOT EXISTS 'CASH_PENDING';
ALTER TYPE "public"."PaymentStatus" ADD VALUE IF NOT EXISTS 'CASH_CUSTOMER_CONFIRMED';
ALTER TYPE "public"."PaymentStatus" ADD VALUE IF NOT EXISTS 'CASH_DISPUTED';
ALTER TYPE "public"."PaymentStatus" ADD VALUE IF NOT EXISTS 'CASH_REVIEW';
ALTER TYPE "public"."PaymentStatus" ADD VALUE IF NOT EXISTS 'REFUNDED';

ALTER TABLE "public"."Payment"
  ADD COLUMN "receiptNumber" TEXT,
  ADD COLUMN "customerCashConfirmedAt" TIMESTAMP(3),
  ADD COLUMN "customerCashConfirmedBy" TEXT,
  ADD COLUMN "workerCashConfirmedAt" TIMESTAMP(3),
  ADD COLUMN "workerCashConfirmedBy" TEXT,
  ADD COLUMN "workerConfirmationDeadline" TIMESTAMP(3),
  ADD COLUMN "disputeReason" TEXT,
  ADD COLUMN "resolvedBy" TEXT,
  ADD COLUMN "resolvedAt" TIMESTAMP(3),
  ADD COLUMN "resolutionNote" TEXT;

CREATE UNIQUE INDEX "Payment_receiptNumber_key" ON "public"."Payment"("receiptNumber");

CREATE TABLE "public"."PaymentAuditLog" (
  "id" TEXT NOT NULL,
  "paymentId" TEXT NOT NULL,
  "actorId" TEXT,
  "actorRole" "public"."Role",
  "action" TEXT NOT NULL,
  "previousStatus" "public"."PaymentStatus",
  "newStatus" "public"."PaymentStatus",
  "note" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PaymentAuditLog_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PaymentAuditLog_paymentId_createdAt_idx" ON "public"."PaymentAuditLog"("paymentId", "createdAt");
ALTER TABLE "public"."PaymentAuditLog" ADD CONSTRAINT "PaymentAuditLog_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
