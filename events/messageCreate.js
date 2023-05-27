const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const mongoose = require('mongoose');
const ms = require('ms');
const client = require('./../index.js');
const cooldown = new Collection();
const serverSchema = require(`${process.cwd()}/utils/models/guild.js`);

client.on('messageCreate', async message => {
    const lang = message;
    let data = await serverSchema.findOne({
        guildId: message.guild.id,
    });
    if (data) {
        lang.locale = data.language;
    } else {
        const newGuild = new serverSchema({
            guildId: message.guild.id,
        });
        await newGuild.save().catch((e) => {
            console.log(e);
        });
        data = await serverSchema.findOne({ guildId: message.guild.id });
    }
    const prefix = data.prefix;

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){ return message.channel.send(`Hi, I'm ${client.user.username}! In this server, my prefix is \`${prefix}\``) }



    if (message.author.bot) return;
    if (message.channel.type !== 0) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        if (command.cooldown) {
            if (cooldown.has(`${command.name}${message.author.id}`)) {
                return message.channel.send(client.languages.__mf(
                    { phrase: 'messages.cooldown', locale: lang },
                    { duration: ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true }) }
                ));
            }
            if (command.userPerms || command.botPerms) {
                if (!message.member.permissions.has(new PermissionsBitField(command.userPerms || []))) {
                    return message.channel.send(client.languages.__mf(
                        { phrase: 'messages.userperms', locale: lang },
                        { perms: `\`${command.userPerms}\`` }
                    ));
                }
                if (!message.guild.members.cache.get(client.user.id).permissions.has(new PermissionsBitField(command.botPerms || []))) {
                    return message.channel.send(client.languages.__mf(
                        { phrase: 'messages.botperms', locale: lang },
                        { perms: `\`${command.botPerms}\`` }
                    ));
                }
            }
            command.run(client, message, args);
            cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown);
            setTimeout(() => {
                cooldown.delete(`${command.name}${message.author.id}`);
            }, command.cooldown);
        } else {
            if (command.userPerms || command.botPerms) {
                if (!message.member.permissions.has(new PermissionsBitField(command.userPerms || []))) {
                    return message.channel.send(client.languages.__mf(
                        { phrase: 'messages.userperms', locale: lang },
                        { perms: `\`${command.userPerms}\`` }
                    ));
                }
                if (!message.guild.members.cache.get(client.user.id).permissions.has(new PermissionsBitField(command.botPerms || []))) {
                    return message.channel.send(client.languages.__mf(
                        { phrase: 'messages.botperms', locale: lang },
                        { perms: `\`${command.botPerms}\`` }
                    ));
                }
            }
            command.run(client, message, args);
        }
    }
});
