let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;

    // Determina chi mordere
    if (m.isGroup) {
        who = m.mentionedJid[0] 
            ? m.mentionedJid[0] 
            : m.quoted ? m.quoted.sender 
            : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
            : false;
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    // Se non è stata menzionata una persona valida
    if (!who) return m.reply(`Menziona chi vuoi mordere 😅`);

    // Messaggi progressivi per l'effetto "morso"
    let messaggi = [
        `🦷 @${m.sender.split('@')[0]} sta mostrando i denti a @${who.split('@')[0]}...`,
        `😬 @${who.split('@')[0]} sente un brivido...`,
        `😱 *CHOMP!* @${m.sender.split('@')[0]} ha morso @${who.split('@')[0]}!`
    ];

    // Invia i messaggi progressivi
    for (let msg of messaggi) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Ritardo di 1.5s
        await conn.reply(m.chat, msg, m, { mentions: [who, m.sender] });
    }

    // Aggiungi reazione all'ultimo messaggio
    conn.sendMessage(m.chat, { react: { text: '🦷', key: m.key } });
};

handler.command = ['mordi'];
handler.group = true; // Permette l'uso del comando nei gruppi
handler.botAdmin = false;
handler.admin = false;

export default handler;
