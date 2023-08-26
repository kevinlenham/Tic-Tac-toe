const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Music bot is online!');
});

let on = false;
client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith('!start')) {
        msg.reply('On');
        on = true;
    } else if (msg.content.startsWith('!end')) {
        msg.reply('Off')
        on = false;
    } else if (on) {
        msg.channel.send(msg.content);
    }
});

client.login('MTE0NDg3NTE5NTIwNzc3ODMwNQ.Gk--MB.5cZWrjOMfoUCGNfsWCZJnMgdwGsIuq9H88TX_U');
