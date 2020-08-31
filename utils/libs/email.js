const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.BENTO_TEST_SMTP_HOST,
    port: process.env.BENTO_TEST_SMTP_PORT,
    auth: {
      user: process.env.BENTO_TEST_SMTP_USER,
      pass: process.env.BENTO_TEST_SMTP_PASSWORD,
    },
  });
  const message = {
    from: `${process.env.BENTO_TEST_EMAIL_FROM_NAME} <${process.env.BENTO_TEST_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.message,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
