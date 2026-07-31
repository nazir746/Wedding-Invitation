// Send a real test RSVP notification email via Gmail SMTP.
//
// Credentials are read ONLY from environment variables — nothing is
// hardcoded here. (The Gmail app password was previously embedded in
// this file's usage comment; that has been removed for security.)
//
// Usage:
//   GMAIL_USER='naziraman7@gmail.com' \
//   GMAIL_APP_PASS='<your Gmail app password>' \
//   NOTIFY_TO='najir74680@gmail.com' \
//   node scripts/send-rsvp-test-email.mjs
import nodemailer from 'nodemailer';

// ── Gmail SMTP (app password; spaces are optional) ──
const user = process.env.GMAIL_USER;
const pass = (process.env.GMAIL_APP_PASS || '').replace(/\s+/g, '');
const to = process.env.NOTIFY_TO || user;

if (!user || !pass) {
  console.error('Set GMAIL_USER and GMAIL_APP_PASS (Gmail app password).');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: { user, pass },
});

// ── Sample RSVP payload (mimics what the trigger sends) ──
const sample = {
  name: 'Ayesha Rahman',
  attendance: 'attending',
  wishes: 'MashaAllah! May Allah bless this beautiful union with love, barakah and lifelong happiness. 💛',
  created_at: new Date().toISOString(),
};

const attending = sample.attendance === 'attending';

const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0B0B0B;font-family:Georgia,'Times New Roman',serif;">
    <center>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#14100A;border:1px solid rgba(212,175,55,0.35);border-radius:16px;overflow:hidden;">
              <!-- Gold top bar -->
              <tr>
                <td height="6" style="background:linear-gradient(90deg,#996515,#D4AF37,#F5E6A3,#D4AF37,#996515);"></td>
              </tr>
              <tr>
                <td align="center" style="padding:40px 36px 8px;">
                  <p style="margin:0;color:#D4AF37;font-size:11px;letter-spacing:6px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Nazir &amp; Aliya</p>
                  <h1 style="margin:14px 0 4px;color:#F5E6A3;font-size:28px;font-weight:normal;letter-spacing:1px;">New RSVP Received</h1>
                  <div style="width:64px;height:1px;background:linear-gradient(90deg,transparent,#D4AF37,transparent);margin:16px auto;"></div>
                </td>
              </tr>
              <!-- Guest card -->
              <tr>
                <td align="center" style="padding:8px 36px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1C1608;border:1px solid rgba(212,175,55,0.15);border-radius:12px;">
                    <tr>
                      <td style="padding:20px 24px;border-bottom:1px solid rgba(212,175,55,0.1);">
                        <p style="margin:0;color:#D4AF37;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Guest</p>
                        <p style="margin:6px 0 0;color:#FDFBF7;font-size:20px;">${sample.name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 24px;border-bottom:1px solid rgba(212,175,55,0.1);">
                        <p style="margin:0;color:#D4AF37;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Response</p>
                        <p style="margin:6px 0 0;color:${attending ? '#8BE08B' : '#F4A2A2'};font-size:18px;">${attending ? 'InshaAllah attending' : 'Regretfully declining'}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0;color:#D4AF37;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Wishes</p>
                        <p style="margin:6px 0 0;color:#E8DCC0;font-size:15px;line-height:1.6;font-style:italic;">&ldquo;${sample.wishes}&rdquo;</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="padding:28px 36px 36px;">
                  <p style="margin:0;color:rgba(253,251,247,0.45);font-size:12px;font-family:Arial,Helvetica,sans-serif;">
                    Received ${new Date(sample.created_at).toLocaleString()} · via the wedding invitation
                  </p>
                  <p style="margin:10px 0 0;color:rgba(212,175,55,0.5);font-size:10px;letter-spacing:4px;font-family:Arial,Helvetica,sans-serif;">#NAZIRANDALIYA</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`;

try {
  const info = await transporter.sendMail({
    from: `Nazir & Aliya <${user}>`,
    to,
    subject: `New RSVP: ${sample.name} (${attending ? 'attending' : 'declining'})`,
    html,
  });
  console.log('SENT OK:', info.messageId, '->', to);
} catch (err) {
  console.error('SEND_FAILED:', err.message);
  process.exitCode = 1;
}
