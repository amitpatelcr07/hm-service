import test from "node:test";
import assert from "node:assert/strict";
import { isAllowedCashTransition } from "../src/services/payment.service.js";

test("cash cannot become successful from a customer-only confirmation", () => {
  assert.equal(isAllowedCashTransition("CASH_PENDING", "SUCCESS"), false);
  assert.equal(isAllowedCashTransition("CASH_PENDING", "CASH_CUSTOMER_CONFIRMED"), true);
});

test("worker confirmation and disputes have legal transitions", () => {
  assert.equal(isAllowedCashTransition("CASH_CUSTOMER_CONFIRMED", "SUCCESS"), true);
  assert.equal(isAllowedCashTransition("CASH_CUSTOMER_CONFIRMED", "CASH_DISPUTED"), true);
  assert.equal(isAllowedCashTransition("CASH_CUSTOMER_CONFIRMED", "CASH_REVIEW"), true);
});

test("only review or disputed payments can use terminal admin outcomes", () => {
  assert.equal(isAllowedCashTransition("CASH_REVIEW", "REFUNDED"), true);
  assert.equal(isAllowedCashTransition("CASH_DISPUTED", "FAILED"), true);
  assert.equal(isAllowedCashTransition("SUCCESS", "FAILED"), false);
});
