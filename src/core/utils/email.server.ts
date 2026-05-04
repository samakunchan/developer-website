import nodemailer from 'nodemailer';

/**
 * Creates a transporter for sending emails.
 * In development, it uses Ethereal Email for testing.
 * In production, it uses SMTP credentials from environment variables.
 */
async function getTransporter() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // For development, use Ethereal Email
    // We create a test account on the fly if needed, or use a fixed one if you prefer.
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // For production, use real SMTP settings
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Sends an email using the configured transporter.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const transporter = await getTransporter();
  const from = process.env.EMAIL_FROM || '"Secure Papanguesoft" <contact@samakunchan-technology.com>';

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text: text || html.replace(/<[^>]*>?/gm, ''), // Simple fallback for plain text
    html,
  });

  // In development, log the URL to view the email
  if (process.env.NODE_ENV !== 'production') {
    console.log('---------------------------------------');
    console.log('📧 Email sent (Ethereal)');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    console.log('---------------------------------------');
  }

  return info;
}
