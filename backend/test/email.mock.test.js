import test from "node:test";
import assert from "node:assert/strict";

const loadEmailUtils = async () =>
  import(`../src/utils/email.js?ts=${Date.now()}`);

test("mock email mode skips SMTP delivery and does not require credentials", async () => {
  const previousUser = process.env.EMAIL_USER;
  const previousPassword = process.env.EMAIL_PASSWORD;
  const previousMode = process.env.EMAIL_SEND_MODE;

  try {
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASSWORD;
    process.env.EMAIL_SEND_MODE = "mock";

    const { sendVerificationEmail } = await loadEmailUtils();

    await assert.doesNotReject(() =>
      sendVerificationEmail("user@example.com", "verification-token"),
    );
  } finally {
    if (previousUser === undefined) delete process.env.EMAIL_USER;
    else process.env.EMAIL_USER = previousUser;

    if (previousPassword === undefined) delete process.env.EMAIL_PASSWORD;
    else process.env.EMAIL_PASSWORD = previousPassword;

    if (previousMode === undefined) delete process.env.EMAIL_SEND_MODE;
    else process.env.EMAIL_SEND_MODE = previousMode;
  }
});
