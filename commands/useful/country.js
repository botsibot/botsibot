const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'countries',
    description: "Get info about any country of the world",
    cooldown: 3000,
    aliases: ["country"],
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {
        const lang = message.member.guild.lang
        const countryName = args[0];
        const url = `https://restcountries.com/v3.1/name/${countryName}`;

        axios.get(url)
            .then(response => {
                const country = response.data[0];

                const Embed = {
                    color: 0x0099FF,
                    title: `**__${country.name.common}__**`,
                    description: client.languages.__mf({ phrase: 'country.description', locale: lang }),
                    fields: [
                        { name: client.languages.__mf({ phrase: 'country.language', locale: lang }), value: Object.values(country.languages).join(', '), inline: true },
                        { name: client.languages.__mf({ phrase: 'country.capital', locale: lang }), value: country.capital[0], inline: true },
                        { name: client.languages.__mf({ phrase: 'country.population', locale: lang }), value: country.population, inline: true },
                        { name: client.languages.__mf({ phrase: 'country.currencies', locale: lang }), value: `${country.currencies.CAD.name} (${country.currencies.CAD.symbol})`,inline: true },
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