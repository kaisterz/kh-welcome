const discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");
let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.react(":x:");
    if(!args[0]) return message.channel.send(`The prefix for this guild is \`${prefixes[message.guild.id].prefix}\``);
    if(!args[0].match(/^([A-z0-9]|\!|\.){1,3}$/)) return message.channel.send("Prefix may only include letters, numbers, \`!\` or \`.\`, and is limited to 3 characters!");
    try{
        if(args[0] === 'reset') {
        prefixes[message.guild.id] = {
            prefix: `${botconfig.prefix}`
        }
    }else{
        prefixes[message.guild.id] = {
            prefix: args[0]
        };
    }

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if(err) console.error(err); 
    });

    message.channel.send(`Guild prefix updated to \`${prefixes[message.guild.id].prefix}\``)
}catch(e){
    message.channel.send('Error occured while executing the command');
    console.error(e);
}
}


module.exports.config = {
  name: "prefix",
  alias: [],
  description: "Sets the guild's prefix.",
  usage: `${botconfig.prefix}prefix [desired prefix]`,
  access: `Manage Guild`
}
