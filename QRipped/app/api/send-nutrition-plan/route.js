import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, weight, height, goal } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Emaili mungon' }, { status: 400 });
    }

    const goalText = goal === 'muscle_gain' ? 'Shtim Mase Musculare (Bulking)' : 'Formësim / Humbje Peshe';
    const targetCalories = goal === 'muscle_gain' ? '2,800 - 3,000 kcal' : '2,200 kcal';

    // Dërgimi i e-mailit me Resend duke përfshirë planin 1-mujor
    const data = await resend.emails.send({
      from: 'QRipped <onboarding@resend.dev>', // Ndryshoje kur të bësh verify domain-in te Resend
      to: [email],
      subject: 'Plani 1-Mujor i Ushqimit nga QRipped! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 650px; margin: auto;">
          <h2 style="color: #00a859; text-transform: uppercase; text-align: center;">Plani Tënd 1-Mujor i Fitnesit & Ushqimit</h2>
          <p style="text-align: center; color: #94a3b8;">Krijuar posaçërisht për të arritur maksimumin e rezultateve të tua.</p>
          
          <div style="background: #111; padding: 15px 20px; border-radius: 8px; border: 1px solid #222; margin: 20px 0;">
            <p style="margin: 5px 0;">Gjatësia: <strong>${height || '183'} cm</strong> | Pesha: <strong>${weight || '76'} kg</strong></p>
            <p style="margin: 5px 0;">Qëllimi: <strong style="color: #00a859;">${goalText}</strong></p>
            <p style="margin: 5px 0;">Kaloritë Ditore: <strong style="color: #00a859;">${targetCalories}</strong></p>
          </div>

          <!-- STRUKTURA DITORE BAZË -->
          <div style="background: #0f172a; padding: 20px; border-radius: 8px; border-left: 4px solid #00a859; margin-bottom: 20px;">
            <h3 style="color: #00a859; margin-top: 0;">Pjata Standarde Ditore (Përsëritet për bazë)</h3>
            <ul style="color: #cbd5e1; padding-left: 20px; margin-bottom: 0;">
              <li><strong>Mëngjesi:</strong> Tërshërë (100g) me qumësht, 1 banane, 1 lugë gjalpë kikiriki dhe 4 vezë të ziera.</li>
              <li><strong>Dreka:</strong> Gjoks pule ose mish i kuq (200g), Oriz Basmati ose patate (150g), dhe sallatë e gjelbër me vaj ulliri.</li>
              <li><strong>Pasdite (Para stërvitjes):</strong> Bukë integrale me gjizë dhe mjaltë, ose një grusht fruta të thara.</li>
              <li><strong>Darka:</strong> Peshk ose gjoks pule (200g) me perime të pjekura në furrë (brokoli, karrota, speca).</li>
            </ul>
          </div>

          <!-- 4 JAVËT E MUAJIT -->
          <h3 style="color: #ffffff; border-bottom: 1px solid #222; padding-bottom: 8px;">Udhëzuesi Mujor sipas Javëve</h3>
          
          <div style="margin-bottom: 15px;">
            <h4 style="color: #00a859; margin-bottom: 5px;">Javët 1 & 2: Përshtatja dhe Rritja e Metabolizmit</h4>
            <p style="color: #cbd5e1; font-size: 13px; margin-top: 0;">Fokusohu te konsumimi i rregullt i kalorive të përcaktuara dhe hidratimi (minimumi 3 litra ujë në ditë). Mos e kapërtce asnjë vakt.</p>
          </div>

          <div style="margin-bottom: 15px;">
            <h4 style="color: #00a859; margin-bottom: 5px;">Javët 3: Intensiteti dhe Ngarkesa Progresive</h4>
            <p style="color: #cbd5e1; font-size: 13px; margin-top: 0;">Nëse trupi është përshtatur, mund të shtosh 50g karbohidrate shtesë (oriz ose patate) në ditët e stërvitjes së rëndë për të mbështetur rritjen e masës muskulare.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: #00a859; margin-bottom: 5px;">Javët 4: Konsolidimi dhe Vlerësimi i Rezultateve</h4>
            <p style="color: #cbd5e1; font-size: 13px; margin-top: 0;">Kontrollo peshën në fund të javës së katërt. Nëse ke shtuar peshë pastër, vazhdo me të njëjtin ritëm. Nëse ke ngecur, rrit pak yndyrat e shëndetshme (vaj ulliri, arra).</p>
          </div>

          <hr style="border: 0; border-top: 1px solid #222; margin: 25px 0;" />
          
          <p style="text-align: center; color: #94a3b8; font-size: 12px;">Nëse ke pyetje, vizito faqen tonë zyrtare QRipped.</p>
          <p style="color: #00a859; text-align: center; font-weight: bold; margin-top: 10px;">Train smarter. Get stronger. — QRipped</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}