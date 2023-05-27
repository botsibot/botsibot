const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const subreddits = ['CatsStandingUp','CatLoaf','cats','tuckedinkitties','Catsubs'];
var subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
const translate = require(`${process.cwd()}/utils/functions/translate`)

module.exports = {
    name: 'randomcat',
    description: "Get a random image of a cat",
    cooldown: 3500,
    syntax: "randomcat",
    category: "fun",
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {
        const t = translate(message)
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}/.json`)
        const posts = response.data.data.children;

        const imagePosts = posts.filter(post => post.data.post_hint === 'image');

        if (imagePosts.length > 0) {
            const randomPost = imagePosts[Math.floor(Math.random() * imagePosts.length)];
            const imageUrl = randomPost.data.url;
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(t('randomcat.origin')+`\`/r/${subreddit}/\``)
                .setImage(`${imageUrl}`)
                .setTimestamp()
            return message.channel.send({ embeds: [exampleEmbed] });
        } else {
            return message.channel.send(t('randomcat.error'), { error: error });
        }

    }
};