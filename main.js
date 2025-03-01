// Impostazioni iniziali e configurazioni di sicurezza
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import './config.js';
import './api.js';
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import * as ws from 'ws';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import P from 'pino';
import pino from 'pino';
import Pino from 'pino';
import { Boom } from '@hapi/boom';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js';
const { proto } = (await import('@whiskeysockets/baileys')).default;
const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} = await import('@whiskeysockets/baileys');
import readline from 'readline';
import NodeCache from 'node-cache';
const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// Inizializzo le estensioni per Baileys
protoType();
serialize();

// Funzioni globali per ottenere __filename e __dirname
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

// Funzione globale per le API
global.API = (name, percorso = '/', query = {}, nomeChiaveApi) =>
  (name in global.APIs ? global.APIs[name] : name) +
  percorso +
  (query || nomeChiaveApi
    ? '?' +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(nomeChiaveApi
            ? { [nomeChiaveApi]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] }
            : {}),
        })
      )
    : '');

// Impostazioni globali
global.timestamp = { start: new Date() };
global.videoList = [];
global.videoListXXX = [];

const __dirnameLocal = global.__dirname(import.meta.url);

// Parsing degli argomenti e configurazione del prefisso
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp(
  '^[' +
    (opts['prefix'] || '.').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') +
    ']'
);

// Inizializzazione del database (lowdb)
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '')
    ? new cloudDBAdapter(opts['db'])
    : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
);
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
        }
      }, 1000)
    );
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

// Inizializzazione del database per ChatGPT (lowdb)
global.chatgpt = new Low(new JSONFile(path.join(__dirnameLocal, '/db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.chatgpt.READ) {
          clearInterval(this);
          resolve(global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data);
        }
      }, 1000)
    );
  }
  if (global.chatgpt.data !== null) return;
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(console.error);
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  };
  global.chatgpt.chain = lodash.chain(global.chatgpt.data);
};
loadChatgptDB();

// Configurazione file di autenticazione (sessione)
global.authFile = `cescobotsession`; // Nome della cartella di sessione
const { state, saveState, saveCreds } = await useMultiFileAuthState(global.authFile);
const msgRetryCounterMap = (MessageRetryMap) => {};
const msgRetryCounterCache = new NodeCache();
const { version } = await fetchLatestBaileysVersion();
let phoneNumber = global.botnumber;

// Modalità di collegamento
const methodCodeQR = process.argv.includes('qr');
const methodCode = !!phoneNumber || process.argv.includes('code');
const MethodMobile = process.argv.includes('mobile');

// Configurazione dell'interfaccia di input
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (testo) => new Promise((resolve) => rl.question(testo, resolve));

// MENU DI AVVIO – Tradotto e personalizzato in italiano con colori
let opzione;
if (methodCodeQR) {
  opzione = '1';
}
if (!methodCodeQR && !methodCode && !existsSync(`./${global.authFile}/creds.json`)) {
  do {
    // Menu con colori e simboli
    const menu = chalk.bold.blueBright(
      '\n============================================\n' +
      '         Benvenuto in Cescobot v1.0\n' +
      '============================================\n' +
      chalk.greenBright('🚀 Scegli il metodo per collegare il tuo bot:\n') +
      chalk.yellowBright('1. Collegamento tramite QR\n') +
      chalk.magentaBright('2. Collegamento tramite codice a 8 cifre\n') +
      chalk.cyan('Inserisci la tua scelta ---> ')
    );
    opzione = await question(menu);
    if (!/^[1-2]$/.test(opzione)) {
      console.log(chalk.redBright('Errore: Seleziona SOLO 1 oppure 2.\n'));
    }
  } while (opzione !== '1' && opzione !== '2' || existsSync(`./${global.authFile}/creds.json`));
}

// Array di filtri per messaggi (codificati in base64)
const filterStrings = [
  "Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
  "Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
  "RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
  "U2Vzc2lvbiBlcnJvcg==", // "Session error"
  "RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC"
  "RGVqcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message"
];

// Disabilito alcuni metodi di log per filtrare messaggi non necessari
console.info = () => {};
console.debug = () => {};
['log', 'warn', 'error'].forEach(methodName =>
  redefineConsoleMethod(methodName, filterStrings)
);

