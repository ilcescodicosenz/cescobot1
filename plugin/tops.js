import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) return conn.reply(m.chat, 'Esempio di utilizzo: #top *testo* [numero partecipanti]', m)

  // Ottieni la lista dei partecipanti al gruppo
  let ps = groupMetadata.participants.map(v => v.id)

  // Permettere all'utente di scegliere il numero di partecipanti da visualizzare
  let topNumber = 10; // Numero di partecipanti predefiniti
  if (text.split(' ')[1]) {
    topNumber = Math.min(parseInt(text.split(' ')[1]), 20); // Limita a un massimo di 20 partecipanti
  }

  // Seleziona i partecipanti casualmente
  let selectedParticipants = [];
  for (let i = 0; i < topNumber; i++) {
    selectedParticipants.push(ps.getRandom());
  }

  // Seleziona un'emoticon casuale dalla lista
  let x = `${pickRandom(['🤓','😅','😂','😳','😎', '🥵', '😱', '🤑', '🙄', '💩','🍑','🤨','🥴','🔥','👇🏻','😔', '👀','🌚'])}`

  // Seleziona un numero casuale per il messaggio
  let k = Math.floor(Math.random() * 70)

  // URL per il suono casuale
  let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`

  // Creazione del messaggio con la top X
  let topMessage = `*${x} Top ${topNumber} ${text.split(' ')[0]} ${x}*\n`
  selectedParticipants.forEach((participant, index) => {
    let medal = '';
    if (index === 0) medal = '🥇'; // Medaglia d'oro per il primo
    if (index === 1) medal = '🥈'; // Medaglia d'argento per il secondo
    if (index === 2) medal = '🥉'; // Medaglia di bronzo per il terzo
    topMessage += `*${index + 1}. ${user(participant)} ${medal}*\n`;
  });

  // Messaggio aggiuntivo casuale
  let extraMessage = pickRandom([
    'Grande! Complimenti a tutti!',
    'Wow, questi sono davvero i migliori!',
    'Chi sarà il prossimo a superare la classifica?',
    'Non fermatevi! Continuate così!',
    'Chi farà il colpo di scena?!'
  ]);

  // Completamento del messaggio finale
  topMessage += `\n${extraMessage}`;

  // Invia il messaggio al gruppo con le menzioni
  m.reply(topMessage, null, { mentions: selectedParticipants });
}

handler.help = ['top *<testo>* [numero partecipanti]']
handler.command = ['top']
handler.tags = ['divertimento']
handler.group = true

export default handler

// Funzione per scegliere un elemento casuale da una lista
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Funzione per ottenere un elemento casuale da un array
Array.prototype.getRandom = function() {
  return this[Math.floor(Math.random() * this.length)];
}
