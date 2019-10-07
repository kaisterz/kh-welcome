const discord = require("discord.js")
const moment = require("moment")
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.react(":x:");
    if(message.mentions.channels.size > 0) var chanid = message.mentions.channels.first().id 
    else var chanid = args[0]
    try{
        const channels = JSON.parse(fs.readFileSync("./channel.json", "utf8"));

    channels[message.guild.id].welcome = chanid
    
    fs.writeFile("./channel.json", JSON.stringify(channels), (err) => {
        if(err) console.error(err); 
    });
    message.channel.send(`Welcome channel successfully set to <#${chanid}>`)
    }catch(e){
        message.channel.send(`Error setting channel: ${e}`)
        console.error(e);
    }
}

module.exports.config = {
  name: "setwelcome",
  alias: [],
  description: "Sets the channel to send welcome messages to.",
  usage: `${botconfig.prefix}setwelcome [id/#mention]`
}