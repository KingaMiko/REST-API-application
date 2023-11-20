import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const loadTemplate = (templateName, data) => {
  const filePath = path.join(__dirname, "templates", `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, "utf-8");
  const template = handlebars.compile(source);
  return template(data);
};

export async function sendVerificationEmail(userEmail, verificationToken) {
  const baseURL = process.env.BASE_URL || "http://localhost:3000";
  const verificationUrl = `${baseURL}/api/users/verify/${verificationToken}`;

  const emailContent = loadTemplate("verificationEmail", {
    verificationUrl,
  });

  const message = {
    to: userEmail,
    from: "my.voice.evaporates@gmail.com",
    subject: "Email Verification for Your Account",
    html: emailContent,
  };

  await sgMail.send(message);
}
