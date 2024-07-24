(() => {
    document.querySelector('.burger').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.menu').classList.toggle('open');
        document.body.classList.toggle('menu-opened');
    
        if(document.querySelector('#slideshow')) {
            document.querySelector('#slideshow').classList.toggle('menu-opened');
        }
    
        if(document.querySelector('#map')) {
            document.querySelector('#map').classList.toggle('menu-opened');
        }
    });
})();
