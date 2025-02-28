let handler = async (m, { conn, participants, groupMetadata }) => {
    let { antiToxic, antilinkhard, antiTraba, antiArab, antiviewonce, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antilinkbase, antitiktok, sologruppo, soloprivato, anticall, modohorny, antiinsta, antitelegram, antiSpam, autosticker, modoadmin, audios, delete } = global.db.data.chats[m.chat];

    let admins = participants.filter(p => p.admin);
    let adminList = admins.map((p, i) => `${i + 1} - ${p.id.split('@')[0]}`).join('\n');
    let owner = groupMetadata.owner || admins.find(p => p.admin === 'superadmin')?.id || m.chat.split('-')[0] + '@s.whatsapp.net';

    let message = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Info-Status"
        },
        message: {
            extendedTextMessage: {
                text: "Informazioni sullo stato del gruppo",
                vcard: "vcard"
            }
        },
        participant: "0@s.whatsapp.net"
    };

    let infoText = `══════ •⊰✧⊱• ══════
🪢 𝐈𝐧𝐟𝐨 - 𝐒𝐭𝐚𝐭𝐨 :
✧‌⃟ᗒ • 𝐁𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨 (👑)
✧ Invio di un messaggio di benvenuto e addio con la foto profilo dell'utente che entra/esce dal gruppo.

✧‌⃟ᗒ • 𝐒𝐨𝐥𝐨𝐆𝐫𝐮𝐩𝐩𝐨 (👑)
✧ I comandi del bot verranno eseguiti solo nel gruppo e non in privato.

✧‌⃟ᗒ • 𝐒𝐨𝐥𝐨𝐏𝐫𝐢𝐯𝐚𝐭𝐨 (👑)
✧ I comandi del bot verranno eseguiti solo in privato e non nel gruppo.

✧‌⃟ᗒ • 𝐌𝐨𝐝𝐨𝐚𝐝𝐦𝐢𝐧 (👑)
✧ I comandi del bot saranno eseguibili solo dagli amministratori del gruppo.

✧‌⃟ᗒ • 𝐆𝐫𝐮𝐩𝐩𝐨 𝐁𝐚𝐧 (👤)
✧ Il bot non eseguirà più i comandi nel gruppo.

✧‌⃟ᗒ • 𝐀𝐧𝐭𝐢 - 𝐏𝐚𝐤𝐢 (👑)
✧ Il bot rimuoverà numeri stranieri (Pakistan in questo caso).

✧‌⃟ᗒ • 𝐀𝐧𝐭𝐢 - 𝐂𝐚𝐥𝐥 (👤)
✧ Il bot bloccherà chi effettua chiamate al bot.

✧‌⃟ᗒ • 𝐀𝐧𝐭𝐢 - 𝐄𝐥𝐢𝐦𝐢𝐧𝐚 (👑)
✧ Il bot invierà in privato i messaggi eliminati dagli utenti.

✧‌⃟ᗒ • 𝐀𝐧𝐭𝐢 - 𝐋𝐢𝐧𝐤 (👑)
✧ Il bot eliminerà link di altri gruppi e rimuoverà chi li invia (se non admin).`;

    conn.sendMessage(m.chat, infoText, message, m, false, { reply: [...participants.map(p => p.id), owner] });
};

handler.help = ['infostato'];
handler.tags = ['group'];
handler.command = /^(infostato|info-stato)$/i;
handler.group = true;

export default handler;
