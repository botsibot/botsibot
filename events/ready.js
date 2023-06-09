const { ActivityType } = require('discord.js');
const client = require('./../index.js');
const generic = require('generic-logs')

client.on("ready", () => {

    const activities = [
        { name: `In ${client.guilds.cache.size} servers`, type: ActivityType.Listening },
        { name: `${client.channels.cache.size} channels`, type: ActivityType.Watching },
        { name: `${client.users.cache.size} users`, type: ActivityType.Watching }
    ];

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * activities.length);
        const newActivity = activities[randomIndex];
        client.user.setActivity(newActivity);
    }, 5000);

    generic.separator('-', 60);
    console.log(generic.yellow(`> Iniciado en ${generic.bold(client.user.tag)}`));
    console.log(generic.yellow(`> En ${generic.bold(client.guilds.cache.size)} servidores`));
    generic.separator('-', 60);

});