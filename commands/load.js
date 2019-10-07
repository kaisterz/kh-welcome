const chalk = require("chalk")
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== botconfig.ownerid) return;
    let commandName = args[0]
    if(!commandName) return message.reply("What command?")
    try {
        var props = require(`./${commandName}.js`);
    }catch(e) {
        message.reply("There was an error loading the command! " + e)
        return
    }
    bot.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been loaded!`);
    console.log(chalk.red(`[LOGS] The command ${commandName} has been loaded into the bot!`))
}

module.exports.config = {
    name: "load",
    alias: [],
    description: "Loads a new command into the bot.",
    usage: `${botconfig.prefix}load`,
    access: "Bot Developer"
}