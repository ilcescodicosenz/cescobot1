
let handler = async (m, { conn, command, text }) => {
if (!text) throw `Tagga chi desideri scopare🤤`
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
conn.reply(m.chat, `
*𝐒𝐓𝐀𝐈 𝐒𝐂𝐎𝐏𝐀𝐍𝐃𝐎 ${text} !*

𝙨𝙚𝙞 𝙨𝙩𝙖𝙩𝙖 𝐬𝐜𝐨𝐩𝐚𝐭𝐚 𝐟𝐨𝐫𝐭𝐞 𝙖 𝟵𝟬 𝙚 𝙩𝙞 𝙝𝙖 𝙩𝙧𝙖𝙩𝙩𝙖𝙩𝙤 𝙘𝙤𝙢𝙚 𝙪𝙣𝙖 𝙥𝙪𝙩𝙩𝙖𝙣𝙖 𝙙𝙞 𝙢𝙚𝙧𝙙𝙖 " 𝐀𝐡𝐡𝐡.., 𝐀𝐚𝐚𝐚𝐡𝐡, 𝐬𝐢 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐚, 𝐧𝐨𝐧 𝐟𝐞𝐫𝐦𝐚𝐫𝐭𝐢, 𝐧𝐨𝐧 𝐟𝐞𝐫𝐦𝐚𝐫𝐭𝐢 " 𝙚 𝙩𝙞 𝙝𝙖 𝙡𝙖𝙨𝙘𝙞𝙖𝙩𝙤 𝙘𝙤𝙨𝙞̀ 𝙜𝙤𝙣𝙛𝙞𝙖 𝙘𝙝𝙚 𝙣𝙤𝙣 𝙧𝙞𝙚𝙨𝙘𝙞 𝙣𝙚𝙢𝙢𝙚𝙣𝙤 𝙖 𝙧𝙚𝙜𝙜𝙚𝙧𝙩𝙞 𝙞𝙣 𝙥𝙞𝙚𝙙𝙞 𝗲 𝗽𝗶𝗲𝗻𝗮 𝗱𝗶 𝘀𝗯𝗼𝗿𝗿𝗮 𝙨𝙩𝙪𝙥𝙞𝙙𝙖 𝙩𝙧𝙤𝙞𝙖 𝙙𝙞 𝙢𝙚𝙧𝙙𝗮.

*${text}* 
🤤🥵 *¡𝐓𝐈 𝐇𝐀𝐍𝐍𝐎 𝐒𝐂𝐎𝐏𝐀𝐓𝐀 𝐏𝐄𝐑 𝐁𝐄𝐍𝐄!* 🥵🤤`, null, { mentions: [user] })
}


handler.admin = true
handler.command = ['scopa']
export default handler