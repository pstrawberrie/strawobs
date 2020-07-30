/**
 * Bot Command Entry
 */
const { parseCommand } = require('../util/js/bot');

// Commands
const friskUser = require('./frisk-user');
const lurk = require('./lurk');

// The Command Entry
module.exports = (socketConnection, messageData) => {
    if (!socketConnection) return console.log('Command entry failed - no socket connection');
    if (!messageData) return console.log('Command entry failed - no message data');

    friskUser(messageData.tags).then(() => {
        const commandObj = parseCommand(messageData.message);
        if(!commandObj) return;

        switch(commandObj.command) {
            case 'lurk':
                lurk(socketConnection, commandObj, messageData);
                break;
            default:
                return;
        }

    }).catch(err => console.log(`Error from friskUser in command-entry.js: ${err}`));
};
