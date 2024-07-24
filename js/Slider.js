class Slider {
    constructor(slides, slide, btns) {
        if (slides) {
            this.slides = slides;
            this.slide = slide;
            this.totalSlides = this.slide.length;
            this.currentIndex = 1; 
            this.isTransitioning = false;
            this.btns = btns;

            if(this.totalSlides > 0) {
                this.totalSlides += 2;
                this.init();
            }
        }
    }

    init() {
        // добавляю последний слайд в начало, а первый в конец 
        let slidesArr = [...this.slide];

        this.slides.insertAdjacentHTML(
            'afterbegin',
            `<div class="slide">${slidesArr[this.totalSlides - 3].innerHTML}</div>`
        );

        this.slides.insertAdjacentHTML(
            'beforeend',
            `<div class="slide">${slidesArr[0].innerHTML}</div>`
        );

        // двигаю на 100%, что бы показывался первый слайд и без анимации
        this.slides.style.transition = 'none';
        this.slides.style.transform = `translateX(${-this.currentIndex * 100}%)`;

        // показываю кнопки
        this.btns.forEach(btn => {
            btn.style.display = 'block';
        });

        document.querySelector('#next').addEventListener('click', () => this.showNextSlide());
        document.querySelector('#prev').addEventListener('click', () => this.showPrevSlide());

        let startX;
        this.slides.addEventListener('touchstart', (event) => {
            event.preventDefault();
            startX = event.touches[0].clientX;
        }, {passive: false});

        this.slides.addEventListener('touchmove', (event) => {
            if (!startX) return;
            const endX = event.touches[0].clientX;
            const diffX = startX - endX;

            if(Math.abs(diffX) > 20) {
                event.preventDefault();
                if (diffX > 0) {
                    this.showNextSlide();
                } else {
                    this.showPrevSlide();
                }

                startX = null;
            }

            // если работает тач скрин - прячу кнопки
            this.btns.forEach(btn => {
                btn.style.display = 'none';
            });

        }, { passive: false });

        this.slides.addEventListener('transitionend', () => {
            this.isTransitioning = false;
            if (this.currentIndex === 0) {
                this.slides.style.transition = 'none';
                this.currentIndex = this.totalSlides - 2;
                this.updateSlidePosition();
            }
            if (this.currentIndex === this.totalSlides - 1) {
                this.slides.style.transition = 'none';
                this.currentIndex = 1;
                this.updateSlidePosition();
            }
        });

        setInterval(this.showNextSlide.bind(this), 5000);
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * 100;
        this.slides.style.transform = `translateX(${offset}%)`;
    }

    showSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.slides.style.transition = 'transform 1s ease-in-out';
        this.currentIndex = index;
        this.updateSlidePosition();
    }

    showNextSlide() {
        this.showSlide(this.currentIndex + 1);
    }

    showPrevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
}

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const btns = document.querySelectorAll('.slider button');

new Slider(slides, slide, btns);