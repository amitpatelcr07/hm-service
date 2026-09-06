import nodemailer from "nodemailer";
import dotenv from "dotenv";
const transporter = nodemailer.createTransport({
  service: "gmail",
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailConfigurationError = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    const error = new Error("Email service is not configured");
    error.code = "EMAIL_CONFIG_MISSING";
    return error;
  }

  return null;
};

export const sendVerificationEmail = async (email, token) => {
  const configurationError = emailConfigurationError();
  if (configurationError) {
    throw configurationError;
  }

  const frontendUrl = (
    process.env.FRONTEND_URL || "https://hm-service-lac.vercel.app"
  ).replace(/\/$/, "");
  const verificationUrl = `${frontendUrl}/verify-email/${encodeURIComponent(token)}`;
  await transporter.sendMail({
    from: `"HomeConnect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your HomeConnect email address",

    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your HomeConnect account</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f3f6fb;
  font-family: Arial, Helvetica, sans-serif;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f3f6fb; padding: 40px 15px;"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background-color: #2563eb;
                padding: 32px 25px;
              "
            >

              <div style="
                color: #ffffff;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 0.5px;
              ">
                HomeConnect
              </div>

              <div style="
                color: #dbeafe;
                font-size: 14px;
                margin-top: 8px;
              ">
                Connecting people with trusted professionals
              </div>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">

              <h1 style="
                margin: 0 0 18px 0;
                color: #111827;
                font-size: 24px;
                line-height: 1.4;
              ">
                Welcome to HomeConnect! 👋
              </h1>

              <p style="
                margin: 0 0 16px 0;
                color: #4b5563;
                font-size: 16px;
                line-height: 1.7;
              ">
                Thank you for creating your HomeConnect account.
                We're excited to have you with us.
              </p>

              <p style="
                margin: 0 0 25px 0;
                color: #4b5563;
                font-size: 16px;
                line-height: 1.7;
              ">
                To keep your account secure, please verify your email
                address by clicking the button below.
              </p>

              <!-- CTA -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td align="center">

                    <a
                      href="${verificationUrl}"
                      style="
                        display: inline-block;
                        background-color: #2563eb;
                        color: #ffffff;
                        text-decoration: none;
                        font-size: 16px;
                        font-weight: bold;
                        padding: 14px 30px;
                        border-radius: 8px;
                      "
                    >
                      Verify My Email
                    </a>

                  </td>
                </tr>
              </table>

              <!-- Expiration -->
              <div style="
                margin-top: 30px;
                padding: 16px;
                background-color: #eff6ff;
                border-radius: 8px;
              ">

                <p style="
                  margin: 0;
                  color: #1e40af;
                  font-size: 14px;
                  line-height: 1.6;
                ">
                  🔒 <strong>Security notice:</strong>
                  This verification link will expire in 24 hours.
                </p>

              </div>

              <!-- Fallback URL -->
              <p style="
                margin: 28px 0 8px 0;
                color: #6b7280;
                font-size: 13px;
                line-height: 1.6;
              ">
                If the button above doesn't work, copy and paste the
                following link into your browser:
              </p>

              <p style="
                margin: 0;
                word-break: break-all;
                font-size: 12px;
                line-height: 1.6;
              ">
                <a
                  href="${verificationUrl}"
                  style="color: #2563eb;"
                >
                  ${verificationUrl}
                </a>
              </p>

              <p style="
                margin: 28px 0 0 0;
                color: #6b7280;
                font-size: 13px;
                line-height: 1.6;
              ">
                If you didn't create a HomeConnect account,
                you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="
                height: 1px;
                background-color: #e5e7eb;
              "></div>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding: 25px 40px 35px 40px;">

              <p style="
                margin: 0;
                color: #374151;
                font-size: 14px;
                line-height: 1.6;
              ">
                Best regards,
              </p>

              <p style="
                margin: 4px 0 0 0;
                color: #111827;
                font-size: 15px;
                font-weight: bold;
              ">
                The HomeConnect Team
              </p>

              <p style="
                margin: 4px 0 0 0;
                color: #6b7280;
                font-size: 13px;
              ">
                Connecting you with trusted professionals
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                background-color: #f9fafb;
                padding: 20px;
              "
            >

              <p style="
                margin: 0;
                color: #9ca3af;
                font-size: 12px;
                line-height: 1.6;
              ">
                © ${new Date().getFullYear()} HomeConnect.
                All rights reserved.
              </p>

              <p style="
                margin: 6px 0 0 0;
                color: #9ca3af;
                font-size: 12px;
              ">
                This is an automated email. Please do not reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
  });
};
