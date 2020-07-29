/**
 * Default Webcam
 */
import { Component, registerComponent } from 'js/component';
const componentName = 'webcam-default';

class WebcamDefault extends Component {
    /**
     * Elements
     */
    elements = {

    };

    /**
     * State & Util
     */
    debug = true;

    /**
     * On Webcam Socket
     */
    onWebcamSocket = (data) => {
        if(this.debug) console.log('got webcam socket', data);//eslint-disable-line
    }

    /**
     * Add Event Listeners
     */
    addEventListeners = () => {
        window.addEventListener('webcam-socket', this.onWebcamSocket);
    }

    /**
     * Init Component
     */
    init() {
        this.addEventListeners();
    }
}

registerComponent(`.${componentName}`, WebcamDefault);
