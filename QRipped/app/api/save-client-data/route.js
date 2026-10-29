import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, age, weight, height, notes } = await req.json();

    const data = await resend.emails.send({
      // Adresa e saktë që lejon Resend në fazën testuese/falas
      from: 'QRIPPED <onboarding@resend.dev>',
      
      // Emaili yt ku do të vijnë njoftimet e klientit
      to: ['qripped.contact@gmail.com'], 
      
      // Lejon që t'i kthesh përgjigje klientit direkt nga emaili
      reply_to: email, 
      
      subject: `Klient i Ri për Masë Muskulore: ${name}`, 
      
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc;">
          <h2 style="color: #0f763e; margin-top: 0;">🏋️‍♂️ Porosi e Re & Të Dhëna Trupi</h2>
          <p style="color: #64748b; font-size: 14px;">Keni pranuar një regjistrim të ri për planin e personalizuar QRipped Pro.</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Emri Mbiemri:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; text-align: right;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Email Adresa:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; text-align: right;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Mosha:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; text-align: right;">${age} vjeç</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Pesha:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; text-align: right;">${weight} kg</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Gjatësia:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; text-align: right;">${height} cm</td>
            </tr>
          </table>

          ${notes ? `
            <div style="margin-top: 20px;">
              <strong style="color: #64748b; font-size: 14px;">Shënime / Alergji:</strong>
              <blockquote style="background: #ffffff; padding: 12px 16px; border-left: 4px solid #0fa94a; margin: 8px 0 0 0; border-radius: 8px; color: #334155;">
                ${notes}
              </blockquote>
            </div>
          ` : ''}

          <div style="margin-top: 25px; text-align: center; font-size: 12px; color: #94a3b8;">
            Ky mesazh u dërgua automatikisht nga sistemi i faqes suaj QRipped.
          </div>
        </div>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Gabim në Resend:", error.message);
    return Response.json({ 
        message: "Gabim teknik gjatë dërgimit të emailit", 
        error: error.message 
    }, { status: 500 });
  }
}