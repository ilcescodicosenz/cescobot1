/*import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = m => m
handler.before = async function (m, { conn, usedPrefix }) {

if (!db.data.chats[m.chat].autolevelup) return
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let mentionedJid = [who]
let username = conn.getName(who)
let userName = m.pushName || 'Anonimo'

let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
if (!chat.autolevelup)
return !0

let level = user.level
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) 
user.level++
if (before !== user.level) {
let currentRole = Object.entries(roles).sort((a, b) => b[1] - a[1]) .find(([, minLevel]) => level + 1 >= minLevel)[0]
let nextRole = Object.entries(roles).sort((a, b) => a[1] - b[1]) .find(([, minLevel]) => level + 2 < minLevel)[0]

//if (user.role != currentRole && level >= 1) {
if (level >= 1) {
user.role = currentRole
let text22 = `✨ Congratulazioni *${userName}*, per il tuo nuovo livello!\n\n\`Nuovo Livello:\`\n${currentRole}`
if (nextRole) {
text22 += `\n\n> Prossimo livello ${nextRole}, al *livello ${roles[nextRole]}*. Continua così!`
}

await conn.sendMessage(global.channelid, { text: text22, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 Qualcuno ha raggiunto un nuovo livello!',
thumbnailUrl: perfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null }) 
}

m.reply(`*🎉 CONGRATULAZIONI ! 🎉*\n\n💫 Livello Attuale » *${user.level}*\n🌵 Ruolo » ${user.role}\n📆 Data » *${moment.tz('Europe/Rome').format('DD/MM/YY')}*\n\n> *\`Hai raggiunto un nuovo livello!\`*`)

let especial = 'cookies'
let especial2 = 'exp'
let especial3 = 'money'
let especial4 = 'joincount'

let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6 // Intervallo: 6 a 9
let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervallo: 6 a 10
let especialCant3 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervallo: 6 a 10
let especialCant4 = Math.floor(Math.random() * (3 - 2 + 1)) + 2 // Intervallo: 2 a 3

let normal = ['potion', 'aqua', 'trash', 'wood', 'rock', 'batu', 'string', 'iron', 'coal', 'botol', 'kaleng', 'kardus'].getRandom()
let normal2 = ['petFood', 'makanancentaur', 'makanangriffin', 'makanankyubi', 'makanannaga', 'makananpet', 'makananphonix'  ].getRandom()
let normal3 = ['anggur', 'apel', 'jeruk', 'mangga', 'pisang'].getRandom()

let normalCant = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 
let normalCant2 = [1, 3, 2, 2, 4, 4, 2, 2, 4, 4, 5, 5, 1].getRandom() 
let normalCant3 = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 

if (level >= 1) {
let chtxt = `👤 *Utente:* ${userName}\n🐢 *Livello precedente:* ${before}\n⭐️ *Livello attuale:* ${level + 1}\n👾 *Ruolo:* ${user.role}\n🍄 *Bot* » 𝙔𝙤𝙩𝙨𝙪𝙗𝙖𝘽𝙤𝙩-𝙈𝘿 ✨️🍁${(level + 1) % 5 === 0 ? `\n\n💰 *Ricompensa per il raggiungimento del livello ${level + 1}:*
🎁 *Bonus:* \`X${Math.floor(((level + 1) - 5) / 10) + 1}\`
- *${especialCant * (Math.floor(((level + 1) - 5) / 10) + 1)} 🍪 ${especial}*
- *${especialCant2 * (Math.floor(((level + 1) - 5) / 10) + 1)} ✨️ ${especial2}*
- *${especialCant3 * (Math.floor(((level + 1) - 5) / 10) + 1)} 💸 ${especial3}*
- *${especialCant4 * (Math.floor(((level + 1) - 5) / 10) + 1)} 🪙 ${especial4}*

> 👀 Prossima ricompensa al *livello ${level + 6}*` : ''}`.trim()
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 Un utente ha raggiunto un nuovo livello!',
thumbnailUrl: perfil, 
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}

if (user.level == 5){
conn.reply(m.chat, `*🥳 RICOMPENSA PER IL TUO NUOVO LIVELLO 5!!* 🏆
ᰔᩚ *${especialCant * 1} ${especial}*
ᰔᩚ *${especialCant2 * 1} ${especial2}*
ᰔᩚ *${especialCant3 * 1} ${especial3}*
ᰔᩚ *${especialCant4 * 1} ${especial4}*`, m)
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1

}else if (user.level == 10){
conn.reply(m.chat, `*🥳 RICOMPENSA PER IL TUO NUOVO LIVELLO 10!!* 🏆
ᰔᩚ *${especialCant * 1} ${especial}*
ᰔᩚ *${especialCant2 * 1} ${especial2}*
ᰔᩚ *${especialCant3 * 1} ${especial3}*
ᰔᩚ *${especialCant4 * 1} ${especial4}*`, m)
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1

}else if (user.level == 15){
conn.reply(m.chat, `*🥳 RICOMPENSA PER IL TUO NUOVO LIVELLO 15!!* 🏆
ᰔᩚ *${especialCant * 2} ${especial}*
ᰔᩚ *${especialCant2 * 2} ${especial2}*
ᰔᩚ *${especialCant3 * 2} ${especial3}*
ᰔᩚ *${especialCant4 * 2} ${especial4}*`, m)
user[especial] += especialCant * 2
user[especial2] += especialCant2 * 2
user[especial3] += especialCant3 * 2
user[especial4] += especialCant4 * 2

}else if (user.level == 20){
conn.reply(m.chat, `*🥳 RICOMPENSA PER IL TUO NUOVO LIVELLO 20!!* 🏆
ᰔᩚ *${especialCant * 3} ${especial}*
ᰔᩚ *${especialCant2 * 3} ${especial2}*
ᰔᩚ *${especialCant3 * 3} ${especial3}*
ᰔᩚ *${especialCant4 * 3} ${especial4}*`, m)
user[especial] += especialCant * 3
user[especial2] += especialCant2 * 3
user[especial3] += especialCant3 * 3
user[especial4] += especialCant4 * 3
}
}}
return !0 }
