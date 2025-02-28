import moment from 'moment-timezone';
import fetch from 'node-fetch';

let handler = async (msg, { conn }) => {
    try {
        let response = await fetch('https://github.com/ilcescodicosenz/cescobot');
        let repo = await response.json();
        
        let message = `══════ •⊰✧⊱• ══════\n`;
        message += `✧ Nome: ${repo.name}\n`;
        message += `✧ Link: ${repo.html_url}\n`;
        message += `✦ Dimensione: ${(repo.size / 1024).toFixed(2)} MB\n`;
        message += `✧ Aggiornato: ${moment(repo.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
        message += `✧ Visitatori: ${repo.watchers_count}\n`;
        message += `═══════\n`;
        message += `✧ Forks · ${repo.forks_count} | Stars · ${repo.stargazers_count} | Issues · ${repo.open_issues_count}\n`;
        message += `═══════`;

        await conn.reply(msg.chat, message, msg);
    } catch (error) {
        console.error("Errore nel recupero dati GitHub", error);
        await conn.reply(msg.chat, "Errore nel recupero delle informazioni del repository.", msg);
    }
};

handler.help = ['githubinfo'];
handler.tags = ['info'];
handler.command = /^githubrepo$/i;

export default handler;
