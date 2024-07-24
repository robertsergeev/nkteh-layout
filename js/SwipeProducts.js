(() => {
    const productsList = document.getElementById('products-list');
    if (productsList) {
        const leftBtn = document.getElementById('swipe-left');
        const rightBtn = document.getElementById('swipe-right');
        const productItem = productsList.querySelector('li');
        const shiftValue = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--min-screen-width'));
        if (productsList.querySelectorAll('li').length * productItem.clientWidth <= productsList.clientWidth) {
            rightBtn.style.display = 'none';
        }
        leftBtn.onclick = () => {
            productsList.scrollBy({
                left: -shiftValue,
                behavior: "smooth",
            });
        }

        rightBtn.onclick = () => {
            productsList.scrollBy({
                left: shiftValue,
                behavior: "smooth",
            });
        }

        productsList.addEventListener("scroll", (event) => {
            leftBtn.style.display = (Math.round(productsList.scrollLeft) === 0) ? 'none' : 'flex';
            rightBtn.style.display = (Math.round(productsList.scrollLeft) === productsList.querySelectorAll('li').length * productItem.clientWidth - productsList.clientWidth) ? 'none' : 'flex';
        });
    }
})();

