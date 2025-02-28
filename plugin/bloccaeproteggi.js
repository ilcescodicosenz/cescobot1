let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Solo gli admin possono usare questo comando
    if (!m.isGroup) return m.reply('Questo comando può essere utilizzato solo nei gruppi!');
    if (!m.isAdmin) return m.reply('Solo gli admin possono usare questo comando.');

    // Verifica il tipo di azione: bloccare o sbloccare
    if (!text || (text !== 'blocca' && text !== 'sblocca')) {
        return m.reply('Devi specificare "blocca" o "sblocca" per usare questo comando!');
    }

    if (text === 'blocca') {
        // Blocca i messaggi nel gruppo
        await conn.groupSettingUpdate(m.chat, 'announcement');
        await m.reply('🚫 I messaggi sono stati bloccati nel gruppo! Solo gli admin possono scrivere ora.');
    } else {
        // Sblocca i messaggi nel gruppo
        await conn.groupSettingUpdate(m.chat, 'chat');
        await m.reply('✅ I messaggi sono stati sbloccati! Tutti possono scrivere di nuovo.');
    }
};

handler.command = ['proteggi'];
handler.help = ['proteggi'];
handler.tags = ['admin'];
handler.admin = true;

export default handler;
