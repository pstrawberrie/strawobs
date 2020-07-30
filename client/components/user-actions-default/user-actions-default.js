/**
 * Default User Action
 */
import { Component, registerComponent } from 'js/component';
const componentName = 'user-actions-default';

class UserActionDefault extends Component {
    /**
     * State & Util
     */
    lurkActive = false;

    /**
     * Run Action
     */
    runAction = (eventData) => {
        if(!eventData) return console.warn('No eventData in runAction');//eslint-disable-line
        if(!eventData.userAction) return console.warn('No eventData.userAction in runAction');//eslint-disable-line
        if(!eventData.tags) return console.warn('No eventData.tags in runAction');//eslint-disable-line
        if(!eventData.tags.username) return console.warn('No eventData.tags.username in runAction');//eslint-disable-line

        // Lurk Event
        const runLurk = (username) => {
            if(this.lurkActive) return console.warn('Lurk already running');//eslint-disable-line
            const lurkAnimDuration = 4000;
            const lurkClass = 'lurk-action';

            const lurkEle = document.createElement('div');
            lurkEle.classList.add(lurkClass);

            const lurkImgEle = document.createElement('div');
            lurkImgEle.classList.add(`${lurkClass}__image`);

            const lurkNameEle = document.createElement('div');
            lurkNameEle.classList.add(`${lurkClass}__name`);
            lurkNameEle.innerText = username;

            lurkEle.appendChild(lurkNameEle);
            lurkEle.appendChild(lurkImgEle);
            this.element.appendChild(lurkEle);
            this.lurkActive = true;

            return setTimeout(() => {
                this.element.removeChild(lurkEle);
                this.lurkActive = false;
            }, lurkAnimDuration);
        };

        // Events Switch (currently only running 1 event at a time - events will be lost)
        switch (eventData.userAction) {
        case 'lurk':
            runLurk(eventData.tags.username);
            break;
        default:
            return false;
        }

        return true;
    }

    /**
     * On User Action
     */
    onUserAction = (e) => {
        if (!e.detail) return;
        const eventData = e.detail;
        console.log('Got a new user action:');//eslint-disable-line
        console.log(eventData);//eslint-disable-line
        this.runAction(eventData);
    }

    /**
     * Add Event Listeners
     */
    addEventListeners = () => {
        window.addEventListener('user-action', this.onUserAction);
    }

    /**
     * Init Component
     */
    init() {
        this.addEventListeners();
    }
}

registerComponent(`.${componentName}`, UserActionDefault);
