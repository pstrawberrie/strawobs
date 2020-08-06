/**
 * Bot Service
 * - websockets
 * - twitch irc
 */
const config = require('./config');
const commandEntry = require('./commands/command-entry');
const WebSocket = require('ws');
const tmi = require('tmi.js');

const disableTwitch = true;

// Websocket Server
const wss = new WebSocket.Server({ port: config.wsPort });
let socketConnection = null;
wss.on('connection', function connection(ws) {
  socketConnection = ws;

  ws.on('message', function incoming(message) {
    console.log('websocket message received from client: %s', message);
  });

  //test
//   ws.send(JSON.stringify({
//     type: 'user-action',
//     userAction: 'lurk',
//     tags: {
//         username: 'testguy',
//         'user-id': '1234xxx'
//     }
//   }));
});

// Twitch Bot
if(!disableTwitch) {
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
        if(message[0] !== config.botCommandPrefix) return;
        if(socketConnection) commandEntry(socketConnection, {channel, tags, message});
    });
}
