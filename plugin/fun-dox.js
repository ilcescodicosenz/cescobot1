import { performance } from 'perf_hooks';

let handler = async (m, { conn, text }) => {
    let start = `⏳ *Inizio processo di DOX...*`;
    await m.reply(start);

    // Simulazione dell'attacco con messaggi progressivi
    await m.reply(`🔍 *Progresso:* ${pickRandom(['10', '20', '30', '40', '50'])}%`);
    await m.reply(`🔍 *Progresso:* ${pickRandom(['60', '70', '80'])}%`);
    await m.reply(`🔍 *Progresso:* ${pickRandom(['90', '100'])}%`);

    // Simulazione di velocità
    let old = performance.now();
    let neww = performance.now();
    let speed = `${(neww - old).toFixed(2)} ms`;

    // Aggiungi una simulazione di attacco hacker
    await m.reply("🚨 *ATTENZIONE! STIAMO SUBENDO UN ATTACCO HACKER!*\n🔓 Tentativo di penetrazione in corso...");
    await delay(2000); // Simula un po' di ritardo
    await m.reply("💻 *Connessione criptata...*\n🔐 *Stiamo aggirando le difese...*");
    await delay(3000);
    await m.reply("⚠️ *ATTENZIONE! HACKER IN AVVICINAMENTO!*");

    // Risultati finali
    let doxeo = `
*✔️DOX COMPLETATO CON SUCCESSO*
━━━━━━━━━━━━━━━━━━━━━
👤 *Persona doxata:* ${text}
🌐 *Indirizzo IP:* ${pickRandom([
        '92.28.211.234',
        '140.216.58.100',
        '80.139.134.15',
        '88.53.127.8',
        '231.87.85.223',
    ])}
🔐 *IPV6:* ${pickRandom([
        '4e4d:1176:3285:02bb:40c7:bd44:4094:4f37',
        '806a:9b5d:c5b3:e852:b490:0492:bef9:085b',
    ])}
📶 *ISP:* ${pickRandom([
        'Telecom Italia',
        'Vodafone',
        'WINDTRE',
        'Fastweb',
        'Tiscali',
        'WindTre',
        'Iliad',
        'Ho'
    ])}
📡 *DNS:* ${pickRandom(['8.8.8.8', '8.8.4.4', '1.1.1.1'])}
🖥️ *MAC Address:* ${pickRandom([
        '4A:93:23:18:BA:7F',
        'F0:1A:30:3B:EA:D1',
        'AD:7E:2A:FB:81:B3',
    ])}
📟 *Router Vendor:* ${pickRandom([
        'ERICCSON',
        'Alcatel',
        'Asus',
        'Cisco',
        'Huawei',
        'Samsung',
        'IPhone',
        'Motorola',
        'Oppo',
        'Redmi',
    ])}
━━━━━━━━━━━━━━━━━━━━━

🕒 *Tempo di esecuzione:* ${speed}
`.trim();

    m.reply(doxeo, null, { mentions: conn.parseMention(doxeo) });

    // Aggiungere un messaggio finale di allerta
    await m.reply("⚡ *ATTENZIONE: LA PERSONA È STATA DOXATA CORRETTAMENTE!*");
    await m.reply("🔒 *La sicurezza della vittima è ora compromessa.*");
};

// Funzione di attesa per simulare ritardi
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

handler.help = ['doxear <nome> | <@tag>'];
handler.tags = ['fun'];
handler.command = /^dox$/i;
export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
