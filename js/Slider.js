class Slider {
    constructor(slides, slide) {
        this.slides = slides;
        this.slide = slide;
        this.totalSlides = this.slide.length;
        this.currentIndex = 0;

        this.init();
    }

    init() {
        document.querySelector('#next').addEventListener('click', () => this.showNextSlide());
        document.querySelector('#prev').addEventListener('click', () => this.showPrevSlide());
        
        let startX;
        this.slides.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        this.slides.addEventListener('touchmove', (event) => {
            if (!startX) return;
            const endX = event.touches[0].clientX;
            const diffX = startX - endX;
        
            if (diffX > 0) {
                this.showNextSlide();
                startX = null;
            } else if (diffX < 0) {
                this.showPrevSlide();
                startX = null;
            }
        });

        setInterval(this.showNextSlide.bind(this), 5000);
    }

    showSlide(index) {
        const offset = -index * 100;
        this.slides.style.transform = `translateX(${offset}%)`;
    }

    showNextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.showSlide(this.currentIndex);
    }

    showPrevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentIndex);
    }
}

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');

new Slider(slides, slide);
