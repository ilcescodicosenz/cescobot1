import { readdirSync, unlinkSync, existsSync, promises as fsPromises } from 'fs';
import path from 'path';

const handler = async (message, { conn, usedPrefix }) => {
    const sessionFolder = './Sessioni/';
    
    // Verifica se l'utente che esegue il comando è il proprietario del bot
    if (global.owner?.user?.jid !== conn.user.jid) {
        return conn.sendMessage(message.chat, { text: '*Utilizza questo comando direttamente nel numero principale del Bot.*' }, { quoted: message });
    }
    
    await conn.sendMessage(message.chat, { text: 'ⓘ Ripristino delle sessioni in corso...' }, { quoted: message });
    
    try {
        // Controlla se la cartella delle sessioni esiste
        if (!existsSync(sessionFolder)) {
            return await conn.sendMessage(message.chat, { text: '*La cartella Sessioni non esiste o è vuota.*' }, { quoted: message });
        }
        
        const sessionFiles = await fsPromises.readdir(sessionFolder);
        let deletedCount = 0;
        
        for (const file of sessionFiles) {
            if (file !== 'creds.json') { // Non elimina il file delle credenziali
                await fsPromises.unlink(path.join(sessionFolder, file));
                deletedCount++;
            }
        }
        
        if (deletedCount === 0) {
            await conn.sendMessage(message.chat, { text: 'ⓘ Le sessioni sono vuote ‼️' }, { quoted: message });
        } else {
            await conn.sendMessage(message.chat, { text: `ⓘ Sono stati eliminati ${deletedCount} archivi nelle sessioni` }, { quoted: message });
        }
    } catch (error) {
        console.error('Errore:', error);
        await conn.sendMessage(message.chat, { text: 'Errore' }, { quoted: message });
    }
    
    // Messaggio di conferma con dettagli del bot
    const botName = global.db?.data?.nomedelbot || 'ChatUnity-Bot';
    const confirmationMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: botName,
                jpegThumbnail: await (await fetch('https://i.ibb.co/JRc3WH15/chatunity-jpg.jpg')).buffer(),
                vcard: `BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=393755853799:+39 375 585 3799\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };
    
    await conn.sendMessage(message.chat, { text: 'ⓘ Ora sarai in grado di leggere i messaggi del bot' }, { quoted: confirmationMessage });
};

handler.help = ['del_reg_in_session_owner'];
handler.tags = ['owner'];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.admin = true;

export default handler;
