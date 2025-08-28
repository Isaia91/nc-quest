const QRCode = require('qrcode');
const fs = require('fs');
const etudiants = require('../src/app/assets/quest.json');

// 1) On prend d'abord la variable d'environnement
// 2) Sinon, si l'argument ressemble à une URL, on l'utilise
// 3) Sinon on traite des alias "prod"/"local"
// 4) Fallback: localhost
const arg = process.argv[2]; // ex: "prod" ou "https://ncquest.netlify.app"
let baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  if (arg && /^https?:\/\//i.test(arg)) {
    baseUrl = arg;
  } else if (arg === 'prod') {
    baseUrl = 'https://ncquest.netlify.app';
  } else {
    baseUrl = 'http://localhost:4200';
  }
}

fs.mkdirSync('qrcodes', { recursive: true });

etudiants.forEach(e => {
  const url = `${baseUrl}/etudiant/${e.id}`;
  QRCode.toFile(`qrcodes/${e.id}.png`, url, { width: 600, margin: 2, errorCorrectionLevel: 'H' }, (err) => {
    if (err) throw err;
    console.log(`QR code généré pour ${e.nom} (${url})`);
  });
});
