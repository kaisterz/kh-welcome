const discord = require("discord.js");
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You do not have the permission to execute this command!")
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Please give me the permission `BAN_MEMBERS`")
  let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
  if(!banMember) return message.reply("Please provide a user to ban!")
  let reason = args.slice(1).join(" ")
  if(!reason){
    const reason = "No reason provided."
  }
  if(!banMember.bannable) return message.reply("I cannot ban this user.")
  message.delete()
  banMember.send(`You have been banned from \`${message.guild.name}\` for: ${reason}`).then(() => {
    message.guild.ban(banMember, {reason: `${reason}`}).catch(e => message.channel.send("An error has occured with the command. Try again or join the support guild."))
  }).catch(err => message.guild.ban(banMember))
  message.channel.send(`:heavy_check_mark: **${banMember.user.tag} has been banned.**`)
}


module.exports.config = {
  name: "ban",
  alias: [],
  description: "Bans a user from the guild.",
  usage: `${botconfig.prefix}ban`,
  access: "Ban Members"
}

