/**
 * Lurk Command
 */

module.exports = (socketConnection, commandObj, messageData) => {
    if(!socketConnection || !commandObj || !messageData) return;
    const socketData = {
        type: 'user-action',
        userAction: 'lurk',
        tags: messageData.tags
    };
    socketConnection.send(JSON.stringify(socketData));
}
