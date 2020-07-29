const config = require('./config');
const commandEntry = require('./commands/command-entry');
const WebSocket = require('ws');
const tmi = require('tmi.js');

// Websocket Server
const wss = new WebSocket.Server({ port: config.wsPort });
let socketConnection = null;

wss.on('connection', function connection(ws) {
  socketConnection = ws;

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

// Twitch Bot
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: config.botName,
		password: config.botPass
	},
	channels: config.botChannels
});

client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if(self) return;
    if(socketConnection) commandEntry(socketConnection, {channel, tags, message});
});

