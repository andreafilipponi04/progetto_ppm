/**
 * Main application script.
 * Encapsulated in an IIFE to prevent global scope pollution.
 */
(function () {
    // =========================================
    // SLIDER CONTAINERS (Events and Obituaries)
    // =========================================
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(container => {
        const track = container.querySelector('.events-track');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        // Ensure all required elements exist before attaching event listeners
        if (!track || !prevBtn || !nextBtn) return;

        // --- Previous Button Logic ---
        prevBtn.addEventListener('click', function () {
            let scrollAmount = track.clientWidth;
            let isObits = container.classList.contains('obits-slider');

            // Custom scroll logic for obituaries slider
            if (isObits) {
                const item = track.firstElementChild;
                if (item) {
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    // Scroll by exactly one item width plus its gap
                    scrollAmount = item.offsetWidth + gap;
                }

                // If we are at the beginning, loop to the end
                if (track.scrollLeft <= 0) {
                    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
                    return;
                }
            }
            // Execute the scroll action
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // --- Next Button Logic ---
        nextBtn.addEventListener('click', function () {
            let scrollAmount = track.clientWidth;
            let isObits = container.classList.contains('obits-slider');

            // Custom scroll logic for obituaries slider
            if (isObits) {
                const item = track.firstElementChild;
                if (item) {
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    // Scroll by exactly one item width plus its gap
                    scrollAmount = item.offsetWidth + gap;
                }

                // If we reached the end, loop back to the start
                if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                    return;
                }
            }
            // Execute the scroll action
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });

    // =========================================
    // WHEELS INFINITE CIRCULAR SLIDER
    // =========================================
    const wheelsSection = document.querySelector('.wheels-section');
    if (wheelsSection) {
        const track = wheelsSection.querySelector('.wheels-track');
        const prevBtn = wheelsSection.querySelector('.wheels-prev');
        const nextBtn = wheelsSection.querySelector('.wheels-next');

        // Ensure elements exist
        if (track && prevBtn && nextBtn) {
            let isAnimating = false; // Prevent overlapping animations

            // --- Next Button Logic (Scroll Right) ---
            nextBtn.addEventListener('click', () => {
                if (isAnimating) return;
                isAnimating = true;

                const firstItem = track.firstElementChild;
                const itemWidth = firstItem.offsetWidth;
                const style = window.getComputedStyle(track);
                const gap = parseFloat(style.gap) || 0;

                // Animate the track to the left
                track.style.transition = 'transform 0.4s ease-in-out';
                track.style.transform = `translateX(-${itemWidth + gap}px)`;

                // When transition ends, move the first element to the back to create an infinite loop
                const onEnd = () => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    track.appendChild(firstItem);
                    isAnimating = false;
                    track.removeEventListener('transitionend', onEnd);
                };
                track.addEventListener('transitionend', onEnd);
            });

            // --- Previous Button Logic (Scroll Left) ---
            prevBtn.addEventListener('click', () => {
                if (isAnimating) return;
                isAnimating = true;

                const lastItem = track.lastElementChild;
                const style = window.getComputedStyle(track);
                const gap = parseFloat(style.gap) || 0;
                const itemWidth = lastItem.offsetWidth;

                // Move the last element to the front instantly
                track.prepend(lastItem);

                // Offset the track instantly to hide the shift
                track.style.transition = 'none';
                track.style.transform = `translateX(-${itemWidth + gap}px)`;

                // Force a reflow so the browser registers the non-animated shift
                void track.offsetWidth;

                // Animate the track back to its original position
                track.style.transition = 'transform 0.4s ease-in-out';
                track.style.transform = 'translateX(0)';

                const onEnd = () => {
                    isAnimating = false;
                    track.removeEventListener('transitionend', onEnd);
                };
                track.addEventListener('transitionend', onEnd);
            });

            // =========================================
            // TOUCH SUPPORT (SWIPE)
            // =========================================
            let touchStartX = 0;
            let touchEndX = 0;

            track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50; // Minimum distance for a swipe
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe Left -> Next item
                    nextBtn.click();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe Right -> Previous item
                    prevBtn.click();
                }
            }
        }
    }
})();
