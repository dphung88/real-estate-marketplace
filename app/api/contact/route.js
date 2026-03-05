import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Axiom Realty Contact <onboarding@resend.dev>',
      to: ['dphung@my.ggu.edu'],
      replyTo: email,
      subject: `[Axiom Realty] New Contact: ${subject || 'General Inquiry'} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #0d1b2a; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 22px;">Axiom Realty</h1>
            <p style="color: #fff; margin: 5px 0 0;">New Contact Form Submission</p>
          </div>
          <div style="padding: 24px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333; width: 140px;">Full Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">
                  <a href="mailto:${email}" style="color: #C9A84C;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${subject || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #555; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f9f9f9; padding: 16px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #999;">
            This email was sent from the Axiom Realty contact form. Reply directly to this email to respond to ${name}.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('API error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
