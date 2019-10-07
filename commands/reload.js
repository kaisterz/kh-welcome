const botconfig = require("../botconfig.json")
const chalk = require("chalk")
const fs = require("fs")

module.exports.run = (bot, message, args) => {
  if (message.author.id !== botconfig.ownerid) return;
  if (args[0]) {
    const commandName = args[0];
    // Check if the command exists and is valid
    if (!bot.commands.has(commandName)) {
      return message.reply("That command does not exist");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the bot.commands Enmap
    bot.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    bot.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded!`);
    console.log(chalk.red(`[LOGS] The command ${commandName} has been reloaded!`))
  } else {
    fs.readdir("./commands/", (err, files) => {
      let jsfile = files.filter(f => f.split(".").pop() === 'js')
      jsfile.forEach(f => {
        const file = f.replace(".js", "")
        delete require.cache[require.resolve(`./${file}.js`)];
        bot.commands.delete(file);
        const props = require(`./${file}.js`);
        bot.commands.set(file, props);
      })
    })
    message.reply(`All commands have been reloaded!`);
    console.log(chalk.red(`[LOGS] All commands have been reloaded!`))
  }
};

module.exports.config = {
  name: "reload",
  alias: [],
  description: "Reloads a commands's code.",
  usage: ``
}