import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x316f52, { conn: _0x4a2566, usedPrefix: _0x238280 }) => {
  // Creazione di un messaggio fittizio con una posizione e una vCard
  let _0x12abbd = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝐌𝐞𝐧𝐮 𝐆𝐫𝐮𝐩𝐩𝐨",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        'vcard': `
          BEGIN:VCARD
          VERSION:1.0
          N:;Unlimited;;;
          FN:Unlimited
          ORG:Unlimited
          TITLE:
          item1.TEL;waid=393755853799:+39 375 575 3799
          item1.X-ABLabel:Unlimited
          X-WA-BIZ-DESCRIPTION:ofc
          X-WA-BIZ-NAME:Unlimited
          END:VCARD
        `.trim()
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  // Menu del gruppo
  let _0x52ca99 = `
──────𝐌𝐞𝐧𝐮 𝐆𝐫𝐮𝐩𝐩𝐨─────
- ${_0x238280}𝐚𝐛𝐛𝐫𝐚𝐜𝐜𝐢𝐚 @
- ${_0x238280}𝐥𝐞𝐜𝐜𝐨/𝐚 @ 
- ${_0x238280}𝐦𝐨𝐫𝐝𝐢 @ 
- ${_0x238280}𝐚𝐥𝐜𝐨𝐥𝐢𝐳𝐳𝐚𝐭𝐨 @  
- ${_0x238280}𝐫𝐢𝐬𝐜𝐫𝐢𝐯𝐢 (𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨) 
- ${_0x238280}𝐦𝐞𝐭𝐞𝐨 ( 𝐜𝐢𝐭𝐭𝐚' )
- ${_0x238280}𝐡𝐝( 𝐟𝐨𝐭𝐨 )
- ${_0x238280}𝐥𝐞𝐠𝐠𝐢( 𝐟𝐨𝐭𝐨 )
- ${_0x238280}𝐫𝐢𝐦𝐮𝐨𝐯𝐢𝐬𝐟𝐨𝐧𝐝𝐨 ( 𝐟𝐨𝐭𝐨 )
- ${_0x238280}𝐬𝐞𝐠𝐚( 𝐧𝐨𝐦𝐞 )
- ${_0x238280}𝐝𝐢𝐭𝐚𝐥𝐢𝐧𝐨 ( 𝐧𝐨𝐦𝐞 )
- ${_0x238280}𝐢𝐧𝐬𝐮𝐥𝐭𝐚  ( 𝐧𝐨𝐦𝐞 )
- ${_0x238280}𝐪𝐫𝐜𝐨𝐝𝐞( 𝐭𝐞𝐬𝐭𝐨 )
- ${_0x238280}𝐫𝐢𝐯𝐞𝐥𝐚 ( foto¹ )
- ${_0x238280}𝐬𝐭𝐲𝐥𝐞𝐭𝐞𝐱𝐭
- ${_0x238280}𝐜𝐚𝐥𝐜( 𝟏+𝟏 )
- ${_0x238280}𝐦𝐬𝐠' @
- ${_0x238280}𝐛𝐞𝐥𝐥𝐨/𝐚 @
- ${_0x238280}𝐠𝐚𝐲 @
- ${_0x238280}𝐩𝐮𝐭𝐭𝐚𝐧𝐚@
- ${_0x238280}𝐥𝐞𝐬𝐛𝐢𝐜𝐚@
- ${_0x238280}𝐢𝐧𝐬𝐮𝐥𝐭𝐚  @
- ${_0x238280}𝐬𝐭𝐮𝐩𝐫𝐚 @
- ${_0x238280}𝐟𝐫𝐨𝐜𝐢𝐨@
- ${_0x238280}𝐨𝐝𝐢𝐨@
- ${_0x238280}𝐚𝐦𝐨𝐫𝐞@
- ${_0x238280}𝐝𝐨𝐱 @
- ${_0x238280}𝐢𝐝(gruppo)
- ${_0x238280}𝐡𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐩𝐚𝐭𝐨 @
- ${_0x238280}𝐬𝐞𝐭𝐢𝐠
- ${_0x238280}𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐢𝐠
- ${_0x238280}𝐭𝐫𝐢𝐬
- ${_0x238280}𝐜𝐫𝐮𝐬𝐡 @
- ${_0x238280}𝐭𝐨𝐩𝐠𝐚𝐲𝐬
- ${_0x238280}𝐭𝐨𝐩𝐧𝐚𝐳𝐢
- ${_0x238280}𝐭𝐭𝐩
- ${_0x238280}𝐝𝐚𝐝𝐨
- ${_0x238280}𝐬𝐭𝐢𝐜𝐤𝐞𝐫/ 𝐬
- ${_0x238280}𝐭𝐨𝐯𝐢𝐝𝐞𝐨
- ${_0x238280}𝐭𝐨𝐠𝐢𝐟
- ${_0x238280}𝐚𝐮𝐭𝐨𝐚𝐝𝐦𝐢𝐧
- ${_0x238280}𝐤𝐞𝐛𝐚𝐛 @
- ${_0x238280}𝐬𝐚𝐲𝐚𝐧 @ 
- ${_0x238280}𝐦𝐨𝐫𝐝𝐢 @ 
- ${_0x238280}𝐦𝐢𝐫𝐚 @ 
- ${_0x238280}𝐜𝐫𝐞𝐚𝐜𝐨𝐩𝐩𝐢𝐚 
- ${_0x238280}𝐚𝐦𝐢𝐜𝐢𝐳𝐢𝐚 @ 
- ${_0x238280}𝐥𝐢𝐬𝐭𝐚𝐦𝐢𝐜𝐢
- ${_0x238280}𝐫𝐞𝐠𝐨𝐥𝐞
- ${_0x238280}𝐧𝐞𝐫𝐚 @
- ${_0x238280}𝐜𝐥𝐨𝐰𝐧 @
- ${_0x238280}𝐫𝐚𝐧𝐝𝐨𝐦 @ 
- ${_0x238280}𝐜𝐫𝐢𝐦𝐢𝐧𝐚𝐥𝐞 @
- ${_0x238280}𝐝𝐫𝐨𝐠𝐚𝐭𝐨 @
- ${_0x238280}𝐜𝐨𝐦𝐮𝐧𝐢𝐬𝐭𝐚 @
- ${_0x238280}𝐩𝐫𝐨𝐬𝐭𝐢𝐭𝐮𝐭𝐚 @
- ${_0x238280}𝐩𝐮𝐭𝐭𝐚𝐧𝐢𝐞𝐫𝐞 @
- ${_0x238280}𝐩𝐨𝐫𝐭𝐚𝐟𝐨𝐠𝐥𝐢𝐨
- ${_0x238280}𝐩𝐚𝐠𝐡𝐞𝐭𝐭𝐚
- ${_0x238280}𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚
- ${_0x238280}𝐥𝐚𝐝𝐫𝐨
- ${_0x238280}𝐟𝐚𝐦𝐢𝐠𝐥𝐢𝐚
- ${_0x238280}𝐬𝐨𝐫𝐭𝐞
- ${_0x238280}𝐛𝐨𝐭𝐭𝐢𝐠𝐥𝐢𝐚
- ${_0x238280}𝐯𝐞𝐫𝐢𝐭𝐚 
- ${_0x238280}𝐨𝐛𝐛𝐥𝐢𝐠𝐨
- ${_0x238280}𝐚𝐝𝐨𝐭𝐭𝐚 @
- ${_0x238280}ai
- ${_0x238280}stellacadente
- ${_0x238280}raggiodisole
- ${_0x238280}toccomagico
──────────────
cescobot`.trim();

  let _0x18f634 = global.db.data.nomedelbot || " cescobot ";

  // Invia il messaggio del menu
  _0x4a2566.sendMessage(_0x316f52.chat, {
    'text': _0x52ca99,
    'contextInfo': {
      'mentionedJid': _0x4a2566.parseMention(wm),
      'forwardingScore': 1,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': "120363341274693350@newsletter",
        'serverMessageId': '',
        'newsletterName': '' + _0x18f634
      }
    }
  }, { 'quoted': _0x12abbd });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menugruppo|gruppo)$/i;
export default handler;

// Funzione per formattare il tempo in formato hh:mm:ss
function clockString(_0x5376bb) {
  let _0x14ce08 = Math.floor(_0x5376bb / 3600000);  // Calcola le ore
  let _0x11e6bc = Math.floor(_0x5376bb / 60000) % 60;  // Calcola i minuti
  let _0xaff805 = Math.floor(_0x5376bb / 1000) % 60;  // Calcola i secondi

  // Stampa il tempo per il debug
  console.log({
    'ms': _0x5376bb,
    'h': _0x14ce08,
    'm': _0x11e6bc,
    's': _0xaff805
  });

  // Restituisce il tempo formattato in hh:mm:ss
  return [_0x14ce08, _0x11e6bc, _0xaff805]
    .map(_0x421c43 => _0x421c43.toString().padStart(2, '0'))  // Assicura che siano due cifre
    .join(':');
}
