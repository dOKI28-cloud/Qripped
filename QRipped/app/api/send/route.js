import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      // Kjo është adresa e saktë që lejon Resend falas
      from: 'QRIPPED <onboarding@resend.dev>', 
      
      // Emaili yt ku do të vijnë njoftimet
      to: ['qripped.contact@gmail.com'], 
      
      // Lejon që t'i kthesh përgjigje klientit direkt
      reply_to: email, 
      
      subject: `Mesazh i ri nga: ${name}`, 
      
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>Detajet e Kontaktit</h2>
          <p><strong>Emri:</strong> ${name}</p>
          <p><strong>Email i Klientit:</strong> ${email}</p>
          <hr />
          <p><strong>Mesazhi:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #00a859;">
            ${message}
          </blockquote>
        </div>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ 
        message: "Gabim teknik", 
        error: error.message 
    }, { status: 500 });
  }
}