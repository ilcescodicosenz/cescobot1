let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let contactInfo = 'Proprietario del bot';
    
    if (!m.mentionedJid[0] && !m.quoted) return;

    let mention;
    if (m.mentionedJid[0]) {
        mention = m.mentionedJid[0];
    } else {
        mention = m.quoted.sender;
    }

    let bannedUsers = global.db.data.users.banned;

    bannedUsers[mention] = true;

    let contactMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: '𝐑𝐢𝐦𝐨𝐳𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨…',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/710185c7e0247662d8ca6.png')).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=393755853799:+39 375 585 3799\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.reply(m.chat, contactInfo, contactMessage);
};

handler.command = /^banuser$/i;
handler.admin = true;

export default handler;
