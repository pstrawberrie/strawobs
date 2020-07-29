/**
 * Bot Command Entry
 */
const db = require('../db');
const debug = true;

// Frisk a User to make sure we have the data
function friskUser(tags) {
    if(tags.username && tags['user-id']) {
        const hasUser = db.get('users').find({ id: tags['user-id'] }).value();
        if(!hasUser) {
            db.get('users').push({ username: tags.username, id: tags['user-id']}).write();
            if(debug) console.log(`added new user ${tags.username} with id ${tags['user-id']}`);
        } else {
            if(debug) console.log(`user ${tags.username} already exists`);
        }
    }
}

// The Command Entry
module.exports = (socketConnection, messageData) => {
    if(!socketConnection || !messageData) return console.log('Command entry failed (no socket connection or no message data)');//eslint-disable-line
    friskUser(messageData.tags);

    console.log(messageData);
};
