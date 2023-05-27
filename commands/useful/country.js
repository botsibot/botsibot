const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const translate = require(`${process.cwd()}/utils/functions/translate`)
module.exports = {
    name: 'countries',
    description: "Get info about any country of the world",
    cooldown: 3000,
    syntax: "countries <countrie>",
    category: "useful",
    aliases: ["country"],
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {
        const t = translate(message)
        const countryName = args[0];
        const url = `https://restcountries.com/v3.1/name/${countryName}`;

        axios.get(url)
            .then(response => {
                const country = response.data[0];

                const Embed = {
                    color: 0x0099FF,
                    title: `**__${country.name.common}__**`,
                    description: t('country.description'),
                    fields: [
                        { name: t('country.language'), value: Object.values(country.languages).join(', '), inline: true },
                        { name: t('country.capital'), value: country.capital[0], inline: true },
                        { name: t('country.population'), value: country.population, inline: true },
                        { name: t('country.currencies'), value: `${country.currencies.CAD.name} (${country.currencies.CAD.symbol})`,inline: true },
                    ],
                    image: { url: 'https://www.autocollants-stickers.com/resize/360x360/zc/3/f/0/src/sites/astickers/files/products/d318.png' },
                    timestamp: new Date(),
                };

                message.channel.send({ embeds: [Embed] });
            })
            .catch(error => {
                console.log(error);
            });
    }
};