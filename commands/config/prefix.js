const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const serverSchema = require(`${process.cwd()}/utils/models/guild.js`)

module.exports = {
    name: 'prefix',
    description: "Set a new prefix",
    cooldown: 3000,
    aliases: ["setprefix"],
    userPerms: ["Administrator"],
    botPerms: [],
    run: async (client, message, args) => {
        const lang = message.member.guild.lang
        
        /**
         * @param {Client} client 
         * @param {Message} message 
         */

        if (!args[0]) return message.channel.send(client.languages.__mf({ phrase: 'prefix.args', locale: lang }));
        if (args[0].length > 5) return message.channel.send(client.languages.__mf({ phrase: 'prefix.argslength', locale: lang }));

        try {
            let data = await serverSchema.findOne({ guildId: message.guild.id });
            if (!data) {

                const newGuild = new serverSchema({ guildId: message.guild.id, });
                await newGuild.save().catch((e) => {
                    console.log(e);
                });
                data = await serverSchema.findOne({ guildId: message.guild.id });
            }
            data.prefix = args[0];
            await data.save().catch((e) => {
                console.log(e);
            });
            message.channel.send(client.languages.__mf({ phrase: 'prefix.changed', locale: lang }) + args[0])
        } catch (error) {
            message.channel.send(client.languages.__mf({ phrase: 'prefix.error', locale: lang }));
            console.log("ERROR :: " + error)
        }

    }
};