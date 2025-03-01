import { performance } from "perf_hooks";

let lastUsed = {};
const cooldown = 10000; // 10 secondi di cooldown

let handler = async (m, { conn, text }) => {
    let user = text || "qualcuno";
    let chatId = m.chat;
    let now = Date.now();

    // Controllo anti-spam
    if (lastUsed[chatId] && now - lastUsed[chatId] < cooldown) {
        return m.reply("⏳ Aspetta un attimo prima di usarlo di nuovo!");
    }
    lastUsed[chatId] = now;

    let messages = [
        `🤟🏻 Ora faccio un ditalino a *${user}*...`,
        "👆🏻 Inizio ad infilare le dita!", 
        "✌🏻 Ora ne metto 3...", 
        "☝🏻 Quasi fatto...", 
        "✌🏻 È il momento giusto!", 
        "👋🏻 Fatto?", 
        "👋🏻 Un attimo ancora...", 
        "✌🏻 Wow, sembra promettere bene!", 
        "🤟🏻 Ora ci siamo...", 
        "☝🏻 Non ci credo!", 
        "🤟🏻 Epico!", 
        "👋🏻 Ohsshyy, ancora più veloce, ahhhh!"
    ];
    
    for (let msg of messages) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Ritardo tra i messaggi
        await m.reply(msg);
    }

    let startTime = performance.now();
    let endTime = performance.now();
    let elapsed = (endTime - startTime).toFixed(2);
    let finalMessage = `✨ *${user}* è venuta! 🥵 Dopo *${elapsed}ms*!`;

    conn.reply(m.chat, finalMessage, m);
};

handler.help = ["ditalino"];
handler.tags = ["fun"];
handler.command = ["ditalino"];
handler.group = true; // Permesso nei gruppi

export default handler;
