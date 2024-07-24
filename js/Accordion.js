class Accordion {
    constructor (handler) {
        this.handler = handler;
        this.init();
    }

    init() {
        this.handler.addEventListener('click', function(event) {
            if(event.target.classList.contains('accordion-btn')) {
                const content = event.target.nextElementSibling;
    
                if(content.style.maxHeight) {
                    content.style.maxHeight = null;
                }  else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    }
}

const vacancies = document.querySelectorAll('.vacancy');
vacancies.forEach(vacancy => new Accordion(vacancy) );