// Opzioni di connessione per il bot
const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opzione === '1' ? true : methodCodeQR ? true : false,
  mobile: MethodMobile,
  browser:
    opzione === '1'
      ? ['Cescobot Dev', 'Safari', 'Developer']
      : methodCodeQR
      ? ['Cescobot Dev', 'Safari', 'Developer']
      : ['Ubuntu', 'Chrome', 'Developer'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  syncFullHistory: true,
  getMessage: async (chiave) => {
    let jid = jidNormalizedUser(chiave.remoteJid);
    let msg = await store.loadMessage(jid, chiave.id);
    return msg?.message || "";
  },
  msgRetryCounterCache,
  msgRetryCounterMap,
  defaultQueryTimeoutMs: undefined,
  version,
};

// Creazione della connessione
global.conn = makeWASocket(connectionOptions);

// Se non esiste la sessione, gestisco il collegamento
if (!existsSync(`./${global.authFile}/creds.json`)) {
  if (opzione === '2' || methodCode) {
    opzione = '2';
    if (!conn.authState.creds.registered) {
      if (MethodMobile)
        throw new Error('Impossibile utilizzare un codice di accoppiamento con l\'API mobile');
      let numeroTelefono;
      if (!!phoneNumber) {
        numeroTelefono = phoneNumber.replace(/[^0-9]/g, '');
        if (!Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
          console.log(chalk.bgBlack(chalk.bold.redBright(
            'Inserisci il numero di telefono WhatsApp\nEsempio: +39 333 333 3333\n'
          )));
          process.exit(0);
        }
      } else {
        while (true) {
          numeroTelefono = await question(chalk.bgBlack(chalk.bold.yellowBright(
            'Inserisci il numero di telefono WhatsApp\nEsempio: +39 333 333 3333\n'
          )));
          numeroTelefono = numeroTelefono.replace(/[^0-9]/g, '');
          if (numeroTelefono.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
            break;
          } else {
            console.log(chalk.bgBlack(chalk.bold.redBright(
              'Inserisci un numero di telefono WhatsApp valido\nEsempio: +39 333 333 3333\n'
            )));
          }
        }
        rl.close();
      }
      // Richiedo il codice di accoppiamento e lo formatto a gruppi di 4 cifre
      setTimeout(async () => {
        let codice = await conn.requestPairingCode(numeroTelefono);
        codice = codice?.match(/.{1,4}/g)?.join("-") || codice;
        console.log(chalk.yellowBright('🚀 Collega il tuo bot...'));
        console.log(
          chalk.black(chalk.bgCyanBright('INSERISCI QUESTO CODICE:')),
          chalk.black(chalk.bgGreenBright(codice))
        );
      }, 3000);
    }
  }
}

conn.isInit = false;
conn.well = false;
conn.logger.info('🚀 Caricamento in corso...\n');

// Salvataggio periodico del database e pulizia file temporanei
if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write();
      if (opts['autocleartmp'] && (global.support || {}).find) {
        const tmpDirs = [tmpdir(), 'tmp', 'jadibts'];
        tmpDirs.forEach((dir) =>
          cp.spawn('find', [dir, '-amin', '3', '-type', 'f', '-delete'])
        );
      }
    }, 10 * 1000);
  }
}

// Avvio del server se abilitato
if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

/* --- Testo ispirazionale ---
   "Ed è stato il miglior 'momazo' del mondo,
    anche se non ho esitato nemmeno per un secondo,
    non mi pento di essermi spassato,
    perché il divertimento è un sentimento.
    
    - Il Waza 👻👻👻👻 (Aiden)

    Anche io so fare 'momazi', Aiden...
    Ecco l'aggiornamento per la cancellazione intelligente delle sessioni e dei sotto-bot.
    
    Nessuno è migliore di Tilin God.
    - Con affetto: sk1d"
----------------------------------*/

// Funzione per la pulizia dei file temporanei (elimina file più vecchi di 3 minuti)
function clearTmp() {
  const tmpDirs = [join(__dirnameLocal, './tmp')];
  const files = [];
  tmpDirs.forEach((dir) => readdirSync(dir).forEach((file) => files.push(join(dir, file))));
  return files.map((file) => {
    const stats = statSync(file);
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 3 * 60 * 1000))
      return unlinkSync(file);
    return false;
  });
}

