const { Partials, GatewayIntentBits } = require('discord.js');

module.exports = {
    prefix: ">",
    id: "905198577150738482",
    testguild: "951865800103428136",
    ownerid: "898444313049042974",
    client: {

        partials: [
            Partials.Channel,
            Partials.GuildMember,
            Partials.Message,
            Partials.User,
        ],
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ],
        shards: "auto",
        failIfNotExists: false,
        allowedMentions: {
            parse: ["everyone", "roles", "users"],
            users: [],
            roles: [],
            repliedUser: false,
        },
    }
};