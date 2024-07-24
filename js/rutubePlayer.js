(() => {
    let videos = document.querySelectorAll(".video");
    videos.forEach((item) => setupVideo(item));

    function setupVideo(video) {
        let anchor = video.querySelector("a");
        let id = anchor.dataset.id;
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            let iframe = createIframe(id);

            anchor.remove();
            video.appendChild(iframe);
        });
    }
    function getSrc(id) {
        return `https://rutube.ru/play/embed/${id}`
    }
    function createIframe(id) {
        let iframe = document.createElement("iframe");
        iframe.setAttribute("alow", "clipboard-write; autoplay");
        iframe.setAttribute("webkitAllowFullScreen", "");
        iframe.setAttribute("mozallowfullscreen", "");
        iframe.setAttribute("allowFullScreen", "");
        iframe.setAttribute("src", getSrc(id));

        return iframe;
    }
})();
