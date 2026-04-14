(function () {
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(container => {
        const track = container.querySelector('.events-track');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        if (!track || !prevBtn || !nextBtn) return;

        prevBtn.addEventListener('click', function () {
            let scrollAmount = track.clientWidth;
            if (container.classList.contains('obits-slider')) {
                const item = track.firstElementChild;
                if (item) {
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    scrollAmount = item.offsetWidth + gap;
                }
            }
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', function () {
            let scrollAmount = track.clientWidth;
            if (container.classList.contains('obits-slider')) {
                const item = track.firstElementChild;
                if (item) {
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    scrollAmount = item.offsetWidth + gap;
                }
            }
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });
})();
