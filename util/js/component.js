/**
 * Base Component Class
 * @param {DOM Element} element - DOM Element of component
 */
export class Component {
    constructor(element) {
        this.element = element;
    }

    init() {
        console.warn('Component class init() method expected to be overridden - maybe we don\'t need to inherit from Component class?', this.element);//eslint-disable-line no-console
    }
}

/**
 * Register Component Function
 * @param {String} selector - querySelectorAll string ie. '.component'
 * @param {Class} ComponentClass - class to pass component selector to ie. Component
 */
export function registerComponent(selector, ComponentClass) {
    const componentGroup = document.querySelectorAll(selector);
    componentGroup.forEach((element) => new ComponentClass(element).init());
}
