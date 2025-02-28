const handler = m => m
handler.all = async function (m) {
    let impostazioni = global.db.data.settings[this.user.jid]

    if (db.data.settings[this.user.jid].autobio) {

        let _tempoAttivo = process.uptime() * 1000
        let _muptime
        if (process.send) { 
            process.send('uptime')
            _muptime = await new Promise(resolve => { 
                process.once('message', resolve) 
                setTimeout(resolve, 2000) 
            }) * 1000
        }
        
        let tempoAttivo = formatoTempo(_tempoAttivo)
        let bio = `『${global.namebot}』 |「🕒」Attivo da: ${tempoAttivo} |「</>」 Sviluppato da: cesco👑` 
        
        await this.updateProfileStatus(bio).catch(_ => _)
        impostazioni.status = new Date() * 1
    } 
}

export default handler

function formatoTempo(ms) {
    let g = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [g, ' : ', h, ' : ', m, ' : ', s].map(v => v.toString().padStart(2, 0)).join('') 
}
