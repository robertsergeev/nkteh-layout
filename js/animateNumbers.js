function animateCounter(element, target) {
    let start = 0;
    const duration = 500;
    const increment = target / (duration / 10);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.round(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function onScroll() {
    const counters = document.querySelectorAll('.num');
    counters.forEach(counter => {
        if (isElementInView(counter) && !counter.classList.contains('started')) {
            counter.classList.add('started');
            const target = +counter.dataset.targetnum;
            animateCounter(counter, target);
        }
    });
}

window.addEventListener('scroll', onScroll);