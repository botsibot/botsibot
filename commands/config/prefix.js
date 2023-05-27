const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const serverSchema = require(`${process.cwd()}/utils/models/guild.js`)
const translate = require(`${process.cwd()}/utils/functions/translate`)

module.exports = {
    name: 'prefix',
    description: "Set a new prefix",
    cooldown: 3000,
    syntax: "prefix <prefix>",
    category: "config",
    aliases: ["setprefix"],
    userPerms: ["Administrator"],
    botPerms: [],
    run: async (client, message, args) => {
        const t = translate(message)
        /**
         * @param {Client} client 
         * @param {Message} message 
         */

        if (!args[0]) return message.channel.send(t('prefix.args'));
        if (args[0].length > 5) return message.channel.send(t('prefix.argslength'));

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
            message.channel.send(t('prefix.changed') + args[0])
        } catch (error) {
            message.channel.send(t('prefix.error'));
            console.log("ERROR :: " + error)
        }

    }
};