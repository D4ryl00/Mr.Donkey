const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

function exitHandler() {
	client.on('disconnect', () => {
		console.log('Disconnected.');
	});
	client.destroy();
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('pong')
	}
});

/*
 * Prototype function of server greeting.
 * Config values are set statically in local variables.
*/

function serverGreeting() {
	// config values
	const sendChannelMessage = true;
	const sendDM = true;
	const channelMessage = 'Welcome !';
	const directMessage = 'Private message !';
	const channelGreeting = 'test-bot';

	client.on('guildMemberAdd', member => {
		if (sendChannelMessage) {
			// find the channel greeting
			const channel = member.guild.channels.find(
				ch => ch.name === channelGreeting);
			if (!channel) {
				console.error('serverGreeting: no channel found');
				return ;
			}
			// send message to the channel
			channel.send(`${member} ` + channelMessage)
				.catch(() => console.error('serverGreeting: channel.send'));
		}
		if (sendDM) {
			// send Direct Message
			member.createDM().then(dm => {
				return dm.send(directMessage)
					.catch(() => console.error('serverGreeting: dm.send'));
			})
				.catch(() => console.error('serverGreeting: createDM'));
		}
	});
}

process.on('exit', exitHandler.bind());
process.on('SIGINT', exitHandler.bind());

client.login(auth.token);
serverGreeting();
