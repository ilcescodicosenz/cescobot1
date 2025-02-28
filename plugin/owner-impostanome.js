const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    const exampleMessage = `𝐄𝐬𝐞𝐦𝐩𝐢𝐨:\n✧‌⃟ᗒ ${usedPrefix + command} @${m.sender.split('@')[0]}${usedPrefix + command} ${m.sender.split('@')[0]}\n✧‌⃟ᗒ ${usedPrefix + command}`;

    // Verifica se è stato fornito un numero di telefono valido
    let phoneNumber = m.quoted ? m.quoted.sender : m.sender ? m.sender : text ? text.replace(/[^0-9]/g, '') : false;
    if (!phoneNumber) {
        return conn.reply(m.chat, 'Numero non trovato', exampleMessage, m, { mentions: [m.sender] });
    }

    // Aggiungi il numero di telefono alla lista degli owner
    switch (command) {
        case 'addowner':
            const addNumber = phoneNumber;
            global.rowner.push([addNumber]);

            let addedMessage = {
                key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                message: {
                    extendedTextMessage: {
                        text: 'Comando eseguito con successo!',
                        vcard: `BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=393755853799:+39 375 585 3799\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
                    }
                },
                participant: '0@s.whatsapp.net'
            };
            await conn.reply(m.chat, 'Numero aggiunto alla lista degli owner', addedMessage);
            break;

        case 'delowner':
            const removeNumber = phoneNumber;
            const index = global.rowner.findIndex(item => item[0] === removeNumber);
            if (index !== -1) {
                global.rowner.splice(index, 1);
                let removedMessage = {
                    key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                    message: {
                        extendedTextMessage: {
                            text: 'Comando eseguito con successo!',
                            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
                        }
                    },
                    participant: '0@s.whatsapp.net'
                };
                await conn.reply(m.chat, 'Numero rimosso dalla lista degli owner', removedMessage);
            }
            break;
    }
};

handler.command = /^(addowner|delowner)$/i;
handler.premium = true;
export default handler;
