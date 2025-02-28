import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  let contactInfo = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': 'Bot Info',
        'jpegThumbnail': await (await fetch('https://qu.ax/cSqEs.jpg')).buffer(),
        'vcard': `BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=393755853799:+39 375 585 3799\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
      }
    },
    'participant': '0@s.whatsapp.net'
  };

  // Messaggio informativo del bot
  let infoMessage = `
════════════════════
 *𝐈𝐧𝐟𝐨𝐁𝐨𝐭* 

➤ 𝐂𝐫𝐞𝐚𝐭𝐨𝐫𝐞: +39 375 585 3799

➤ 𝐍𝐨𝐦𝐞 𝐁𝐨𝐭:   cescobot

➤ 𝐋𝐢𝐧𝐤 𝐂𝐚𝐧𝐚𝐥𝐞: https://whatsapp.com/channel/0029Vb2xynG9MF8tPyNWoE35

➤ 𝐒𝐭𝐚𝐭𝐨 𝐁𝐨𝐭: ~Online~ *No Disturbare*

➤ 𝐂𝐫𝐞𝐚𝐭𝐨 𝐢𝐥:  *15/02/2025*

➤𝐆𝐢𝐭𝐡𝐮𝐛: *https://github.com/ilcescodicosenz/cescobot*

cescobot 
════════════════════
`.trim();

  let botName = global.db.data.nomedelbot || " cescobot ";

  // Invia il messaggio con una grafica migliorata
  conn.sendMessage(m.chat, {
    'text': infoMessage,
    'contextInfo': {
      'mentionedJid': conn.parseMention(botName),
      'forwardingScore': 1,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': '120363341274693350@newsletter',
        'serverMessageId': '',
        'newsletterName': ' cescobot '
      }
    }
  }, {
    'quoted': contactInfo
  });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(botinfo)$/i;
export default handler;

// Funzione per calcolare il tempo di attività
function clockString(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor(ms / 60000) % 60;
  let seconds = Math.floor(ms / 1000) % 60;
  
  console.log({
    'ms': ms,
    'h': hours,
    'm': minutes,
    's': seconds
  });

  return [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
}
