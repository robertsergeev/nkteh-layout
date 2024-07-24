class Slider {
    constructor(slides, slide, btns) {
        if (slides) {
            this.slides = slides;
            this.slide = slide;
            this.totalSlides = this.slide.length;
            this.currentIndex = 1;
            this.isTransitioning = false;
            this.btns = btns;

            if (this.totalSlides > 1) {
                this.totalSlides += 2;
                this.init();
            }
        }
    }

    init() {
        // добавляю последний слайд в начало, а последний в конец 
        this.slidesArr = [...this.slide];

        this.slides.insertAdjacentHTML(
            'afterbegin',
            `<div class="slide">${this.slidesArr[this.totalSlides - 3].innerHTML}</div>`
        );

        this.slides.insertAdjacentHTML(
            'beforeend',
            `<div class="slide">${this.slidesArr[0].innerHTML}</div>`
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

        document.querySelector('.slides').addEventListener("touchstart", this.handleStart.bind(this), false);
        document.querySelector('.slides').addEventListener("touchend", this.handleEnd.bind(this), false);

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

    handleStart(e) {
        this.touchobj = e.changedTouches[0];
        this.startX = this.touchobj.pageX;
    }

    handleEnd(e) {
        this.touchobj = e.changedTouches[0];
        this.endX = this.touchobj.pageX;
        if (this.endX > this.startX) {
            this.showPrevSlide();
        } else {
            this.showNextSlide();
        }
    }

    updateSlidePosition() {
        this.offset = -this.currentIndex * 100;
        this.slides.style.transform = `translateX(${this.offset}%)`;
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