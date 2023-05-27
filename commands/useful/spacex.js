const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const translate = require(`${process.cwd()}/utils/functions/translate`)
module.exports = {
    name: 'spacex',
    description: "Get info about the latest rocket of spacex",
    cooldown: 3000,
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {
        const t = translate(message)
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
                    title: `**__${launch.name}__**`,
                    author: { name: t('spacex.author')},
                    description: launch.details || t('spacex.description'),
                    fields: [
                        { name: `${t('spacex.links')}`, value: `${links}`, inline: true },
                        { name: `${t('spacex.date')}`, value: `${launch.date_utc.slice(0, 10)}`, inline: true },
                        { name: `${t('spacex.success')}`, value: `${launch.success ? "✅" : "❌"}`, inline: true }
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