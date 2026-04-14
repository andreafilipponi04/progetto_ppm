/* ==========================================
   SLIDER EVENTI – Navigazione con frecce
   ========================================== */
(function () {
    const track = document.querySelector('.events-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (!track || !prevBtn || !nextBtn) return;

    prevBtn.addEventListener('click', function () {
        const scrollAmount = track.clientWidth;
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
        const scrollAmount = track.clientWidth;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
})();
