import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x4955de, { conn: _0x4b9a49, usedPrefix: _0xeb2cc9 }) => {
  let _0x414c2d = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        'vcard': "BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=393755853799:+39 375 585 3799\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    'participant': "0@s.whatsapp.net"
  };
  
  let _0x259d4e = `
╭━━━━━━━━━━━━━━━━━━━━━━
│ 👑 **𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧** 👑
╰━━━━━━━━━━━━━━━━━━━━━━

🔧 **Comandi Amministrativi**:

➤ ${_0xeb2cc9}𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐢 / 𝐩 - **Promuovi utente**
➤ ${_0xeb2cc9}𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐝𝐢 / 𝐫 - **Retrocedi utente**
➤ ${_0xeb2cc9}𝐰𝐚𝐫𝐧 / 𝐮𝐧𝐰𝐚𝐫𝐧 - **Aggiungi/Rimuovi Warn**
➤ ${_0xeb2cc9}𝐦𝐮𝐭𝐚 / 𝐬𝐦𝐮𝐭𝐚 - **Mute utente**
➤ ${_0xeb2cc9}𝐦𝐮𝐭𝐞𝐥𝐢𝐬𝐭 - **Disabilita audio**
➤ ${_0xeb2cc9}𝐡𝐢𝐝𝐞𝐭𝐚𝐠 - **Nascondi tag**
➤ ${_0xeb2cc9}𝐭𝐚𝐠𝐚𝐥𝐥 - **Tagga utente**

🔐 **Protezione & Sicurezza**:

➤ ${_0xeb2cc9}blocca / proteggi - **Blocca o proteggi utente**
➤ ${_0xeb2cc9}𝐬𝐞𝐭𝐰𝐞𝐥𝐜𝐨𝐦𝐞 - **Imposta messaggio di benvenuto**
➤ ${_0xeb2cc9}𝐬𝐞𝐭𝐛𝐲𝐞 - **Imposta messaggio di uscita**
➤ ${_0xeb2cc9}𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢 - **Visualizza utenti inattivi**
➤ ${_0xeb2cc9}𝐥𝐢𝐬𝐭𝐚𝐧𝐮𝐦 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 - **Visualizza lista utenti (con prefisso)**

🛠️ **Gestione & Personalizzazione**:

➤ ${_0xeb2cc9}𝐩𝐮𝐥𝐢𝐳𝐢𝐚 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 - **Pulisci utenti con prefisso**
➤ ${_0xeb2cc9}𝐫𝐢𝐦𝐨𝐳𝐢𝐨𝐧𝐞𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢 - **Rimuovi utenti inattivi**
➤ ${_0xeb2cc9}𝐬𝐢𝐦 - **Simula operazioni**
➤ ${_0xeb2cc9}𝐬𝐭𝐮𝐩𝐫𝐚 - **Stupro simulato**
➤ ${_0xeb2cc9}𝐚𝐝𝐦𝐢𝐧𝐬 - **Visualizza lista amministratori**
➤ ${_0xeb2cc9}𝐟𝐫𝐞𝐞𝐳𝐞 @ - **Congela utente (deve essere menzionato)**

📊 **Statistiche & Monitoraggio**:

➤ ${_0xeb2cc9}𝐢𝐬𝐩𝐞𝐳𝐢𝐨𝐧𝐚 (𝐥𝐢𝐧𝐤) - **Esamina link**
➤ ${_0xeb2cc9}𝐭𝐨𝐩 (10,50,100) - **Visualizza top utenti (fino a 100)**

💡 **Funzioni Speciali**:

➤ ${_0xeb2cc9}𝐭𝐨𝐩𝐬𝐞𝐱𝐲 - **Visualizza top sexy**
➤ ${_0xeb2cc9}𝐭𝐨𝐩𝐭𝐫𝐨𝐢𝐞 - **Visualizza top troie**
➤ ${_0xeb2cc9}𝐩𝐢𝐜 @ - **Invia foto di un utente (deve essere menzionato)**

🔧 **Impostazioni & Personalizzazioni**:

➤ ${_0xeb2cc9}𝐬𝐞𝐭𝐰𝐞𝐥𝐜𝐨𝐦𝐞 - **Imposta benvenuto**
➤ ${_0xeb2cc9}𝐬𝐞𝐭𝐛𝐲𝐞 - **Imposta addio**
➤ ${_0xeb2cc9}𝐧𝐨𝐦𝐞 <𝐭𝐞𝐬𝐭𝐨> - **Modifica nome bot**
➤ ${_0xeb2cc9}𝐛𝐢𝐨 <𝐭𝐞𝐬𝐭𝐨> - **Modifica bio bot**
➤ ${_0xeb2cc9}𝐥𝐢𝐧𝐤𝐪𝐫 - **Modifica link QR**
➤ ${_0xeb2cc9}closetime *Tempo chiusura gruppo*

🔒 **Privacy & Sicurezza**:

➤ ${_0xeb2cc9}segreto - **Modalità segreta**
➤ ${_0xeb2cc9}silenzio - **Modalità silenziosa**

─────────────
     *cescobot*
════════════════════
`.trim();
  
  let _0xf5c7c0 = global.db.data.nomedelbot || "cescobot";
  
  _0x4b9a49.sendMessage(_0x4955de.chat, {
    'text': _0x259d4e,
    'contextInfo': {
      'mentionedJid': _0x4b9a49.parseMention(wm),
      'forwardingScore': 0x1,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': "120363341274693350@newsletter",
        'serverMessageId': '',
        'newsletterName': _0xf5c7c0
      }
    }
  }, {
    'quoted': _0x414c2d
  });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(menuadm|admin)$/i;
export default handler;

function clockString(_0x5dad08) {
  let _0x233c78 = Math.floor(_0x5dad08 / 3600000);
  let _0x2b10bc = Math.floor(_0x5dad08 / 60000) % 60;
  let _0x2c7d73 = Math.floor(_0x5dad08 / 1000) % 60;
  console.log({
    'ms': _0x5dad08,
    'h': _0x233c78,
    'm': _0x2b10bc,
    's': _0x2c7d73
  });
  return [_0x233c78, _0x2b10bc, _0x2c7d73].map(_0x4bd0ef => _0x4bd0ef.toString().padStart(2, 0)).join(':');
}
