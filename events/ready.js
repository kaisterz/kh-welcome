const discord = require("discord.js")
const chalk = require("chalk")

module.exports = bot => {
  console.log(chalk.red("[LOGS] Bot logged in as " + bot.user.username));
  bot.user.setActivity("for confessions", {type: "WATCHING"});
}
