/**
 * Frisk User
 */
const db = require('../db');
const chalk = require('chalk');

module.exports = (tags) => new Promise((resolve, reject) => {
    if(!tags.username) return reject('No Username Provided');
    if(!tags['user-id']) return reject('No userid provided');

    db.then(dbInstance => {
        dbInstance.defaults({ users: [] }).write().then(() => {
            const user = dbInstance.get('users').find({ id: tags['user-id'] }).value();

            if(!user) {
                dbInstance.get('users').push({ username: tags.username, id: tags['user-id']}).write().then((users) => {
                    //console.log(users);// Log Users Array
                    console.log(chalk.cyan(`Frisk Success: added new user ${tags.username} with id ${tags['user-id']}`));
                    resolve();
                }).catch(err => reject(`Error pushing new user object: ${err}`));
            } else if(user && user.username !== tags.username) {
                console.log(chalk.grey(`the user id ${user.id} exists but the username ${user.username} has changed to ${tags.username} - updating username..`));
                dbInstance.get('users').find({ id: tags['user-id'] }).assign({username: tags.username}).write().then(() => {
                    console.log(chalk.cyan(`Frisk Success: username ${user.username} updated`));
                    resolve();
                }).catch(err => reject(`Error updating the username: ${err}`));
            } else {
                console.log(chalk.cyan(`Frisk Success: user ${tags.username} already exists`));
                resolve();
            }

        }).catch(err => reject(`Error writing DB defaults: ${err}`));
    }).catch(err => reject(`Error connecting to db: ${err}`));
});
