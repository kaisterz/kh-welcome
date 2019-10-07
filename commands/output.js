const discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.react(":x:");
    if(message.mentions.channels.size > 0) var chanid = message.mentions.channels.first().id 
    else var chanid = args[0]
    try{
        const channels = JSON.parse(fs.readFileSync("./output.json", "utf8"));

    channels[message.guild.id] = {
        output: chanid
    }

    fs.writeFile("./output.json", JSON.stringify(channels), (err) => {
        if(err) console.error(err); 
    });
    message.channel.send(`Output channel successfully set to <#${chanid}>`)
    }catch(e){
        message.channel.send(`Error setting channel: ${e}`)
        console.error(e);
    }
}


module.exports.config = {
  name: "output",
  alias: ["outputchan"],
  description: "Sets the confession output channel.",
  usage: `${botconfig.prefix}output  [id or #mention]`
}
