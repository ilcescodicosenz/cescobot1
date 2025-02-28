let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;

    if (m.isGroup) {
        who = m.mentionedJid[0] 
            ? m.mentionedJid[0] 
            : m.quoted ? m.quoted.sender 
            : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
            : false;
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    let user = global.db.data.users[who];
    if (!who) return m.reply(`Menziona chi vuoi illuminare con la tua luce! 🌞`);

    let raggio = await conn.reply(m.chat, `@${m.sender.split('@')[0]} ha inviato un raggio di sole a @${who.split('@')[0]}! 🌞✨`, m, { mentions: [who, m.sender] });

    conn.sendMessage(m.chat, { react: { text: '🌞', key: raggio.key } });
};

handler.command = ['raggiodisole'];
export default handler;
