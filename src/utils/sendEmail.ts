import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEnrollmentEmail = async (to: string, username: string, courseName: string) => {
    console.log('Sending email...');
    console.log('to:', to, 'username:', username, 'courseName:', courseName);
    const msg = {
        to,
        from: 'chanucsj@gmail.com',
        replyTo: 'chanucsj@gmail.com',
        subject: 'Your enrollment is now active',
        html: `
    <p>Hello ${username},</p>
    <p>Your enrollment for the course <strong>${courseName}</strong> is now <strong>active</strong>.</p>
    <p>Happy Learning!</p>
  `,
    };


    try {
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Email failed to send:', error);
    }
};
