import nodemailer from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';
import { UserInterface } from '../../db/types/user-type';

enum Templates {
  SignupConfirmationEmail = 'signup-confirmation',
  WelcomeEmail = 'welcome',
  PasswordResetEmail = 'password-reset',
}

enum Subjects {
  SignupConfirmationSubject = 'GoGo Travel | Please Confirm Your Email',
  WelcomeSubject = "GoGo Travel | Let's goooo! Welcome to GoGo!",
  PasswordResetSubject = 'GoGo Travel | Reset Your Password (Valid for 10 minutes)',
}

export class Email {
  url: string;
  firstName: string | null;
  to: string;
  from: string;

  constructor(user: UserInterface, url: string) {
    this.url = url;
    this.firstName = user.first_name || 'there';
    this.to = user.email;
    this.from = process.env.GOOGLE_SMTP_EMAIL!;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Production Email
      return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTP_AUTH_USER,
          pass: process.env.SMTP_AUTH_PWD!.replaceAll('_', ' '),
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.DEV_EMAIL_HOST,
      port: Number(process.env.DEV_EMAIL_PORT),
      auth: {
        user: process.env.DEV_EMAIL_USERNAME,
        pass: process.env.DEV_EMAIL_PASSWORD,
      },
    });
  }

  async send(template: Templates, subject: Subjects) {
    // 1) RENDER HTML BASED ON A PUG TEMPLATE
    const html = pug.renderFile(`${__dirname}/templates/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) DEFINE EMAIL OPTIONS
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, {
        wordwrap: 130,
      }),
    };

    await this.createTransport().sendMail(mailOptions);
  }

  async sendSignupConfirmation() {
    await this.send(
      Templates.SignupConfirmationEmail,
      Subjects.SignupConfirmationSubject,
    );
  }
  async sendWelcomeEmail() {
    await this.send(Templates.WelcomeEmail, Subjects.WelcomeSubject);
  }
  async sendPasswordReset() {
    await this.send(
      Templates.PasswordResetEmail,
      Subjects.PasswordResetSubject,
    );
  }
}
