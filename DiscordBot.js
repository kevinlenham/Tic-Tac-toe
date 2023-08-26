const { Client, GatewayIntentBits } = require('discord.js');
const TicTacToe = require('./TicTacToe.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Tic Tac Toe bot is online!');
});

const game = new TicTacToe();

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    
    if (msg.content.startsWith('!start')) {
        msg.reply('On');
        game.resetGame(); // Use the resetGame method to start a new game
        msg.channel.send(game.printBoard());
    } else if (msg.content.startsWith('!move')) {
        const args = msg.content.slice(1).trim().split(/ +/);
        const [, row, col] = args.map(Number); // Skip the command name, get row and col
        
        const playerMoveResult = game.makeMove(row, col);
        msg.channel.send(playerMoveResult);

        if (playerMoveResult.includes("wins") || playerMoveResult.includes("Draw")) {
            return;
        }

        const botMoveResult = game.botMove();
        msg.channel.send(botMoveResult);
    } else if(msg.content.startsWith('!help')) {
        msg.channel.send(game.displayHelp());
    }
});

client.login('MTE0NDg3NTE5NTIwNzc3ODMwNQ.Gk--MB.5cZWrjOMfoUCGNfsWCZJnMgdwGsIuq9H88TX_U');
