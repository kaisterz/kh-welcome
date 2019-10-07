const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the permission to execute this command!")
  message.channel.fetchMessages({limit: 100}).then(msgs => {
      const msgArray = []
      msgs.forEach(m => {
          if(m.author.bot === true || m.content.startsWith("-")) {
              msgArray.push(m)
          }
      })
      message.channel.bulkDelete(msgArray)
  })
}

module.exports.config = {
  name: "clean",
  alias: ["c"],
  description: "Cleans 100 bot messages from the channel.",
  usage: `${botconfig.prefix}clean`,
  access: "Manage Messages"
}
