import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('=== API Called ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { from_email, subject, message } = req.body;

  if (!from_email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(from_email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing environment variables!');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Missing EMAIL credentials'
    });
  }

  // iCloud SMTP 설정
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,      // 원래 iCloud 계정
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Attempting to send email via iCloud...');
    
    const info = await transporter.sendMail({
      from: '"Jangmi Yoon" <hey@yoonjang.me>',  // 발신자: 커스텀 도메인 표시
      to: 'hey@yoonjang.me',                    // 수신자: 커스텀 도메인
      replyTo: from_email,                      // 답장 주소: 사용자 이메일
      subject: `[Portfolio Contact] ${subject}`,
      text: `From: ${from_email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>From:</strong> ${from_email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="padding: 20px; background: white; border: 1px solid #ddd; border-radius: 5px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 0.85em; color: #666;">
            This message was sent via the contact form at yoonjang.me
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully!', info.messageId);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      code: error.code
    });
  }
}