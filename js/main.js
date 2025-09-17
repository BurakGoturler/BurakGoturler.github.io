document.addEventListener("DOMContentLoaded", function() {
    // Scroll event for navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Lightbox initialization for gallery
    if (typeof SimpleLightbox !== 'undefined') {
        const lightbox = new SimpleLightbox('.gallery a', {
            /* options */
        });
    }

    // Bootstrap Carousel: Otomatik geçişi etkinleştir
    var mainSlider = document.querySelector('#mainSlider');
    if (mainSlider && typeof bootstrap !== 'undefined') {
        var carousel = new bootstrap.Carousel(mainSlider, {
            interval: 8000, // 4 saniyede bir geçiş
            ride: 'carousel',
            pause: false,
            wrap: true
        });
    }

    // Önce/Sonra slider fonksiyonu
    document.querySelectorAll('.before-after-slider').forEach(function(slider) {
        var range = slider.querySelector('.slider-range');
        var afterImg = slider.querySelector('.after-img');
        if (range && afterImg) {
            range.addEventListener('input', function() {
                var val = parseInt(this.value, 10);
                afterImg.style.clipPath = 'inset(0 0 0 ' + val + '%)';
            });
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});