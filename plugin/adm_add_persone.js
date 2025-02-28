var handler = async (m, { conn, args, text, usedPrefix, command }) => {

  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
  else who = m.chat
  let name = await conn.getName(m.sender)        
  let user = global.db.data.users[who]
  let nom = conn.getName(m.sender)
  
  if (!global.db.data.settings[conn.user.jid].restrict) return conn.reply(m.chat, `🚩 *Questo comando è disabilitato dal mio creatore*`, m, rcanal) 
  
  if (!text) await m.reply(`🍟 Inserisci il numero della persona che desideri aggiungere a questo gruppo.\n\n🚩 Esempio:\n*${usedPrefix + command}* 66666666666`)
  
  if (text.includes('+')) await m.reply(`🍟 Inserisci il numero tutto insieme senza il *(+)*`)
  
  let group = m.chat
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

  await conn.reply(text + '@s.whatsapp.net', `*🍟 ei sono Cesco, una persona ti ha invitato nel suo gruppo.*\n\n*Link*\n${link}`, m, { mentions: [m.sender] })
  
  await m.reply(`🍟 *Sto inviando l'invito al privato di ${nom}*\n\n*📅 ${fecha}*\n⏰ *${tiempo}*`) 

}
handler.help = ['add']
handler.tags = ['gruppo']
handler.command = ['add', 'aggiungere', 'invita']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
