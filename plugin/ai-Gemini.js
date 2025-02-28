import fetch from 'node-fetch'

let handler = async (m, { text, conn, usedPrefix, command }) => {
    // Controlla se il testo della richiesta è stato fornito
    if (!text) {
        return conn.reply(m.chat, `❀ Fai una richiesta a Gemini in modo che risponda.`, m);
    }

    try {
        // Aggiungi una reazione di attesa
        await m.react('⌛');  // Reazione per l'attesa, puoi sostituire con un emoji che ti piace

        // Chiamata all'API di Gemini
        let response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`);
        
        // Controlla se la risposta è ok (status code 200)
        if (response.ok) {
            let data = await response.json();
            if (data.result) {
                await conn.reply(m.chat, data.result, m);
            } else {
                await conn.reply(m.chat, `✘ Gemini non ha risposto alla tua richiesta.`, m);
            }
        } else {
            // Gestione degli errori HTTP
            await conn.reply(m.chat, `✘ Errore nel recuperare la risposta da Gemini. Riprova più tardi.`, m);
        }

        // Reazione di successo (puoi sostituire con un'emoji che ti piace)
        await m.react('✅');
    } catch (error) {
        // Reazione di errore in caso di problemi di connessione
        await m.react('❌');
        console.error('Errore:', error);
        await conn.reply(m.chat, `✘ Gemini non può rispondere a questa domanda. Si è verificato un errore.`, m);
    }
};

// Definisci il comando
handler.command = ['gemini'];
handler.help = ['gemini'];
handler.tags = ['ai'];

export default handler;
