import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) return conn.reply(m.chat, 'Esempio di utilizzo: #top *testo*', m, rcanal)
  
  // Ottieni la lista dei partecipanti al gruppo
  let ps = groupMetadata.participants.map(v => v.id)
  
  // Seleziona 10 partecipanti a caso
  let a = ps.getRandom()
  let b = ps.getRandom()
  let c = ps.getRandom()
  let d = ps.getRandom()
  let e = ps.getRandom()
  let f = ps.getRandom()
  let g = ps.getRandom()
  let h = ps.getRandom()
  let i = ps.getRandom()
  let j = ps.getRandom()
  
  // Seleziona un numero casuale da 0 a 70
  let k = Math.floor(Math.random() * 70)
  
  // Seleziona un'emoticon casuale dalla lista
  let x = `${pickRandom(['🤓','😅','😂','😳','😎', '🥵', '😱', '🤑', '🙄', '💩','🍑','🤨','🥴','🔥','👇🏻','😔', '👀','🌚'])}`
  
  // Seleziona una lunghezza casuale per l'emoticon
  let l = Math.floor(Math.random() * x.length)
  
  // URL per il suono casuale
  let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
  
  // Crea il messaggio "Top 10" con i partecipanti
  let top = `*${x} Top 10 ${text} ${x}*
  
  *1. ${user(a)}*
  *2. ${user(b)}*
  *3. ${user(c)}*
  *4. ${user(d)}*
  *5. ${user(e)}*
  *6. ${user(f)}*
  *7. ${user(g)}*
  *8. ${user(h)}*
  *9. ${user(i)}*
  *10. ${user(j)}*`
  
  // Invia il messaggio al gruppo con le menzioni
  m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j] })
}

handler.help = ['top *<testo>*']
handler.command = ['top']
handler.tags = ['divertimento']
handler.group = true

export default handler

// Funzione per scegliere un elemento casuale da una lista
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
