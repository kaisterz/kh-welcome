const discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  if(args[0]){
    let command = args[0]
    if(bot.commands.has(command)) {
      command = bot.commands.get(command)
      const embed = new discord.RichEmbed()
      .setColor("BLUE")
      .setAuthor("Help", bot.user.displayAvatarURL)
      .setDescription(`The bot prefix is: ${botconfig.prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Access:** ${command.config.access || "Members"}\n**Aliases:** ${command.config.alias.join(", ") || "No Aliases"}`)
      message.channel.send(embed)
    }else {
      message.reply(`Command not found! Use ${botconfig.prefix}help for a list of commands.`)
    }
  }

  if(!args[0]){
    var cmds = [];
    fs.readdirSync("./commands/").forEach(file => {
        cmds.push(`${file.split(".js")}`)
    })
    const embed = new discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor("Help", bot.user.displayAvatarURL)
    .setDescription("These are the available commands for " + bot.user.username + "\nThe bot's prefix is " + botconfig.prefix)
    .addField("Commands", cmds.join(" ").slice(0, -1))
    message.channel.send(embed)
  }
}


module.exports.config = {
  name: "help",
  alias: ["command", "h"],
  description: "Provides help for a command.",
  usage: `${botconfig.prefix}help  [command]`
}
