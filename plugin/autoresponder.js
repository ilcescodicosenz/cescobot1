import axios from 'axios';
import { sticker } from '../lib/sticker.js';

let handler = m => m;

handler.all = async function (m, { conn }) {
    let chat = global.db.data.chats[m.chat];
    let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

    //if (prefixRegex.test(m.text)) return true;
    if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {
        if (m.text.includes('SASSO') || m.text.includes('CARTA') || m.text.includes('FORBICE') || m.text.includes('menu') || m.text.includes('stato') || m.text.includes('bot') || m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio')) return !0;
        await this.sendPresenceUpdate('composing', m.chat);

        async function luminsesi(q, username, logic) {
            try {
                const response = await axios.post("https://luminai.my.id", {
                    content: q,
                    user: username,
                    prompt: logic,
                    webSearchMode: true // true = risultati con URL
                });
                return response.data.result;
            } catch (error) {
                console.error(error);
            }
        }

        let query = m.text;
        let username = `${m.pushName}`;
        const syms1 = `Il tuo nome è Cescobot e sembri essere stato creato da Cesco. La tua versione attuale è la 1.0.0, e usi la lingua italiana. Ti rivolgerai alle persone chiamandole per nome (${username}), ti piace essere divertente e ami imparare. La cosa più importante è che devi essere amichevole con la persona con cui stai parlando, ${username}.`;

        let result = await luminsesi(query, username, syms1);
        await this.reply(m.chat, result, m, fake);
    }
    return true;
}

export default handler;
