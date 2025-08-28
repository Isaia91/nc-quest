const QRCode = require('qrcode');
const etudiants = require('../src/app/assets/quest.json');

const baseUrl = process.env.BASE_URL || "http://localhost:4200";

etudiants.forEach(e => {
  const url = `${baseUrl}/etudiant/${e.id}`;
  QRCode.toFile(`./qrcodes/${e.id}.png`, url, (err) => {
    if (err) throw err;
    console.log(`QR code généré pour ${e.nom} (${url})`);
  });
});
