-- CreateEnum
CREATE TYPE "public"."JobCategory" AS ENUM ('PLUMBING', 'ELECTRICAL', 'PAINTING', 'CARPENTRY', 'CLEANING', 'APPLIANCE_REPAIR', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Job" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."JobCategory" NOT NULL,
    "location" TEXT NOT NULL,
    "budget" DECIMAL(10,2) NOT NULL,
    "status" "public"."JobStatus" NOT NULL DEFAULT 'OPEN',
    "requiredDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "workerProfileId" TEXT NOT NULL,
    "proposal" TEXT,
    "expectedPrice" DECIMAL(10,2) NOT NULL,
    "estimatedDays" INTEGER,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobId_workerProfileId_key" ON "public"."JobApplication"("jobId", "workerProfileId");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobApplication" ADD CONSTRAINT "JobApplication_workerProfileId_fkey" FOREIGN KEY ("workerProfileId") REFERENCES "public"."WorkerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
