/**
 * Bot Util
 */
const config = require('../../config');

exports.parseCommand = (message) => {
    const commandStr = message.replace(config.botCommandPrefix, '').split(' ');
    const command = commandStr[0];
    if(!command) return null;
    return {
        command,
        arg1: commandStr[1] || null,
        arg2: commandStr[2] || null
    };
}
