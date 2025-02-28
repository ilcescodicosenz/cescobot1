import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return
    let utente = `@${m.sender.split`@`[0]}`
    const nomeGruppo = (await conn.groupMetadata(m.chat)).subject
    const amministratoriGruppo = participants.filter((p) => p.admin)

    let pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => immagine1)
    const img = await (await fetch(pp)).buffer()
    const chat = global.db.data.chats[m.chat]
    const menzioni = [m.sender, m.messageStubParameters[0], ...amministratoriGruppo.map((v) => v.id)]
    const menzioniContenutoM = [m.sender, m.messageStubParameters[0]]

    if (chat.detect && m.messageStubType == 21) {
        await this.sendMessage(m.chat, { text: `🍟 ${utente} *Ha cambiato il nome del gruppo*`, mentions: menzioni }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

    } else if (chat.detect && m.messageStubType == 22) {
        await this.sendMessage(m.chat, { text: `🚩 ${utente} *Ha cambiato l'immagine del gruppo*`, mentions: menzioni }, { quoted: fliveLoc, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

    } else if (chat.detect && m.messageStubType == 24) {
        await this.sendMessage(m.chat, { text: `🍟 ${utente} *Ha modificato la descrizione!*\n\nNuova descrizione:\n\n${m.messageStubParameters[0]}`, mentions: menzioni }, { quoted: fliveLoc, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

    } else if (chat.detect && m.messageStubType == 25) {
        await this.sendMessage(m.chat, { text: `🚩 *Ora ${m.messageStubParameters[0] == 'on' ? 'solo gli admin' : 'tutti'} possono modificare le informazioni del gruppo*`, mentions: menzioni }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

    } else if (chat.detect && m.messageStubType == 26) {
        await this.sendMessage(m.chat, { text: `🚩 *Il gruppo è stato ${m.messageStubParameters[0] == 'on' ? 'chiuso' : 'aperto'}*\n\nOra ${m.messageStubParameters[0] == 'on' ? 'solo gli admin' : 'tutti'} possono inviare messaggi`, mentions: menzioni }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

    } else if (chat.detect && m.messageStubType == 29) {
        let testo1 = `🚩 *Nuovo amministratore*\n\n`
        testo1 += `Nome: @${m.messageStubParameters[0].split`@`[0]}\n`
        testo1 += `Nominato da: @${m.sender.split`@`[0]}`

        await conn.sendMessage(m.chat, { text: testo1, mentions: [...testo1.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: { mentionedJid: [...testo1.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), "externalAdReply": { "showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.packname, "body": dev, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "mediaUrl": channel, "sourceUrl": channel } } })

    } else if (chat.detect && m.messageStubType == 30) {
        let testo2 = `🚩 *Un amministratore in meno*\n\n`
        testo2 += `Nome: @${m.messageStubParameters[0].split`@`[0]}\n`
        testo2 += `Rimosso da: @${m.sender.split`@`[0]}`

        await conn.sendMessage(m.chat, { text: testo2, mentions: [...testo2.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: { mentionedJid: [...testo2.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), "externalAdReply": { "showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.packname, "body": dev, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "mediaUrl": channel, "sourceUrl": channel } } })

    } else if (chat.detect && m.messageStubType == 72) {
        await this.sendMessage(m.chat, { text: `🍟 ${utente} *Ha cambiato la durata dei messaggi temporanei a @${m.messageStubParameters[0]}*`, mentions: menzioni }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

    } else if (chat.detect && m.messageStubType == 123) {
        await this.sendMessage(m.chat, { text: `🍟 ${utente} *Ha disattivato i messaggi temporanei*`, mentions: menzioni }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

    } else {
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: WAMessageStubType[m.messageStubType],
        })
    }
}
