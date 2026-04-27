(function () {
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(container => {
        const track = container.querySelector('.events-track');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        if (!track || !prevBtn || !nextBtn) return;

        prevBtn.addEventListener('click', function () {
            let scrollAmount = track.clientWidth;
            let isObits = container.classList.contains('obits-slider');

            if (isObits) {
                const item = track.firstElementChild;
                if (item) {
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    scrollAmount = item.offsetWidth + gap;
                }

                if (track.scrollLeft <= 0) {
                    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
                    return;
                }
            }
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', function () {
            let scrollAmount = track.clientWidth;
            let isObits = container.classList.contains('obits-slider');

            if (isObits) {
                const item = track.firstElementChild;
                if (item) {
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    scrollAmount = item.offsetWidth + gap;
                }

                if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                    return;
                }
            }
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });
    // Wheels Infinite Circular Slider
    const wheelsSection = document.querySelector('.wheels-section');
    if (wheelsSection) {
        const track = wheelsSection.querySelector('.wheels-track');
        const prevBtn = wheelsSection.querySelector('.wheels-prev');
        const nextBtn = wheelsSection.querySelector('.wheels-next');

        if (track && prevBtn && nextBtn) {
            let isAnimating = false;

            nextBtn.addEventListener('click', () => {
                if (isAnimating) return;
                isAnimating = true;

                const firstItem = track.firstElementChild;
                const itemWidth = firstItem.offsetWidth;
                const style = window.getComputedStyle(track);
                const gap = parseFloat(style.gap) || 0;

                track.style.transition = 'transform 0.4s ease-in-out';
                track.style.transform = `translateX(-${itemWidth + gap}px)`;

                const onEnd = () => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    track.appendChild(firstItem);
                    isAnimating = false;
                    track.removeEventListener('transitionend', onEnd);
                };
                track.addEventListener('transitionend', onEnd);
            });

            prevBtn.addEventListener('click', () => {
                if (isAnimating) return;
                isAnimating = true;

                const lastItem = track.lastElementChild;
                const style = window.getComputedStyle(track);
                const gap = parseFloat(style.gap) || 0;
                const itemWidth = lastItem.offsetWidth;

                track.prepend(lastItem);

                track.style.transition = 'none';
                track.style.transform = `translateX(-${itemWidth + gap}px)`;

                // Force reflow to ensure the transform gets applied without transition visibly
                void track.offsetWidth;

                track.style.transition = 'transform 0.4s ease-in-out';
                track.style.transform = 'translateX(0)';

                const onEnd = () => {
                    isAnimating = false;
                    track.removeEventListener('transitionend', onEnd);
                };
                track.addEventListener('transitionend', onEnd);
            });
        }
    }
})();
