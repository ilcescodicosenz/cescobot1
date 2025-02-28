import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) { return conn.reply(m.chat, `❀ Fai una richiesta a Gemini in modo che risponda.`, m)}
try {
await m.react(rwait)
var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
var res = await apii.json()
await conn.reply(m.chat, res.result, m)
await m.react(done)
} catch {
await m.react(error)
await conn.reply(m.chat, `✘ Gemini non può rispondere a questa domanda.`, m, rcanal)
}}
handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']

export default handler
