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
        captionBox: this.element.querySelector('#caption-box')
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
     * Captioning
     */
    /* eslint-disable */
    startCaptioning = () => {
        if(!'webkitSpeechRecognition' in window || !this.elements.captionBox) return;
        console.log('speech recognition enabled');

        const scope = this;
        const speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'en-US';
        speechRecognizer.start();

        let finalTranscripts = '';

        speechRecognizer.onresult = function (event) {
            let interimTranscripts = '';
            for (let i = event.resultIndex; i < event.results.length; i += 1) {
                let transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;
                } else {
                    interimTranscripts += transcript;
                }
            }
            scope.elements.captionBox.innerHTML = finalTranscripts + '<span style="color: #999">' + interimTranscripts + '</span>';
        };
        speechRecognizer.onerror = function (event) {
            console.log('error from speech recognizer:');
            console.log(event);
        };
    }
    /* eslint-enable */

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
        //this.startCaptioning();
        this.addEventListeners();
    }
}

registerComponent(`.${componentName}`, SceneDefault);
