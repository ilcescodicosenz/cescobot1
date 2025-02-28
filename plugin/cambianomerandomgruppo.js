let handler = async (m, { conn, usedPrefix, command }) => {
    // Solo gli admin possono utilizzare il comando
    if (!m.isGroup) return m.reply('Questo comando può essere utilizzato solo nei gruppi!');
    if (!m.isAdmin) return m.reply('Solo gli admin possono usare questo comando.');

    // Messaggio per fermare la chat
    await conn.reply(m.chat, `🔇 *Silenzio Tutto Attivato!* Nessuno può scrivere per i prossimi 30 secondi.`, m);

    // Disabilita temporaneamente la possibilità di scrivere
    await conn.groupSettingUpdate(m.chat, 'announcement');  // Cambia le impostazioni del gruppo per disabilitare la chat

    // Re-enable la chat dopo 30 secondi
    setTimeout(async () => {
        await conn.groupSettingUpdate(m.chat, 'chat');
        await conn.reply(m.chat, '🔊 *Silenzio terminato!* Ora tutti possono scrivere di nuovo.', m);
    }, 30000);  // 30 secondi
};

handler.command = ['silenzio'];
handler.help = ['silenzio'];
handler.tags = ['admin'];
handler.admin = true;

export default handler;
