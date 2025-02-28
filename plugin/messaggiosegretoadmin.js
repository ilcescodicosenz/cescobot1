let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Solo gli admin possono usare questo comando
    if (!m.isGroup) return m.reply('Questo comando può essere utilizzato solo nei gruppi!');
    if (!m.isAdmin) return m.reply('Solo gli admin possono usare questo comando.');

    // Verifica se è stato fornito un testo per il messaggio segreto
    if (!text) return m.reply('Fornisci un messaggio segreto da inviare agli admin!');

    // Ottieni la lista degli admin
    let admins = m.chat ? await conn.groupMetadata(m.chat).then(res => res.participants.filter(v => v.isAdmin).map(v => v.jid)) : [];

    // Invia il messaggio segreto agli admin
    admins.forEach(admin => {
        conn.reply(admin, `🔒 *Messaggio Segreto dal gruppo*\n\n${text}`, m);
    });

    await m.reply('Il messaggio segreto è stato inviato a tutti gli admin! 🤫');
};

handler.command = ['segreto'];
handler.help = ['segreto'];
handler.tags = ['admin'];
handler.admin = true;

export default handler;
