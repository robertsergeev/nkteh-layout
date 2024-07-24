/**
 * Открывает модальное окно на оверлее с классом '.popup-overlay'. Для отправки данных модальный элемент должен быть 'FORM' с классом '.modal'. Для текста, галереи, видео и прочего, модальный элемент должен быть 'DIV' с классом '.modal'. Закрывающая кнопка для модального элемента должна быть 'BUTTON' с классом '.close'. Кнопка для отправки формы должна быть 'BUTTON' с атрибутом 'type="submit"'.
 */
class Popup {
    /**
     * @param {object} vidgetElement  - ссылка на объект модального элемента 
     * @param {object} initiator  - ссылка на объект вызывающей кнопки 
     * 
    */
    constructor(vidgetElement, initiator) {
        if (vidgetElement) {
            this.vidgetElement = vidgetElement;
            this.initiator = initiator;
            this.ini();
        }
    }
    ini() {
        this.overlay = this.vidgetElement.closest('.popup-overlay');
        this.closeBtn = this.vidgetElement.querySelector('button.close');
        this.submitBtn = this.vidgetElement.querySelector('button[type="submit"]');
        this.initiator.addEventListener(UserDevice.firedEvent(), this.openForm.bind(this));
        this.overlay.addEventListener(UserDevice.firedEvent(), this.captureClose.bind(this));
        this.vidgetElement.addEventListener('submit', this.captureSubmit.bind(this));
        this.vidgetElement.addEventListener('keydown', this.captureKeydown.bind(this));
    }
    lastFocused() {
        if (this.vidgetElement.tagName === 'FORM') {
            return this.vidgetElement.elements[this.vidgetElement.length - 1];
        } else {
            this.buttonsArr = Array.from(this.vidgetElement.querySelectorAll('input, button, textarea, select'));
            return this.buttonsArr[this.buttonsArr.length - 1];
        }
    }
    captureKeydown(event) {
        if (event.target === this.lastFocused() && event.keyCode === 9) {
            event.preventDefault();
            this.closeBtn.focus();
        }
        if (event.keyCode === 27) {
            this.hideForm();
        }
    }
    captureSubmit(event) {
        event.preventDefault();
        if (typeof (this.getFormData()) === 'object') {
            try {
                this.sendFormData();
            } catch (error) {
                console.error(error);
            }
        }
    }
    getFormData() {
        return new FormData(this.vidgetElement, this.submitBtn);
    }
    openForm() {
        this.overlay.style.display = 'flex';
        this.vidgetElement.style.display = 'block';
        this.closeBtn.focus();
        document.body.classList.toggle('menu-opened');
    }
    sendFormData() {
        new RequestSender('POST', this.vidgetElement.action, Object.fromEntries(this.getFormData()))
            .then(data => {
                console.log(data);
                this.hideForm();
            })
            .catch(err => {
                console.log(err);
            });
    }
    captureClose(event) {
        event.stopPropagation();
        if (event.target.classList.contains('popup-overlay') || event.target.classList.contains('close')) {
            this.hideForm();
        }
    }
    hideForm() {
        this.initiator.focus();
        this.overlay.style.display = 'none';
        this.vidgetElement.style.display = 'none';
        if (this.vidgetElement.tagName === 'FORM') {
            this.vidgetElement.reset();
        }
        document.body.classList.toggle('menu-opened');
    }
}

new Popup(
    document.querySelector('#popup_form'),
    document.querySelector('#request-btn')
);
new Popup(
    document.querySelector('#popup_agreement'),
    document.querySelector('#popup-btn')
);


