import test from "node:test";
import assert from "node:assert/strict";
import {
  createRefreshToken,
  hashRefreshToken,
  setRefreshTokenCookie,
} from "../src/utils/refresh-token.js";

test("refresh tokens are high-entropy values stored as one-way hashes", () => {
  const token = createRefreshToken();
  const hash = hashRefreshToken(token);

  assert.equal(typeof token, "string");
  assert.equal(token.length > 80, true);
  assert.equal(hash, hashRefreshToken(token));
  assert.notEqual(hash, token);
});

test("refresh token cookie is HttpOnly and not exposed to frontend JavaScript", () => {
  const response = {
    setHeader: (name, value) => {
      response[name] = value;
    },
  };

  setRefreshTokenCookie(response, "raw-refresh-token");

  assert.match(response["Set-Cookie"], /^refreshToken=/);
  assert.match(response["Set-Cookie"], /refreshToken=raw-refresh-token/);
  assert.match(response["Set-Cookie"], /HttpOnly/);
  assert.match(response["Set-Cookie"], /SameSite=Lax/);
  assert.doesNotMatch(response["Set-Cookie"], /tokenHash/);
});
