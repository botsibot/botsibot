const { Client, Message, EmbedBuilder, Permissions, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

const subreddits = ['PuppySmiles','WhatsWrongWithYourDog','blop','dogswithjobs','corgi'];
var subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

module.exports = {
    name: 'randomdog',
    description: "Get a random image of a dog",
    cooldown: 3500,
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {

        const lang = message.member.guild.lang
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}/.json`)
        const posts = response.data.data.children;

        const imagePosts = posts.filter(post => post.data.post_hint === 'image');

        if (imagePosts.length > 0) {
            const randomPost = imagePosts[Math.floor(Math.random() * imagePosts.length)];
            const imageUrl = randomPost.data.url;
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(client.languages.__mf({ phrase: 'randomdog.origin', locale: lang })+`\`/r/${subreddit}/\``)
                .setImage(`${imageUrl}`)
                .setTimestamp()
            return message.channel.send({ embeds: [exampleEmbed] });
        } else {
            return message.channel.send(client.languages.__mf({ phrase: 'randomdog.error', locale: lang }, { error: error }));
        }


    }
};