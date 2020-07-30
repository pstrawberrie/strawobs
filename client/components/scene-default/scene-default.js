/**
 * Default Scene
 */
import { Component, registerComponent } from 'js/component';
import connectWebsocket from 'js/websocket';
const componentName = 'scene-default';

class SceneDefault extends Component {
    /**
     * Elements
     */
    elements = {

    }

    /**
     * State & Util
     */
    debug = true;

    /**
     * On Websocket Test
     */
    onWsTest = (e) => {
        console.log('WS test event received from server:');//eslint-disable-line
        console.log(e);//eslint-disable-line
    }

    /**
     * Add Event Listeners
     */
    addEventListeners = () => {
        window.addEventListener('test', this.onWsTest);
    }

    /**
     * Init Component
     */
    init() {
        connectWebsocket();
        this.addEventListeners();
    }
}

registerComponent(`.${componentName}`, SceneDefault);
