import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendVerificationEmail(userEmail, verificationToken) {
  const baseURL = process.env.BASE_URL;
  const verificationUrl = `${baseURL}/api/users/verify/${verificationToken}`;

  const message = {
    to: userEmail,
    from: "my.voice.evaporates@gmail.com",
    subject: "Email Verification for Your Account",
    text: `Please verify your email by clicking on this link: ${verificationUrl}`,
    html: `<strong>Please verify your email by clicking on this link:</strong> <a href="${verificationUrl}">${verificationUrl}</a>`,
  };

  await sgMail.send(message);
}
