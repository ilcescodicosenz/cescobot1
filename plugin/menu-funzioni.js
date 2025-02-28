import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (message, { conn, usedPrefix }) => {
  // Ottieni i dati specifici per la chat
  const {
    antiToxic,
    antilinkhard,
    antiPrivate,
    antitraba,
    antiArab,
    antiviewonce,
    isBanned,
    welcome,
    detect,
    sWelcome,
    sBye,
    sPromote,
    sDemote,
    antiLink,
    antilinkbase,
    antitiktok,
    sologruppo,
    soloprivato,
    antiCall,
    modohorny,
    gpt,
    antiinsta,
    antielimina,
    antitelegram,
    antiSpam,
    antiPorno,
    jadibot,
    autosticker,
    modoadmin,
    audios
  } = global.db.data.chats[message.chat];

  // Identifica il destinatario del messaggio
  let recipient = message.quoted ? message.quoted.sender : message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : message.fromMe ? conn.user.jid : message.sender;

  // Ottieni l'immagine del profilo del destinatario
  const profilePicUrl = (await conn.profilePictureUrl(recipient, "image").catch(() => null)) || "./src/avatar_contact.png";
  let profilePicBuffer;
  if (profilePicUrl !== "./src/avatar_contact.png") {
    profilePicBuffer = await (await fetch(profilePicUrl)).buffer();
  } else {
    profilePicBuffer = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();
  }

  // Definizione del messaggio da inviare
  let menuMessage = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': "Halo"
    },
    'message': {
      'locationMessage': {
        'name': "𝐌𝐞𝐧𝐮 𝐝𝐞𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐥𝐢𝐭𝐚'",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer()
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  // Menu delle funzioni con miglior disposizione
  let statusMessage = `
╭━━━━━━━━━━━━━━━━━━━━━━━━
│  📜  **𝗠𝗲𝗻𝘂 𝗳𝘂𝗻𝘇𝗶𝗼𝗻𝗶 𝗮𝗰𝘁𝗶𝘃𝗮𝗯𝗶𝗹𝗲** 📜
╰━━━━━━━━━━━━━━━━━━━━━━━━
   
🔘 **Funzioni Attive/Disattive**:
   
   🟢 **Anti-Link**: ${antiLink ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-Call**: ${antiCall ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-Toxic**: ${antiToxic ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-TikTok**: ${antitiktok ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-Spam**: ${antiSpam ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-Porno**: ${antiPorno ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-Private**: ${antiPrivate ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-Instagram**: ${antiinsta ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Anti-Arab**: ${antiArab ? '✔️ Attivo' : '❌ Disattivo'}

🔘 **Funzioni di Benvenuto & Uscita**:
   
   🟢 **Benvenuto**: ${welcome ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Bye Message**: ${sBye ? '✔️ Attivo' : '❌ Disattivo'}
   
🔘 **Funzioni di Moderazione**:

   🟢 **Modifica Admin**: ${modoadmin ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Promozione & Degradazione**: ${sPromote ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Traba (Anti-Trav)**: ${antitraba ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Detecc (Detection)**: ${detect ? '✔️ Attivo' : '❌ Disattivo'}

🔘 **Altre Funzioni**:

   🟢 **GPT-3**: ${gpt ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **JadiBot**: ${jadibot ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Soltanto Gruppo**: ${sologruppo ? '✔️ Attivo' : '❌ Disattivo'}
   🟢 **Soltanto Privato**: ${soloprivato ? '✔️ Attivo' : '❌ Disattivo'}

╭━━━━━━━━━━━━━━━━━━━━━━━━
│  ⚙️ **Comandi Disponibili**:
╰━━━━━━━━━━━━━━━━━━━━━━━━

   1. **${usedPrefix}attiva <funzione>** - Attiva una funzione.
   2. **${usedPrefix}disattiva <funzione>** - Disattiva una funzione.
   3. **${usedPrefix}infostato** - Mostra lo stato delle funzioni attivate.

╭━━━━━━━━━━━━━━━━━━━━━━━━
│  ℹ️ **Info su Funzioni**:
╰━━━━━━━━━━━━━━━━━━━━━━━━

   🟢 = Funzione attiva
   ❌ = Funzione disattivata

─────────────
   `.trim();

  // Invia il messaggio con la lista delle funzioni
  conn.sendMessage(message.chat, {
    text: statusMessage,
    contextInfo: {
      mentionedJid: conn.parseMention("cescobot")
    }
  }, {
    quoted: menuMessage
  });
};

// Comando per richiedere il menu
handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(funzioni)$/i;

export default handler;

// Funzione per calcolare il tempo in formato stringa
function clockString(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor(ms / 60000) % 60;
  let seconds = Math.floor(ms / 1000) % 60;

  return [hours, minutes, seconds].map(n => n.toString().padStart(2, '0')).join(':');
}
