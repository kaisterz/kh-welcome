const discord = require("discord.js");
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    let ping = Math.floor(bot.ping)
    const embed = new discord.RichEmbed() 
        .setTitle(`${bot.user.username}'s Ping :ping_pong:`)
        .setDescription(ping)
        .setColor("#FF9DCE")
        
    message.channel.send(embed); 
}

module.exports.config = {
    name: "ping",
    description: "Displays the bot's ping.",
    usage: `${botconfig.prefix}ping`,
    alias: []
}