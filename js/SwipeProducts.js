const leftBtn = document.getElementById('swipe-left');
const rightBtn = document.getElementById('swipe-right');
const productsList = document.getElementById('products-list');

leftBtn.onclick = () => {
    productsList.scrollBy({
        left: -100,
        behavior: "smooth",
    });
}

rightBtn.onclick = () => {
    productsList.scrollBy({
        left: 100,
        behavior: "smooth",
    });
}