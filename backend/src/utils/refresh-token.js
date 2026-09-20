import crypto from "crypto";

const parseDuration = (value, fallbackMs) => {
  const match = String(value || "").match(/^(\d+)([smhd])$/i);
  if (!match) return fallbackMs;

  const units = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return Number(match[1]) * units[match[2].toLowerCase()];
};

export const REFRESH_COOKIE_NAME = "refreshToken";
export const refreshTokenMaxAge = parseDuration(
  process.env.REFRESH_TOKEN_EXPIRES_IN,
  7 * 24 * 60 * 60 * 1000,
);

export const createRefreshToken = () =>
  crypto.randomBytes(64).toString("base64url");

export const hashRefreshToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const getRefreshTokenFromRequest = (req) => {
  const cookies = req.headers.cookie?.split(";") || [];
  const cookie = cookies.find((value) =>
    value.trim().startsWith(`${REFRESH_COOKIE_NAME}=`),
  );

  return cookie
    ? decodeURIComponent(cookie.trim().split("=").slice(1).join("="))
    : null;
};

export const setRefreshTokenCookie = (res, token) => {
  const secure =
    process.env.COOKIE_SECURE === "true" ||
    process.env.NODE_ENV === "production";
  const sameSite = process.env.COOKIE_SAME_SITE || (secure ? "None" : "Lax");
  const parts = [
    `${REFRESH_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${Math.floor(refreshTokenMaxAge / 1000)}`,
    `SameSite=${sameSite}`,
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
};

export const clearRefreshTokenCookie = (res) => {
  const secure =
    process.env.COOKIE_SECURE === "true" ||
    process.env.NODE_ENV === "production";
  const sameSite = process.env.COOKIE_SAME_SITE || (secure ? "None" : "Lax");
  const parts = [
    `${REFRESH_COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "Max-Age=0",
    `SameSite=${sameSite}`,
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
};
