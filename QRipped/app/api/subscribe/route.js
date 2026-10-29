import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'QRipped <onboarding@resend.dev>',
      to: 'qripped.contact@gmail.com', // Këtu do pranosh njoftimin
      subject: 'New Protocol Subscriber',
      html: `<p>Përdoruesi me email: <strong>${email}</strong> u regjistrua në QRipped!</p>`
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}