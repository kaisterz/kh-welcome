const discord = require("discord.js");
const bot = new discord.Client({
  disableEveryone: true
});

const fs = require("fs");
const botconfig = require("./botconfig.json");
const chalk = require("chalk");
const moment = require("moment");
require("./util/eventHandler")(bot)

bot.commands = new discord.Collection();
bot.alias = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    return console.log(chalk.red("[LOGS] Couldn't find commands!"));
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`)
    bot.commands.set(pull.config.name, pull);
    pull.config.alias.forEach(alias => {
      bot.alias.set(alias, pull.config.name)
    })
  })
})

bot.on("message", (message) => {
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]) prefixes[message.guild.id] = {
    prefix: botconfig.prefix
  };

  let prefix = prefixes[message.guild.id].prefix; 
  //let prefix = botconfig.prefix
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)

  if (!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.alias.get(cmd.slice(prefix.length)))
  if(!commandfile) return; 
  let pull = require(`./commands/${cmd.slice(prefix.length)}.js`)
  if(pull.config.disabled === 'true') return message.channel.send("This command is disabled.")
  if (commandfile) commandfile.run(bot, message, args)
  else message.channel.send("Command not recognized!")
});

bot.on("guildMemberAdd", (newMem) => {
  if(newMem.guild.id !== '412437425592205312') return;
  let moment = require("moment");
  const channel = newMem.guild.channels.get("620131450808958979")
  const embed = new discord.RichEmbed()
  .setAuthor(`Welcome to ${newMem.guild.name}, ${newMem.user.username}! 💖`, newMem.guild.iconURL)
  .setThumbnail(newMem.user.displayAvatarURL)
  .setColor(`#ffdae9`)
  .setImage("https://thumbs.gfycat.com/CharmingSilverBellfrog-size_restricted.gif")
  .setDescription(`• Read the rules <#630517755279573021>\n• Come chat in lounge <#620133370596163584>\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶₊˚ˑ༄ؘ\n\n`)
  .setFooter(`Account Creation • ${moment(newMem.user.createdAt).format("LLL")} \(${moment(newMem.user.createdAt).fromNow()}\)`)
  channel.send(embed);
});


bot.login(botconfig.token)