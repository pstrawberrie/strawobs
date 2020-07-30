import ReconnectingWebSocket from 'reconnecting-websocket';

export default function connectWebsocket() {
    const rws = new ReconnectingWebSocket('ws://localhost:3069/');

    // On Open
    rws.addEventListener('open', () => {
        console.log('Websocket Open');//eslint-disable-line
    });

    // On Close
    rws.addEventListener('close', () => {
        console.log('Websocket Closed');//eslint-disable-line
    });

    // On Message
    rws.addEventListener('message', (event) => {
        const messageData = JSON.parse(event.data);
        console.log('-----------------------------------');//eslint-disable-line
        console.log('websocket message from server:');//eslint-disable-line
        console.log(messageData);//eslint-disable-line
        console.log('-----------------------------------');//eslint-disable-line

        if(messageData.type) window.dispatchEvent(new CustomEvent(messageData.type, { detail: messageData }));
    });
}
