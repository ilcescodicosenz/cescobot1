const userSpamData = {}  
let handler = m => m  

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {  
    const chat = global.db.data.chats[m.chat]  
    const bot = global.db.data.settings[conn.user.jid] || {}  
    if (!bot.antiSpam) return  
    if (m.isGroup && chat.modoadmin) return  

    if (m.isGroup) {  
        if (isOwner || isROwner || isAdmin || !isBotAdmin || isPrems) return  
    }  

    let user = global.db.data.users[m.sender]  
    const sender = m.sender  
    const currentTime = new Date().getTime()  
    const timeWindow = 5000 // tempo limite  
    const messageLimit = 10 // numero di messaggi in tale tempo  

    let time, time2, time3, messaggio, motivo  
    time = 30000 // 30 secondi  
    time2 = 60000 // 1 minuto  
    time3 = 120000 // 2 minuti  

    if (!(sender in userSpamData)) {  
        userSpamData[sender] = {  
            lastMessageTime: currentTime,  
            messageCount: 1,  
            antiBan: 0,  
            message: 0,  
            message2: 0,  
            message3: 0,  
        }  
    } else {  
        const userData = userSpamData[sender]  
        const timeDifference = currentTime - userData.lastMessageTime  

        if (userData.antiBan === 1) {  
            if (userData.message < 5) {  
                userData.message++  
                motivo = `᥀·࣭࣪̇˖⚔️◗ Non fare spam.`  
                await conn.reply(m.chat, motivo, m, { mentions: [m.sender] })  
                user.messageSpam = motivo  
            }  
        } else if (userData.antiBan === 2) {  
            if (userData.message2 < 5) {  
                userData.message2++  
                motivo = `᥀·࣭࣪̇˖⚔️◗ Non fare spam...`  
                await conn.reply(m.chat, motivo, m, { mentions: [m.sender] })  
                user.messageSpam = motivo  
            }  
        } else if (userData.antiBan === 3) {  
            if (userData.message3 < 5) {  
                userData.message3++  
                motivo = `᥀·࣭࣪̇˖👺◗ Sarai rimosso/a per spam.`  
                await conn.reply(m.chat, motivo, m, { mentions: [m.sender] })  
                user.messageSpam = motivo  
                await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')  
            }  
        }  

        if (timeDifference <= timeWindow) {  
            userData.messageCount += 1  

            if (userData.messageCount >= messageLimit) {  
                const mention = `@${sender.split("@")[0]}`  
                const warningMessage = `🚩 _*Troppo spam*_\n\nUtente: ${mention}`  
                if (userData.antiBan > 2) return await conn.reply(m.chat, warningMessage, m, { mentions: [m.sender] })  

                user.banned = true  
                userData.antiBan++  
                userData.messageCount = 1  

                if (userData.antiBan === 1) {  
                    setTimeout(() => {  
                        if (userData.antiBan === 1) {  
                            userData.antiBan = 0  
                            userData.message = 0  
                            userData.message2 = 0  
                            userData.message3 = 0  
                            user.antispam = 0  
                            motivo = 0  
                            user.messageSpam = 0  
                            user.banned = false  
                        }  
                    }, time)  
                } else if (userData.antiBan === 2) {  
                    setTimeout(() => {  
                        if (userData.antiBan === 2) {  
                            userData.antiBan = 0  
                            userData.message = 0  
                            userData.message2 = 0  
                            userData.message3 = 0  
                            user.antispam = 0  
                            motivo = 0  
                            user.messageSpam = 0  
                            user.banned = false  
                        }  
                    }, time2)  
                } else if (userData.antiBan === 3) {  
                    setTimeout(() => {  
                        if (userData.antiBan === 3) {  
                            userData.antiBan = 0  
                            userData.message = 0  
                            userData.message2 = 0  
                            userData.message3 = 0  
                            user.antispam = 0  
                            motivo = 0  
                            user.messageSpam = 0  
                            user.banned = false  
                        }  
                    }, time3)  
                }  
            }  
        } else {  
            if (timeDifference >= 2000) {  
                userData.messageCount = 1  
            }  
        }  
        userData.lastMessageTime = currentTime  
    }  
}  

export default handler
