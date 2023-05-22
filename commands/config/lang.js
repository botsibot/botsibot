const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const serverSchema = require(`${process.cwd()}/utils/models/guild.js`)

module.exports = {
    name: 'lang',
    description: "Sets the bot lang",
    cooldown: 3000,
    aliases: ["setlang"],
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {

        const lang = args[0]


        if (lang === "en" || lang === "es") {
            try {

                let data = await serverSchema.findOne({
                    guildId: message.guild.id,
                });
                if (data) {
                    data.language = lang
                    data.save().catch(e => console.log(e))
                } else {
                    const newGuild = new serverSchema({
                        guildId: message.guild.id,
                    });
                    await newGuild.save().catch((e) => {
                        console.log(e);
                    });
                    data = await serverSchema.findOne({ guildId: message.guild.id });
                }
                return message.channel.send(client.languages.__mf({ phrase: 'lang.changed', locale: lang }) + lang)
            } catch (error) {
                console.log(error)
            }
        } else {
            return message.channel.send(client.languages.__mf({ phrase: 'lang.error', locale: lang }));
        }

    }
};