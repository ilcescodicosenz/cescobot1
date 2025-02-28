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
    if (!who) return m.reply(`Menziona chi vuoi incantare! ✨`);

    let magia = await conn.reply(m.chat, `@${m.sender.split('@')[0]} ha lanciato un tocco magico su @${who.split('@')[0]}! ✨🪄`, m, { mentions: [who, m.sender] });

    conn.sendMessage(m.chat, { react: { text: '✨', key: magia.key } });
};

handler.command = ['toccomagico'];
export default handler;
