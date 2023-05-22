const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'spacex',
    description: "Get info about the latest rocket of spacex",
    cooldown: 3000,
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {
        const lang = message.member.guild.lang

        const url = "https://api.spacexdata.com/v4/launches/latest";

        axios.get(url)
            .then(response => {
                const launch = response.data;

                const { wikipedia, webcast, article, presskit } = launch.links;

                const links = [
                    wikipedia && `[Wikipedia](${wikipedia})`,
                    webcast && `[Webcast](${webcast})`,
                    article && `[Article](${article})`,
                    presskit && `[Presskit](${presskit})`
                ].filter(Boolean).join(' ');

                const Embed = {
                    color: 0x000000,
                    title: `ㅤㅤㅤㅤㅤㅤㅤㅤ**__${launch.name}__**`,
                    author: { name: client.languages.__mf({ phrase: 'spacex.author', locale: lang }) },
                    description: launch.details || client.languages.__mf({ phrase: 'spacex.description', locale: lang }),
                    fields: [
                        { name: `ㅤ${client.languages.__mf({ phrase: 'spacex.links', locale: lang })}ㅤ`, value: `ㅤ${links}ㅤ`, inline: true },
                        { name: `ㅤ${client.languages.__mf({ phrase: 'spacex.date', locale: lang })}ㅤ`, value: `ㅤ${launch.date_utc.slice(0, 10)}ㅤ`, inline: true },
                        { name: `ㅤ${client.languages.__mf({ phrase: 'spacex.success', locale: lang })}ㅤ`, value: `ㅤ${launch.success ? "✅" : "❌"}ㅤ`, inline: true }
                    ],
                    image: { url: launch.links.patch.large },
                    timestamp: new Date()
                };
                message.channel.send({ embeds: [Embed] });
            })
            .catch(error => {
                console.log(error);
            });
    }
};