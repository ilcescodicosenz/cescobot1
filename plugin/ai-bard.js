import fetch from 'node-fetch'

let handler = async (m, { text, conn, usedPrefix, command }) => {
    // Controlla se il testo della richiesta è stato fornito
    if (!text) {
        return conn.reply(m.chat, `🔎 *Fai una richiesta al bot*\n\nEsempio, ${usedPrefix + command} Conosci geolier?`, m);
    }

    try {
        // Aggiungi una reazione di attesa
        await m.react('🕒');  // Emoji per l'attesa

        // Chiamata all'API di Bard
        let response = await fetch(`https://aemt.me/bard?text=${encodeURIComponent(text)}`);
        
        // Controlla se la risposta è ok (status code 200)
        if (response.ok) {
            let data = await response.json();
            if (data.result) {
                await conn.reply(m.chat, data.result, m);
            } else {
                // Gestione caso in cui la risposta non contiene risultati
                await conn.reply(m.chat, `✘ Bard non ha risposto alla tua richiesta.`, m);
            }
        } else {
            // Gestione degli errori HTTP
            await conn.reply(m.chat, `✘ Errore nel recuperare la risposta da Bard. Riprova più tardi.`, m);
        }

        // Reazione di successo
        await m.react('✅');
    } catch (error) {
        // Reazione di errore
        await m.react('✖️');
        console.error('Errore:', error);
        await conn.reply(m.chat, '🍀 *Si è verificato un errore*', m);
    }
};

// Definisci il comando
handler.command = ['bard'];
handler.help = ['bard'];
handler.tags = ['ai'];
handler.premium = false;

export default handler;
