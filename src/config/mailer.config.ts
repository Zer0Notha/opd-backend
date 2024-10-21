import nodemailer from 'nodemailer';

export const smtpUser = process.env.SMTP_USER;

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: true, // enforcing secure transfer
	auth: {
		user: smtpUser,
		pass: process.env.SMTP_PASSWORD,
	},
});
