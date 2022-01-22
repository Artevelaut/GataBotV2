let fetch = require('node-fetch')
let split = '|'
let handler = async (m, { conn, args: [effect], text: txt }) => {
  let { effects } = await (await (fetch(global.API('xteam', '/textpro')))).json()
  if (!effect) throw '*Lista de efectos disponibles*\n\n' + effects.sort((a, b) => a - b).join('\n')
  effect = effect.toLowerCase()
  if (!effect in effects) throw `*[❗] El efecto ${effect} no se encuentra en la base de datos*`
  let [text, ...text2] = txt.replace(effect, '').trimStart().split(split)
  text2 = text2.join(split)
  let url = global.API('xteam', '/textpro/' + effect, { text, text2 }, 'APIKEY')
  await conn.sendFile(m.chat, url, 'Error.jpg', `*DISEÑO TERMINADO*\n*Efecto:* ${effect}`, m)
}
handler.help = ['textpro'].map(v => v + ' <effect> <text>|[text2]')
handler.tags = ['tools']
handler.command = /^(logos)$/i

module.exports = handler
