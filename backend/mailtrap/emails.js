import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";
import { client, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Verification Email",
    });
    console.log("Eamil sent successfully", response);
  } catch (err) {
    console.log("Error sending email", err);
    throw new Error("Error sending email");
  }
};

export const sendWelcomeEmail = async (email) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      template_uuid: "d0617f2c-cb82-451e-ade8-7bdbe149520e",
      template_variables: {
        company_info_name: "Kunal ",
      },
    });
    console.log("Eamil sent successfully");
  } catch (err) {
    console.log("Error sending email", err);
    throw new Error("Error sending email");
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken),
      category: "Password Reset ",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const sendPasswordSuccessEmail = async (email, resetToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
