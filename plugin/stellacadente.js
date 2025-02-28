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
    if (!who) return m.reply(`Menziona chi vuoi far brillare con te! 🌟`);

    let desiderio = await conn.reply(m.chat, `@${m.sender.split('@')[0]} ha visto una stella cadente insieme a @${who.split('@')[0]} ✨🎇 e ha espresso un desiderio segreto!`, m, { mentions: [who, m.sender] });

    conn.sendMessage(m.chat, { react: { text: '🌠', key: desiderio.key } });
};

handler.command = ['stellacadente'];
export default handler;