// Funzione per eliminare file di sessione pre-key nella cartella "333BotSession"
function purgeSession() {
  let prekey = [];
  let directory = readdirSync("./333BotSession");
  let filesFolderPreKeys = directory.filter(file => file.startsWith('pre-key-'));
  prekey = [...prekey, ...filesFolderPreKeys];
  filesFolderPreKeys.forEach(file => {
    unlinkSync(`./333BotSession/${file}`);
  });
}

// Funzione per eliminare file di sessione pre-key per i sotto-bot nella cartella "jadibts"
function purgeSessionSB() {
  try {
    let listaCartelle = readdirSync('./jadibts/');
    let SBprekey = [];
    listaCartelle.forEach(cartella => {
      if (statSync(`./jadibts/${cartella}`).isDirectory()) {
        let preKeysDSB = readdirSync(`./jadibts/${cartella}`).filter(file => file.startsWith('pre-key-'));
        SBprekey = [...SBprekey, ...preKeysDSB];
        preKeysDSB.forEach(file => {
          unlinkSync(`./jadibts/${cartella}/${file}`);
        });
      }
    });
    if (SBprekey.length === 0) return;
  } catch (err) {
    console.log(chalk.bold.red('⚠️ Qualcosa è andato storto durante la cancellazione delle sessioni (sotto-bot)'));
  }
}

// Funzione per eliminare file vecchi nelle cartelle di sessione
function purgeOldFiles() {
  const directories = ['./cescobotSession/', './jadibts/'];
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  directories.forEach(dir => {
    readdirSync(dir, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        const filePath = path.join(dir, file);
        stat(filePath, (err, stats) => {
          if (err) throw err;
          if (stats.isFile() && stats.mtimeMs < oneHourAgo && file !== 'creds.json') {
            unlinkSync(filePath, err => {
              if (err) throw err;
              console.log(chalk.bold.green(`File ${file} cancellato con successo`));
            });
          } else {
            console.log(chalk.bold.red(`File ${file} non cancellato: ${err || ''}`));
          }
        });
      });
    });
  });
}

// Funzione per ridefinire i metodi di console e filtrare messaggi non desiderati
function redefineConsoleMethod(methodName, filterStrings) {
  const originalConsoleMethod = console[methodName];
  console[methodName] = function () {
    const message = arguments[0];
    if (
      typeof message === 'string' &&
      filterStrings.some(filterString => message.includes(atob(filterString)))
    ) {
      arguments[0] = "";
    }
    originalConsoleMethod.apply(console, arguments);
  };
}

// Gestione degli aggiornamenti di connessione
async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;
  const code =
    lastDisconnect?.error?.output?.statusCode ||
    lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date();
  }
  if (global.db.data == null) loadDatabase();
  if ((update.qr != 0 && update.qr != undefined) || methodCodeQR) {
    if (opzione == '1' || methodCodeQR) {
      console.log(chalk.yellow('Scansiona questo codice QR, scadrà tra 60 secondi.'));
    }
  }
  if (connection === 'open') {
    console.log(chalk.green('\nCescobot connesso ✅\n'));
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
  if (reason == 405) {
    await unlinkSync("./333BotSession/" + "creds.json");
    console.log(
      chalk.bold.redBright(
        `[ ⚠️ ] Connessione sostituita, riavvio in corso...\nSi è verificato un errore, riavvia con: npm start`
      )
    );
    process.send('reset');
  }
  if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
      conn.logger.error(
        `[ ⚠️ ] Sessione errata, elimina la cartella ${global.authFile} ed esegui nuovamente la scansione.`
      );
    } else if (reason === DisconnectReason.connectionClosed) {
      conn.logger.warn(`[ ⚠️ ] Connessione chiusa, riconnessione in corso...`);
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionLost) {
      conn.logger.warn(`[ ⚠️ ] Connessione persa al server, riconnessione in corso...`);
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionReplaced) {
      conn.logger.error(
        `[ ⚠️ ] Connessione sostituita, è stata aperta un'altra sessione. Riconnettiti dalla sessione corrente.`
      );
    } else if (reason === DisconnectReason.loggedOut) {
      conn.logger.error(
        `[ ⚠️ ] Connessione chiusa, elimina la cartella ${global.authFile} ed esegui nuovamente la scansione.`
      );
    } else if (reason === DisconnectReason.restartRequired) {
      conn.logger.info(
        `[ ⚠️ ] Riavvio richiesto, riavvio il server in caso di problemi.`
      );
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.timedOut) {
      conn.logger.warn(`[ ⚠️ ] Connessione scaduta, riconnessione in corso...`);
      await global.reloadHandler(true).catch(console.error);
    } else {
      conn.logger.warn(
        `[ ⚠️ ] Motivo della disconnessione sconosciuto. Verifica se il tuo numero è bannato. ${reason || ''}: ${connection || ''}`
      );
      await global.reloadHandler(true).catch(console.error);
    }
  }
}

