const discord = require("discord.js");
const botconfig = require("../botconfig.json")
const { inspect } = require('util')


module.exports.run = async (bot, message, args) => {
  const developers = ['531285731486728203', '555196821992112128', '210902130830213121']  
  const embed = new discord.RichEmbed()
      .setColor('36393E')
    if (!developers.includes(message.author.id)) {
      embed.setFooter('If you believe this to be an error, contact the developer.')
        .addField('Permission Error', 'You are not listed as a developer.')
    } else if (args.length === 0) {
      embed.addField('Input Error', 'Please provide the code to evalulate.')
    } else {
      const code = args.join(' ')
      if(code.includes("process.exit" || "bot.destroy")) return message.channel.send("U thought scrub")
      try {
        let resultEval = eval(code)
        let toEval = typeof resultEval === 'string' ? resultEval : inspect(resultEval, { depth: 0 })
        embed.addField('Result', `${toEval}`)
      } catch (error) {
        embed.addField('Error', `${error}`)
      }
    }
    message.channel.send(embed)
}

module.exports.config = {
  name: "eval",
  alias: ["compile"],
  description: "Evaluates javascript.",
  usage: `${botconfig.prefix}eval`,
  access: "Bot Developer"
}

