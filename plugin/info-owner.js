function handler(m) {
    let contactInfo = {
        'key': {
            'participants': '0@s.whatsapp.net',
            'fromMe': false,
            'id': 'Halo'
        },
        'message': {
            'extendedTextMessage': {
                'text': 'Proprietario del bot',
                'vcard': 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=393755853799:+39 375 585 3799\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        'participant': '0@s.whatsapp.net'
    };
    
    const ownerList = global.owner.filter(([number, isOwner]) => number && isOwner);
    // Aggiungiamo il numero 393755853799 direttamente alla lista degli owner
    ownerList.push([ '393755853799@c.us', true ]);
    this.sendContact(m.chat, ownerList.map(([number, isOwner]) => [number]), contactInfo);
}

handler.help = ['proprietario'];
handler.tags = ['info'];
handler.command = ['proprietario', 'creatore', 'admin', 'fgowner'];

export default handler;