process.on('uncaughtException', console.error);

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function (restartConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restartConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: oldChats });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('groups.update', conn.groupsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off('call', conn.onCall);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  // Impostazione messaggi di benvenuto, addio e promozioni (tradotti in italiano)
  conn.welcome = '@user benvenuto/a in @subject';
  conn.bye = '@user ha abbandonato il gruppo';
  conn.spromote = '@user ha ottenuto i privilegi';
  conn.sdemote = '@user non possiede più i privilegi';
  conn.sIcon = 'Immagine del gruppo modificata';
  conn.sRevoke = 'Link ripristinato, nuovo link: @revoke';

  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.onCall = handler.callUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  // Registrazione degli eventi
  conn.ev.on('messages.upsert', conn.handler);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on('groups.update', conn.groupsUpdate);
  conn.ev.on('message.delete', conn.onDelete);
  conn.ev.on('call', conn.onCall);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  isInit = false;
  return true;
};

const pluginFolder = global.__dirname(join(__dirnameLocal, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`Plugin aggiornato - '${filename}'`);
      else {
        conn.logger.warn(`Plugin eliminato - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`Nuovo plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err)
      conn.logger.error(`Errore di sintassi durante il caricamento di '${filename}'\n${format(err)}`);
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`Errore nel require del plugin '${filename}\n${format(e)}`);
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

// Test rapido dei comandi di sistema (ffmpeg, convert, ecc.)
async function _quickTest() {
  const test = await Promise.all(
    [
      spawn('ffmpeg'),
      spawn('ffprobe'),
      spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
      spawn('convert'),
      spawn('magick'),
      spawn('gm'),
      spawn('find', ['--version']),
    ].map((p) => {
      return Promise.race([
        new Promise((resolve) => {
          p.on('close', (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on('error', (_) => resolve(false));
        }),
      ]);
    })
  );
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = (global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find });
  Object.freeze(global.support);
}

// Intervalli periodici per la pulizia e l'aggiornamento dello stato
setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return;
  await clearTmp();
  console.log(
    chalk.cyanBright(
      `\n╭────────────────────────────\n│ AUTO PULIZIA TEMPORANEI COMPLETATA ✅\n╰────────────────────────────`
    )
  );
}, 180000);

setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return;
  await purgeSession();
  console.log(
    chalk.cyanBright(
      `\n╭────────────────────────────\n│ AUTO CANCELLAZIONE SESSIONI COMPLETATA ✅\n╰────────────────────────────`
    )
  );
}, 1000 * 60 * 60);

setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return;
  await purgeSessionSB();
  console.log(
    chalk.cyanBright(
      `\n╭────────────────────────────\n│ AUTO CANCELLAZIONE SESSIONI SOTTO-BOT COMPLETATA ✅\n╰────────────────────────────`
    )
  );
}, 1000 * 60 * 60);

setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return;
  await purgeOldFiles();
  console.log(
    chalk.cyanBright(
      `\n╭────────────────────────────\n│ AUTO CANCELLAZIONE FILE VECCHI COMPLETATA ✅\n╰────────────────────────────`
    )
  );
}, 1000 * 60 * 60);

setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return;
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const bio = `   cescobot online da ${uptime} `;
  await global.conn.updateProfileStatus(bio).catch((_) => _);
}, 60000);

// Funzione per formattare il tempo di attività
function clockString(ms) {
  const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, ' giorni ', h, ' ore ', m, ' minuti ', s, ' secondi ']
    .map((v) => v.toString().padStart(2, '0'))
    .join('');
}

_quickTest().catch(console.error);
