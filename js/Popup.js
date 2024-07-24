class Popup {
    constructor(vidgetElement, initiator) {
        if (vidgetElement) {
            this.vidgetElement = vidgetElement;
            this.initiator = initiator;
            this.ini();
        }
    }
    firedEvent() {
        return ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) ? 'touchstart' : 'click';
    }
    ini() {
        this.overlay = this.vidgetElement.closest('.popup-overlay');
        this.closeBtn = this.vidgetElement.querySelector('button.close');
        this.submitBtn = this.vidgetElement.querySelector('button[type="submit"]');
        this.initiator.addEventListener(this.firedEvent(), this.openForm.bind(this));
        this.overlay.addEventListener(this.firedEvent(), this.closeForm.bind(this));
        this.vidgetElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (typeof (this.getFormData()) === 'object') {
                try {
                    this.sendFormData();
                } catch (error) {
                    console.error(error);
                }

            }

            this.closeForm();
        });
        this.vidgetElement.addEventListener('keydown', (event) => {
            if (event.target === this.submitBtn && event.keyCode === 9) {
                this.closeBtn.focus();
            }
            if (event.keyCode === 27) {
                this.closeForm();
            }
        });
    }
    getFormData() {
        return new FormData(this.vidgetElement, this.submitBtn);
    }
    openForm(event) {
        event.preventDefault();
        document.body.classList.add('form-opened');
        this.overlay.style.display = 'flex';
        this.vidgetElement.style.display = 'block';
        this.closeBtn.focus();
    }
    sendFormData() {
        new RequestSender('POST', this.vidgetElement.action, JSON.stringify(Object.fromEntries(this.getFormData())))
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    closeForm(event) {
        event.stopPropagation();
        document.body.classList.remove('form-opened');
        if (event.target.classList.contains('popup-overlay') || event.target.classList.contains('close')) {
            this.initiator.focus();
            this.overlay.style.display = 'none';
            this.vidgetElement.style.display = 'none';
            this.vidgetElement.reset();
        }
    }
}

new Popup(document.querySelector('#popup_form'), document.querySelector('#request-btn'));
new Popup(document.querySelector('#popup_agreement'), document.querySelector('#popup-btn'));

