/**
 * Класс определения девайса юзера
 */
class UserDevice {
    static instance;

    constructor() {
        if (UserDevice.instance) {
            return UserDevice.instance;
        }
        UserDevice.instance = this;
        Object.freeze(this);
    }
    /**
     * @returns {boolean} 
     */
    static isTouch() {
        return ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) ? true : false;
    }
    /**
     * @returns {string} 'touchstart' | 'click'
     */
    static firedEvent() {
        return (this.isTouch()) ? 'touchstart' : 'click';
    }
    static getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
}

new UserDevice();