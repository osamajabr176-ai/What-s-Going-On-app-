
import nodemailer from "nodemailer";
import { config } from "dotenv";
import {env} from "../config/env.js";
// Create a transporter using SMTP

config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: env.nodemailer.user,
    pass: env.nodemailer.pass,
  },
});
export async function sendEmail(to,otp,subject = "Otp Verification") {
await transporter.sendMail({
    from: `"SarahaApp" <${env.nodemailer.user}>`, // sender address
    to: to , // list of recipients
    subject: subject, // subject line
    text: "This is your otp varification", // plain text body
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your verification code</title>
</head>
<body style="margin:0; padding:0; background-color:#0f1115; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
 
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f1115; padding:40px 16px;">
    <tr>
      <td align="center">
 
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%; background-color:#171a21; border:1px solid #2a2f3a; border-radius:14px;">
 
          <!-- Header -->
          <tr>
            <td style="padding:36px 32px 0 32px; text-align:center;">
              <div style="width:48px; height:48px; background-color:#5b8cff; border-radius:12px; margin:0 auto 20px auto; line-height:48px; font-size:22px; color:#ffffff; font-weight:700;">
                S
              </div>
              <h1 style="margin:0 0 8px 0; font-size:20px; color:#e8eaed; font-weight:600;">
                Verify your email
              </h1>
              <p style="margin:0; font-size:14px; line-height:1.6; color:#8b93a3;">
                Use the code below to finish signing in to Saraha. This code expires in 5 minutes.
              </p>
            </td>
          </tr>
 
          <!-- OTP Code -->
          <tr>
            <td style="padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color:#10131a; border:1.5px solid #2a2f3a; border-radius:10px; padding:20px;">
                    <span style="font-size:32px; font-weight:700; letter-spacing:8px; color:#5b8cff; font-family: 'Courier New', monospace;">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
 
          <!-- Note -->
          <tr>
            <td style="padding:0 32px 32px 32px; text-align:center;">
              <p style="margin:0; font-size:13px; line-height:1.6; color:#8b93a3;">
                Didn't request this code? You can safely ignore this email — no changes will be made to your account.
              </p>
            </td>
          </tr>
 
          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <div style="border-top:1px solid #2a2f3a;"></div>
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px 32px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#5a6072;">
                Saraha App &middot; This is an automated message, please don't reply.
              </p>
            </td>
          </tr>
 
        </table>
 
      </td>
    </tr>
  </table>
 
</body>
</html>`
  });
}