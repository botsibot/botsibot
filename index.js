const config = require('./utils/config');
const { Client, Collection } = require('discord.js');
const fs = require("fs")
const client = new Client(config.client);

client.commands = new Collection();
client.interactions = new Collection();
client.aliases = new Collection();

client.config = require('./utils/config');
client.prefix = client.config.prefix;
client.languages = require('i18n');




module.exports = client;


var files = fs.readdirSync('./utils/handlers/');
files.forEach(file => { require(`./utils/handlers/${file}`)(client) })





client.login(process.env.TOKEN);