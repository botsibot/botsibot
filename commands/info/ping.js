module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	cooldown: 9000,
    syntax: "ping",
    category: "info",
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		const msg = await message.reply('Pinging...')
		await msg.edit(`Pong! **${client.ws.ping} ms**`)
	}
};