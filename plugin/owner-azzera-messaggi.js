const handler = async (m) => {
    const phoneNumber = m.quoted ? m.quoted.sender : m.sender ? m.sender : text;
    const user = global.db.data.users[phoneNumber];
    
    if (!user) {
        return conn.reply(m.chat, 'Inserisci la menzione nel comando!', m);
    }

    let responseMessage = {
        key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
        message: {
            extendedTextMessage: {
                text: '𝐇𝐨 azzerato i messaggi di questo utente!',
                vcard: `BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=393755853799:+39 375 585 3799\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    await conn.reply(m.chat, '𝐇𝐨 azzerato i messaggi di questo utente!', null, { quoted: responseMessage });

    user.messages = 0;
};

handler.command = /^(azzera)$/i;
handler.premium = true;

export default handler;
