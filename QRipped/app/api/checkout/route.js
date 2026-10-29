import { NextResponse } from 'next/server';
// Mund të instalosh Resend (npm i resend) ose Nodemailer për dërgimin e e-mailit
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { plan, name, email, phone, weight, height, notes } = body;

    // Këtu mund të shkruash logjikën e dërgimit të email-it ose SMS-it
    console.log("Të dhënat e pranuara nga klienti:", { plan, name, email, phone, weight, height, notes });

    /* Shembull se si dërgohet me Resend (Email):
    await resend.emails.send({
      from: 'QRipped <onboarding@resend.dev>',
      to: ['emailiyt@gmail.com'], // Emaili yt ku merr njoftimet
      subject: `Klient i Ri Pro - ${name}`,
      html: `<p><b>Emri:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Telefoni:</b> ${phone}</p>
             <p><b>Pesha:</b> ${weight} kg | <b>Gjatësia:</b> ${height} cm</p>
             <p><b>Shënime:</b> ${notes}</p>`
    });
    */

    // Për pjesën e SMS-it: Mund të përdorësh Twilio API këtu nëse dëshiron t'i dërgosh SMS vetes ose klientit.

    return NextResponse.json({ success: true, message: "Të dhënat u dërguan me sukses!" }, { status: 200 });
  } catch (error) {
    console.error("Gabim në server:", error);
    return NextResponse.json({ success: false, error: "Gabim gjatë procesimit" }, { status: 500 });
  }
}