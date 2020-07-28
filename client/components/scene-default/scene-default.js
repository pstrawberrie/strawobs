/**
 * Default Scene
 */
import { Component, registerComponent } from 'js/component';
const componentName = 'scene-default';

class SceneDefault extends Component {
    /**
     * Elements
     */
    elements = {
        testBody: document.querySelector('body'),
    }

    /**
     * State & Util
     */
    testVal = 'test value'

    /**
     * Init Component
     */
    init() {
        console.log('scene default component', this.testVal, this.elements.testBody);
    }
}

registerComponent(`.${componentName}`, SceneDefault);
