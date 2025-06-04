const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
    // 1) Create a transporter
    // This is the service that will send the emails.
    // We'll use environment variables for configuration to keep credentials secure.
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT == 465, // True for 465 (SSL/TLS), false for other ports (like 587 for STARTTLS)
        auth: {
            user: process.env.EMAIL_USER, // Your email service username
            pass: process.env.EMAIL_PASS // Your email service password or app-specific password
        }
    });

    // 2) Define the email options
    // This includes sender, recipient, subject, and content.
    const mailOptions = {
        from: process.env.EMAIL_FROM, // e.g., 'Your App Name <no-reply@yourapp.com>'
        to: options.to,
        subject: options.subject,
        text: options.text,
        // html: options.html // You can also send HTML content if needed
    };

    // 3) Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;