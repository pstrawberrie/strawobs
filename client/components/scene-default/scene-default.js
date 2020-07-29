/**
 * Default Scene
 */
import { Component, registerComponent } from 'js/component';
const componentName = 'scene-default';

class SceneDefault extends Component {
    /**
     * Elements
     */
    elements = {}

    /**
     * State & Util
     */
    wsServer = 'wss://localhost:3069/';
    socket = null;
    debug = true;

    /**
     * Connect Websocket
     */
    connectWebsocket = () => {
        this.socket = new WebSocket('ws://localhost:3069');

        // On Open
        this.socket.addEventListener('open', () => {
            if(this.debug) console.log('Websocket Open');//eslint-disable-line

            // On Message
            this.socket.addEventListener('message', (event) => {
                console.log('websocket message from server:');//eslint-disable-line
                console.log(JSON.parse(event.data));//eslint-disable-line
            });
        });
    }

    /**
     * Init Component
     */
    init() {
        this.connectWebsocket();
    }
}

registerComponent(`.${componentName}`, SceneDefault);
